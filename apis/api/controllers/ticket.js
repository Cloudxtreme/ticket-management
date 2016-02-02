'use strict';

var Ticket = require('./../dao/helper/orm-mapping.js').Ticket,
RequestDetails = require('./../dao/helper/orm-mapping.js').RequestDetails,
TicketDetails = require('./../dao/helper/orm-mapping.js').TicketDetails,
User = require('./../dao/helper/orm-mapping.js').User,
nodemailer = require('nodemailer'),
fs = require('fs'),
path = require('path'),
appConfig = require('./../../config/config.js'),
classifier = require('./../helpers/approval-classifier-service.js');

function createTicket(req, res) {

  var ticketObj = req.body;

  // new tickets will always be in OPEN state
  ticketObj.status = 'OPEN';

  // validate user id to be valid in database
  User.findById(req.swagger.params.userId.value,
    {
      attributes: ['uuid', 'username']
    })
    .then(function (user) {
      if (user) {

        ticketObj.user_id = user.uuid;
        Ticket.create(ticketObj, {
          include: [
            { model: RequestDetails, as : 'requestDetails' },
            { model: TicketDetails, as : 'ticketDetails' }
          ]
        }).then(function (ticket) {
          ticket = JSON.parse(JSON.stringify(ticket));
          if (!ticket.completed) {
            delete ticket.completed;
          }

          if (!ticket.remarks) {
            delete ticket.remarks;
          }

          checkApprovalRequirement(user, ticket);
          console.log(ticket);
          res.json(ticket);
        }).catch(function (error) {
          res.statusCode = 400;
          res.json(error);
        });
      } else {
        res.statusCode = 404;
        res.json({message : "User not found."});
      }
    }).catch(function (error) {
      res.statusCode = 400;
      console.log(error);
      res.json(error);
    });
  }

  function checkApprovalRequirement(user, ticket) {

    var params = {
      classifier: classifier.classifierId,
      text: ticket.requestDetails.description
    };

    classifier.nlClassifier.classify(params, function(err, results) {
      if (err) {
        console.log(err);
        return;
      } else {
        // use top class to identify whether approval required or not
        var leaf = results.top_class.replace(/['"]+/g, '').trim();
        if(leaf != 'Approval_Not_Required') {
          sendEmail(leaf, user, ticket);

          // move request to pending state
          Ticket.findById(ticket.uuid)
          .then(function (ticket) {
            ticket.updateAttributes({
              status: 'PENDING',
              remarks: 'Awaiting approval'
            }).then(function(updatedResult) {
              console.log('status updated to pending state.');
            });
          });
        } else {
          console.log('approval not required for request.');
        }
      }
    });
  }

  function sendEmail(approvalType, user, ticket) {

    var smtpConfig = {
      host: appConfig['email.host'],
      port: appConfig['email.port'],
      secure: false,
      auth: {
        user: appConfig['email.sender.username'],
        pass: appConfig['email.sender.password']
      }
    };

    var transporter = nodemailer.createTransport(smtpConfig);

    sendTemplatizedEmail(approvalType, transporter, user, ticket);
  }

  function sendTemplatizedEmail(approvalType, transporter, user, ticket) {

    var templateFilePath;
    if(approvalType === 'Manager Approval') {
      templateFilePath = path.resolve(__dirname, './../../template/network-approval-template.txt');
    } else {
      templateFilePath = path.resolve(__dirname, './../../template/compliance-approval-template.txt');
    }

    fs.readFile(templateFilePath,
    "utf-8", function (err, data) {

      if (err) {
        console.log(err);
      }

      var mailOptions = {
        from: appConfig['email.sender.username'],
        to: user.username,
        subject: 'Approval request for request Id ' + ticket.uuid,
        text: data
      };

      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error);
        }else{
          console.log('Message sent: ' + info.response);
        };
      });
    });
  }

  function getByStatus(req, res) {

    var queryObj = req.body;

    console.log('get by status call');

    if (queryObj.queryType === "COUNT") {
      Ticket.count({
        where: {
          status: queryObj.status,
          user_id : req.swagger.params.userId.value
        }
      })
      .then(function (ticketsCount) {
        res.json({ tickets : [], count : ticketsCount });
      }).catch(function (error) {
        console.log(error);
        res.statusCode = 400;
        res.json(error);
      });
    }
    else {

      var limitVal = queryObj.limit;
      var offsetVal = queryObj.offset;

      Ticket.findAll({
        where: {
          status: queryObj.status,
          user_id : req.swagger.params.userId.value
        },
        include: [
          { model: RequestDetails, as : 'requestDetails' },
          { model: TicketDetails, as : 'ticketDetails' }
        ],
        offset: offsetVal,
        limit: limitVal,
        order: 'created DESC'
      })
      .then(function (tickets) {
        var loopCount = 0,
        ticket,
        ticketsObj = { },
        ticketList = [];

        tickets = JSON.parse(JSON.stringify(tickets));
        console.log(tickets);
        for (loopCount; loopCount < tickets.length; loopCount = loopCount + 1) {
          ticket = tickets[loopCount];

          if (!ticket.completed) {
            delete ticket.completed;
          }
          if (!ticket.remarks) {
            delete ticket.remarks;
          }

          ticketList.push(ticket);
        }

        ticketsObj.tickets = [ticketList];
        ticketsObj.count = ticketList.length;

        console.log(JSON.stringify(ticketsObj));
        res.json(ticketsObj);
      }).catch(function (error) {
        console.log(error);
        res.statusCode = 400;
        res.json(error);
      });
    }
  }

  module.exports = {
    create : createTicket,
    getByStatus : getByStatus
  };

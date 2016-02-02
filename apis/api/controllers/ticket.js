'use strict';

var Ticket = require('./../dao/helper/orm-mapping.js').Ticket,
RequestDetails = require('./../dao/helper/orm-mapping.js').RequestDetails,
TicketDetails = require('./../dao/helper/orm-mapping.js').TicketDetails,
User = require('./../dao/helper/orm-mapping.js').User;

function createTicket(req, res) {

  var ticketObj = req.body;

  // new tickets will always be in OPEN state
  ticketObj.status = 'OPEN';

  // validate user id to be valid in database
  User.findById(req.swagger.params.userId.value,
    {
      attributes: ['uuid']
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
        limit: limitVal
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
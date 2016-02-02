var sequelize = require('./orm-connection-pool.js');

var User = sequelize.import(__dirname + "/../mapping/user-mapping.js"),
  Ticket = sequelize.import(__dirname + "/../mapping/ticket-mapping.js"),
  TicketDetails = sequelize.import(__dirname + "/../mapping/ticket-details-mapping.js"),
  RequestDetails = sequelize.import(__dirname + "/../mapping/request-mapping.js");

User.hasMany(Ticket, {
  foreignKey: {
    name: 'user_id',
    allowNull: true
  },
  as : "tickets"
});

Ticket.belongsTo(TicketDetails, {
  foreignKey: {
    name: 'ticket_details',
    allowNull: true
  },
  as: 'ticketDetails'
});

Ticket.belongsTo(RequestDetails, {
  foreignKey: {
    name: 'request_details',
    allowNull: true
  },
  as: 'requestDetails'
});

// Regenerate schema on application start, good during initial phase
//-- should remove this later on once we have sql scripts {force : true}
sequelize.sync();

module.exports = {
  User : User,
  Ticket : Ticket,
  TicketDetails : TicketDetails,
  RequestDetails : RequestDetails
};

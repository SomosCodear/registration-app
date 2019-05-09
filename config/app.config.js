module.exports = {
  api: {
    url: process.env.API_URL || 'https://checkout.webconf.tech/api',
    endpoints: {
      customers: {
        filter: 'customers',
      },
      tickets: {
        filter: 'tickets',
        checkIn: 'tickets/:ticketId',
      },
    },
  },
};

'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/public-orders',
      handler: 'order.createPublicOrder',
      config: {
        auth: false,
      },
    },
  ],
};
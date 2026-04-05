'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::area.area', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
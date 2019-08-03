'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // consul: {
  //     enable: true,
  //     package: 'egg-consul',
  // },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  // routerPlus: {
  //     enable: true,
  //     package: 'egg-router-plus',
  // },
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  swagger2: {
    enable: true,
    package: 'egg-swagger2',
  }

};
// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/controller/admin');
import ExportUser = require('../../../app/controller/user');
import ExportWeather = require('../../../app/controller/weather');

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    user: ExportUser;
    weather: ExportWeather;
  }
}

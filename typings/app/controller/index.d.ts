// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmins = require('../../../app/controller/admins');
import ExportUser = require('../../../app/controller/user');
import ExportWeather = require('../../../app/controller/weather');

declare module 'egg' {
  interface IController {
    admins: ExportAdmins;
    user: ExportUser;
    weather: ExportWeather;
  }
}

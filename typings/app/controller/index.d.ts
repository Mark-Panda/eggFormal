// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmins = require('../../../app/controller/admins');
import ExportArticle = require('../../../app/controller/article');
import ExportUser = require('../../../app/controller/user');
import ExportWeather = require('../../../app/controller/weather');

declare module 'egg' {
  interface IController {
    admins: ExportAdmins;
    article: ExportArticle;
    user: ExportUser;
    weather: ExportWeather;
  }
}

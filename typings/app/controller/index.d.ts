// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/controller/admin');
import ExportHome = require('../../../app/controller/home');

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    home: ExportHome;
  }
}

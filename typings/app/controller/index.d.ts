// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/controller/admin');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    user: ExportUser;
  }
}

// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/model/admin');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    User: ReturnType<typeof ExportUser>;
  }
}

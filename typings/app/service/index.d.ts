// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/service/admin');

declare module 'egg' {
  interface IService {
    admin: ExportAdmin;
  }
}

// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/service/admin');
import ExportArticle = require('../../../app/service/article');
import ExportClassification = require('../../../app/service/classification');
import ExportComment = require('../../../app/service/comment');
import ExportUser = require('../../../app/service/user');
import ExportUserRedis = require('../../../app/service/userRedis');

declare module 'egg' {
  interface IService {
    admin: ExportAdmin;
    article: ExportArticle;
    classification: ExportClassification;
    comment: ExportComment;
    user: ExportUser;
    userRedis: ExportUserRedis;
  }
}

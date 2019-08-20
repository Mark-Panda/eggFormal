// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/service/admin');
import ExportAdminRedis = require('../../../app/service/adminRedis');
import ExportArticle = require('../../../app/service/article');
import ExportClassification = require('../../../app/service/classification');
import ExportComment = require('../../../app/service/comment');
import ExportLabel = require('../../../app/service/label');
import ExportLink = require('../../../app/service/link');
import ExportThumbsup = require('../../../app/service/thumbsup');
import ExportUser = require('../../../app/service/user');
import ExportUserRedis = require('../../../app/service/userRedis');

declare module 'egg' {
  interface IService {
    admin: ExportAdmin;
    adminRedis: ExportAdminRedis;
    article: ExportArticle;
    classification: ExportClassification;
    comment: ExportComment;
    label: ExportLabel;
    link: ExportLink;
    thumbsup: ExportThumbsup;
    user: ExportUser;
    userRedis: ExportUserRedis;
  }
}

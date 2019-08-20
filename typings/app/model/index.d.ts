// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/model/admin');
import ExportArticle = require('../../../app/model/article');
import ExportClassification = require('../../../app/model/classification');
import ExportComHasArt = require('../../../app/model/comHasArt');
import ExportComment = require('../../../app/model/comment');
import ExportLabel = require('../../../app/model/label');
import ExportLink = require('../../../app/model/link');
import ExportThumbsup = require('../../../app/model/thumbsup');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    Article: ReturnType<typeof ExportArticle>;
    Classification: ReturnType<typeof ExportClassification>;
    ComHasArt: ReturnType<typeof ExportComHasArt>;
    Comment: ReturnType<typeof ExportComment>;
    Label: ReturnType<typeof ExportLabel>;
    Link: ReturnType<typeof ExportLink>;
    Thumbsup: ReturnType<typeof ExportThumbsup>;
    User: ReturnType<typeof ExportUser>;
  }
}

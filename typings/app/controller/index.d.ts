// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmins = require('../../../app/controller/admins');
import ExportArticle = require('../../../app/controller/article');
import ExportClassification = require('../../../app/controller/classification');
import ExportComment = require('../../../app/controller/comment');
import ExportLabel = require('../../../app/controller/label');
import ExportLink = require('../../../app/controller/link');
import ExportProjects = require('../../../app/controller/projects');
import ExportThumbsup = require('../../../app/controller/thumbsup');
import ExportUser = require('../../../app/controller/user');
import ExportWeather = require('../../../app/controller/weather');

declare module 'egg' {
  interface IController {
    admins: ExportAdmins;
    article: ExportArticle;
    classification: ExportClassification;
    comment: ExportComment;
    label: ExportLabel;
    link: ExportLink;
    projects: ExportProjects;
    thumbsup: ExportThumbsup;
    user: ExportUser;
    weather: ExportWeather;
  }
}

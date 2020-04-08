/**
 * コアモジュール
 */
import * as Express from 'express';

import { info } from 'src/express/v1/info';
import { search } from 'src/express/v1/search';
import { genre } from 'src/express/v1/genre';
import { talks } from 'src/express/v1/talks';

import { p_rooms } from 'src/express/v1/p_rooms';
import { p_talks } from 'src/express/v1/p_talks';

const route = '/api/v1';
export const v1 = (app: Express.Application) => {
  // search
  app.get(route + '/search/:str/:num', search);

  // genre
  app.get(route + '/genre/:id/:num', genre);

  // 最新順
  app.get(route + '/info/:num', info);

  // 投稿一覧
  app.get(route + '/talks/:id/:num', talks);

  // 板をつくる
  app.post(route + '/rooms', p_rooms);

  // 投稿
  app.post(route + '/talks', p_talks);
};

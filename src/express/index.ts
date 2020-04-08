/**
 * コアモジュール
 */
import * as Express from 'express';
import * as Helmet from 'helmet';
import * as BodyParser from 'body-parser';
import * as Cors from 'cors';

/**
 * 定数
 */
import { constant } from 'src/constant';

/**
 * api
 */
import { v1 } from 'src/express/v1';

const app = Express();

// ポート番号
app.listen(3000);

// サーバ情報隠蔽
app.disable('x-powered-by');

// セキュリティ対策
app.use(Helmet());

// CSRF対策
app.use(
  Cors({ origin: constant.ORIGIN[process.env.NODE_ENV], credentials: true })
);

// POSTリクエストを使えるようにする
app.use(BodyParser.json({ limit: '1mb' }));

// AUTHORIZATION Bearerチェック
app.use(
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    req.headers.authorization === constant.AUTHORIZATION_KEY
      ? next()
      : res.sendStatus(403);
  }
);

// origin headerを見る
app.use(
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    constant.ORIGIN[process.env.NODE_ENV].indexOf(req.header('Origin')) !== -1
      ? next()
      : res.sendStatus(409);
  }
);

/**
 * ミドルウエア　エラーハンドリング
 */
app.use(
  async (
    err: Error,
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    res.sendStatus(500);
  }
);

switch (constant.API_VERSION) {
  case 'v1':
    v1(app);
    break;
  default:
    break;
}

export const init = () => {};

console.log('start');

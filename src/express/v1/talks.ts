/**
 * コアモジュール
 */
import * as Express from 'express';

/**
 * model
 */
import { select } from 'src/mongoose/model/talks';

interface i_talks extends Express.Request {
  params: {
    id: string;
    num: string;
  };
}

export const talks = async (req: i_talks, res: Express.Response) => {
  try {
    res.send(
      await select({
        roomId: req.params.id,
        num: Number(req.params.num) - 1
      })
    );
  } catch (e) {
    res.sendStatus(500);
  }
};

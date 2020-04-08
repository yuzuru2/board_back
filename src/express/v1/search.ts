/**
 * コアモジュール
 */
import * as Express from 'express';

/**
 * model
 */
import { search as room_search } from 'src/mongoose/model/rooms';

interface i_requst extends Express.Request {
  params: {
    str: string;
    num: string;
  };
}

export const search = async (req: i_requst, res: Express.Response) => {
  try {
    res.send(
      await room_search({
        name: req.params.str,
        num: Number(req.params.num) - 1
      })
    );
  } catch (e) {
    res.sendStatus(500);
  }
};

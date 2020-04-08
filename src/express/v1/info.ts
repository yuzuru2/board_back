/**
 * コアモジュール
 */
import * as Express from 'express';

/**
 * model
 */
import { info as room_info } from 'src/mongoose/model/rooms';

interface i_requst extends Express.Request {
  params: {
    num: string;
  };
}

export const info = async (req: i_requst, res: Express.Response) => {
  try {
    res.send(
      await room_info({
        num: Number(req.params.num) - 1
      })
    );
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 * コアモジュール
 */
import * as Express from 'express';

/**
 * model
 */
import { genre as room_genre } from 'src/mongoose/model/rooms';

interface i_requst extends Express.Request {
  params: {
    id: string;
    num: string;
  };
}

export const genre = async (req: i_requst, res: Express.Response) => {
  try {
    res.send(
      await room_genre({
        genreId: Number(req.params.id),
        num: Number(req.params.num) - 1
      })
    );
  } catch (e) {
    res.sendStatus(500);
  }
};

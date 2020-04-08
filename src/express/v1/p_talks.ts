/**
 * コアモジュール
 */
import * as Express from 'express';
import * as mongoose from 'mongoose';

/**
 * model
 */
import { exist_check, update } from 'src/mongoose/model/rooms';
import { insert } from 'src/mongoose/model/talks';

interface i_request extends Express.Request {
  body: {
    roomId: string;
    name: string;
    message: string;
  };
}

export const p_talks = async (req: i_request, res: Express.Response) => {
  try {
    // 板が存在するか
    if (!(await exist_check(String(req.body.roomId)))) {
      res.sendStatus(500);
      return;
    }

    await insert({
      talkId: String(new mongoose.mongo.ObjectId()),
      roomId: String(req.body.roomId),
      name: String(req.body.name),
      message: String(req.body.message),
      ip: req.ip,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await update({ id: String(req.body.roomId) });

    res.send({});
  } catch (e) {
    res.sendStatus(500);
  }
};

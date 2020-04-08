/**
 * コアモジュール
 */
import * as Express from 'express';
import * as mongoose from 'mongoose';

/**
 * model
 */
import { insert } from 'src/mongoose/model/rooms';

interface i_request extends Express.Request {
  body: {
    name: string;
    genreId: number;
  };
}

export const p_rooms = async (req: i_request, res: Express.Response) => {
  try {
    const _ret = await insert({
      id: String(new mongoose.mongo.ObjectId()),
      name: String(req.body.name),
      genreId: Number(req.body.genreId),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.send({ id: _ret[0].id });
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 * コアモジュール
 */
import * as mongoose from 'mongoose';

/**
 * mongoose
 */
import { schema } from 'src/mongoose';

/**
 * interface
 */
interface i_talks extends mongoose.Document {
  talkId: string;
  roomId: string;
  name: string;
  message: string;
  ip: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * model
 */
const talks = mongoose.model(
  'talks',
  new schema({
    talkId: { type: String },
    roomId: { type: String },
    name: { type: String, minlength: 1, maxlength: 15 },
    message: { type: String, minlength: 1, maxlength: 150 },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }).index({ talkId: 1 }, { unique: true })
);

// 投稿
export const insert = async (params: {
  talkId: string;
  roomId: string;
  name: string;
  message: string;
  ip: string;
  createdAt: Date;
  updatedAt: Date;
}) => {
  return (await talks.insertMany([params])) as i_talks[];
};

// 投稿一覧
export const select = async (params: { roomId: string; num: number }) => {
  return {
    list: (await talks
      .find({ roomId: params.roomId })
      .sort({ updatedAt: 1 })
      .skip(params.num * 100)
      .limit(100)) as i_talks[],
    count: await talks.find({ roomId: params.roomId }).countDocuments()
  };
};

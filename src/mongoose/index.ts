process.env.TZ = 'Asia/Tokyo';

/**
 * コアモジュール
 */
import * as mongoose from 'mongoose';
import * as fs from 'fs';

// 設定ファイル読み込み
const dbconf = JSON.parse(
  fs.readFileSync(`${process.cwd()}/config/database.json`, 'utf-8')
)['mongodb'][process.env.NODE_ENV];

/**
 * モデルを作るときに使う
 */
export const schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(dbconf, {
  useNewUrlParser: true
});

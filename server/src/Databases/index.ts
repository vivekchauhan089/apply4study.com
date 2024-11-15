import { DB_DATABASE, DB_PASSWORD, DB_USERNAME } from '@/Config';
import { ConnectOptions } from 'mongoose';

// mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@websitecluster.pg06qgw.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority

const options: ConnectOptions = {
  autoCreate: true,
  autoIndex: true,
  pass: DB_PASSWORD,
  user: DB_USERNAME,
};
export const dbConnection = {
  options,
  url: `mongodb+srv://root:Dgxg01FBoKTP0nUT@ev.hfsqrfg.mongodb.net/MoovingDBStage?retryWrites=true&w=majority`,
};

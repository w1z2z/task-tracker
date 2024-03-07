import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { DatabaseConfiguration } from './src/common/config';

dotenv.config();
export default new DataSource(
  new DatabaseConfiguration().createTypeOrmOptions(),
);

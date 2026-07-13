import * as dotenv from 'dotenv';
dotenv.config();

import { app } from './app.js';
import { ENV } from '../configs/env.js';

const port = ENV.PORT;

app.listen(port, () => {
  console.log(`Server is running on porddt ${port}`);
});

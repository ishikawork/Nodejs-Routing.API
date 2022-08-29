import { Ottoman } from 'ottoman';

const dotenv = require('dotenv');
dotenv.config();

const ottoman = new Ottoman({
  modelKey: 'type',
  scopeName: 'Auth',
});

export { ottoman };

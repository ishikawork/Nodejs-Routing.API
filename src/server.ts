import App from '@/app';
import { ottoman } from './config/ottoman-config';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([IndexController, UsersController]);

const main = async () => {
  try {
    await ottoman.connect({
      bucketName: 'vizdom',
      connectionString: 'couchbase://localhost:8091',
      username: 'Administrator',
      password: '123456',
    });
    await ottoman.start();
    app.listen();
  } catch (e) {
    console.log(e);
  }
};

main();

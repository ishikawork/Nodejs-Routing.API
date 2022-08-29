import { Container } from 'inversify';
import { TYPES } from '@/config/types';
import UserService from '@/services/user.service';
import { IUserService } from '@/services/interfaces/user.interface';
import { interfaces, TYPE } from 'inversify-express-utils';
import { UserController } from '@/controllers/user.controller';

const diContainer = new Container();
diContainer.bind<IUserService>(TYPES.UserService).to(UserService).inTransientScope();

diContainer
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(UserController)
  .inSingletonScope()
  .whenTargetNamed(UserController.TARGET_NAME);

export { diContainer , Container };


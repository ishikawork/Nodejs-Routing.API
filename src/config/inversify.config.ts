import { Container } from 'inversify';
import { TYPES } from '@/config/types';
import UserService from '@/services/user.service';
import { IUserService } from '@/services/interfaces/user.interface';

const diContainer = new Container();
diContainer.bind<IUserService>(TYPES.UserService).to(UserService).inTransientScope();

export { diContainer as diContainer };


import { Param, Body, HttpCode, UseBefore } from 'routing-controllers';
import { expressToOpenAPIPath, OpenAPI } from 'routing-controllers-openapi';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { inject } from 'inversify';
import 'reflect-metadata';
import { IUserService } from '@/services/interfaces/user.interface';
import { TYPES } from '@/config/types';
import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces } from 'inversify-express-utils';

@controller("/api")
export class UserController implements interfaces.Controller {
  private _userService: IUserService;

  constructor(@inject(TYPES.UserService) userService: IUserService) {
    this._userService = userService;
  }

  @httpGet('/users')
  @OpenAPI({ summary: 'Return a list of users' })
  async getUsers() {
    const findAllUsersData = await this._userService.findAllUser();
    return { data: findAllUsersData, message: 'findAll' };
  }

  @httpGet('/users/:id')
  @OpenAPI({ summary: 'Return find a user' })
  async getUserById(@Param('id') userId: string) {
    const findOneUserData = await this._userService.findUserById(userId);
    return { data: findOneUserData, message: 'findOne' };
  }

  @httpPost('/users')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @OpenAPI({ summary: 'Create a new user' })
  async createUser(@Body() userData: CreateUserDto) {
    const createUserData = await this._userService.createUser(userData);
    return { data: createUserData, message: 'created' };
  }

  @httpPut('/users/:id')
  @UseBefore(validationMiddleware(UpdateUserDto, 'body', true))
  @OpenAPI({ summary: 'Update a user' })
  async updateUser(@Param('id') userId: string, @Body() userData: UpdateUserDto) {
    const updateUserData = await this._userService.updateUser(userId, userData);
    return { data: updateUserData, message: 'updated' };
  }

  @httpDelete('/users/:id')
  @OpenAPI({ summary: 'Delete a user' })
  async deleteUser(@Param('id') userId: string) {
    const deleteUserData = await this._userService.deleteUser(userId);
    return { data: deleteUserData, message: 'deleted' };
  }
}

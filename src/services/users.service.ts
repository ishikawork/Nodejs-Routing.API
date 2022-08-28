import { hash } from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import User from '@models/users.model';
import { v4 as uuidv4 } from 'uuid';

class UserService {
  public async findAllUser(): Promise<any> {
    return User.find();
  }

  public async findUserById(userId: string): Promise<any> {
    const findUser = User.find({ id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser = await User.find({ email: userData.email });
    if (findUser.rows > 0) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    userData.id = uuidv4();
    userData.password = hashedPassword;
    const userDataDB = new User(userData);
    return userDataDB.save();
  }

  public async updateUser(userId: string, userData: UpdateUserDto): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser = await User.find({ id: userId });
    if (findUser.rows == 0) throw new HttpException(409, "User doesn't exist");
    return User.updateById(userId, userData);
  }

  public async deleteUser(userId: string): Promise<any> {
    const findUser = await User.find({ id: userId });
    if (findUser.rows == 0) throw new HttpException(409, "User doesn't exist");

    return User.removeById(userId);
  }
}

export default UserService;

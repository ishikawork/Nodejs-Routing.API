import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public id: string;

  @IsString()
  public password: string;

  @IsString()
  public name: string;

  @IsString()
  public phone: string;

  @IsString()
  public address: string;
}

export class UpdateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public phone: string;

  @IsString()
  public address: string;
}

export class GetUserDto {
  @IsString()
  public id: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public name: string;

  @IsString()
  public phone: string;

  @IsString()
  public address: string;
}

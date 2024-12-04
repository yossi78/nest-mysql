// user.mapper.ts
import { CreateUserDto } from './create.user.dto';
import { UserEntity } from './user.entity';

export const toUserEntity = (createUserDto: CreateUserDto): UserEntity => {
  const user = new UserEntity();
  user.firstName = createUserDto.firstName;
  user.lastName = createUserDto.lastName;
  return user;
};

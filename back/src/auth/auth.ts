import { User } from '../users/entities/user.entity';

export interface UserDetails {
  username: string;
  photos: string;
} // intra에서 가져올 정보

export interface AuthenticationProvider {
  login(user: User);
  validateUser(details: UserDetails);
  createUser(details: UserDetails);
  findUser(userID: string): Promise<User> | undefined;
}

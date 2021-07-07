export interface UserDetails {
  username: string;
  photos: string;
} // intra에서 가져올 정보

export interface AuthenticationProvider {
  validateUser(details: UserDetails);
  createUser(details: UserDetails);
  findUser();
}

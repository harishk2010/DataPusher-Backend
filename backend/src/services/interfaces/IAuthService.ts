


export default interface IAuthService {
  register(email:string, password:string): Promise<any>;
  login(email:string, password:string): Promise<any>;
}

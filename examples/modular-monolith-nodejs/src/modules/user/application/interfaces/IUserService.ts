/**
 * User Module: User Service Interface
 * 
 * This interface allows other modules to interact with the User module
 * without directly depending on its implementation.
 * 
 * This is the "port" in the Ports and Adapters pattern.
 */

export interface IUserService {
  getUserById(id: string): Promise<UserDTO | null>;
  getUserByEmail(email: string): Promise<UserDTO | null>;
  createUser(email: string, name: string): Promise<UserDTO>;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  status: string;
}

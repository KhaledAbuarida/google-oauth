import { Injectable } from '@nestjs/common';
import UserDetails from 'src/types/user-details.type';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
 
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {} 

  // validate user function
  async validateUser({email, displayName}: UserDetails){
    // check if user exists
    const user = await this.userRepository.findOneBy({email});
    
    // if user exists, return user
    if(user){
      return user;
    }

    // if user does not exist, create user
    console.log("Creating user....");
    const newUser = await this.userRepository.save(this.userRepository.create({email, displayName}));
    return await this.userRepository.save(newUser);
  }

  // find user by id function
  async findUserById(id: number){
    return await this.userRepository.findOneBy({id});
  }


}

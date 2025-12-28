import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { User } from "src/typeorm/entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Serializer extends PassportSerializer {
    constructor(private readonly authService: AuthService) {
        super();
    }

    serializeUser(user: User, done: Function) {
        console.log("serializing user:", user);
        done(null, user.id);
    }

    async deserializeUser(id: number, done: Function) {
        const user = await this.authService.findUserById(id);
        console.log("deserializing user:", user);

        if(!user){
            done(new Error('User not found'));
            return;
        }

        done(null, user);
    }
}
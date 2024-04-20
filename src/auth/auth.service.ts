import { LoginUserDto } from './../../dto/login-user.dto';
import { CreateUserDto } from './../../dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schema/user.schema';
import { HashService } from 'src/hash/hash.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(email);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  // use hashService
  async signUp(CreateUserDto: CreateUserDto): Promise<{ token: string }> {
    const { username, name, email, password, role } = CreateUserDto;

    const hashedPassword = await this.hashService.hashPassword(password);

    const user: CreateUserDto = await this.userModel.create({
      username,
      password: hashedPassword,
      email,
      name,
      role,
    });

    const payload = {
      username: user.username,
      email: user.email,
      sub: user._id,
    };

    const token = this.jwtService.sign(payload);

    return { token };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    console.log(loginUserDto);
    const email = loginUserDto.email;
    const password = loginUserDto.password;

    const payload = {
      email,
    };

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials (email)');
    }

    const isPasswordValid = await this.hashService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials (password)');
    }

    const token = this.jwtService.sign(payload);

    return {
      token,
    };
  }
}

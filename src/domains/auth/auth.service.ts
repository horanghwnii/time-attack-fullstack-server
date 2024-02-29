import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { LogInDto, SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getProfile(user: User) {
    const profile = await this.prismaService.user.findUnique({
      where: { id: user.id },
    });

    return profile;
  }

  /**
   * /auth/sign-up
   */
  async signUp(dto: SignUpDto) {
    const { email, password } = dto;
    if (!email.trim()) throw new NotFoundException('No email');
    if (!password.trim()) throw new NotFoundException('No password');
    if (password.trim().length < 8)
      throw new BadRequestException('Too short password');

    const data: Prisma.UserCreateInput = {
      id: nanoid(),
      email,
      encryptedPassword: await hash(password, 12),
    };

    const user = await this.prismaService.user.create({ data });
    const accessToken = this.generatedAccessToken(user);

    return accessToken;
  }

  /**
   * /auth/log-in
   */
  async logIn(dto: LogInDto) {
    const { email, password } = dto;
    if (!email.trim()) throw new NotFoundException('No email');
    if (!password.trim()) throw new NotFoundException('No password');
    if (password.trim().length < 8)
      throw new BadRequestException('Too short password');

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, email: true, encryptedPassword: true },
    });
    if (!user) throw new NotFoundException('User not found');

    const isCorrect = await compare(password, user.encryptedPassword);
    if (!isCorrect) throw new BadRequestException('Invalid password');

    const accessToken = this.generatedAccessToken(user);

    return accessToken;
  }

  // refreshToken(user: User) {
  //   const refreshedAccessToken = this.generatedAccessToken(user);
  //   return refreshedAccessToken;
  // }

  /**
   * AccessToken
   */
  generatedAccessToken(user: Pick<User, 'email'>) {
    const { email } = user;

    const JWT_SECRET_KEY = this.configService.getOrThrow(
      'JWT_SECRET_KEY',
    ) as string;
    const accessToken = sign({ email }, JWT_SECRET_KEY, {
      subject: email,
      expiresIn: '5m',
    });

    return accessToken;
  }
}

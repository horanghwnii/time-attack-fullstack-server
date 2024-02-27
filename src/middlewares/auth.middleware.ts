import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { verify } from 'jsonwebtoken';
import { ParsedQs } from 'qs';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware<Request, Response> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async use(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: (error?: any) => void,
  ) {
    req.user = null;

    const accessToken = req.headers.authorization?.split('Bearer ')[1];
    if (!accessToken) return next();

    let id;

    try {
      const secret = this.configService.getOrThrow('JWT_SECRET_KEY');
      const { sub } = verify(accessToken, secret);
      id = sub as string;
    } catch (e) {
      throw new UnauthorizedException('Invalid accessToken');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) throw new BadRequestException('Delete user');
    req.user = user;

    next();
  }
}

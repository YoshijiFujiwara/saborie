import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginInput, User } from '../graphql.schema.generated';
import { ResGql, GqlUser } from '../shared/decorators/decorators';
import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { SignUpInputDto } from './sign-up-input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './graphql-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async me(@GqlUser() user: User) {
    const { id, email } = user;
    return {
      id,
      email,
    };
  }

  @Mutation()
  async login(
    @Args('loginInput') { email, password }: LoginInput,
    @ResGql() res: Response,
  ) {
    const user = await this.prisma.client.user({ email });
    if (!user) {
      throw Error('Email or password incorrect');
    }

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      throw Error('Email or password incorrect');
    }

    const jwt = this.jwt.sign({ id: user.id });
    res.cookie('token', jwt, { httpOnly: true });
    return {
      ...user,
    };
  }

  @Mutation()
  async signUp(
    @Args('signUpInput') signUpInputDto: SignUpInputDto,
    @ResGql() res: Response,
  ) {
    const emailExists = await this.prisma.client.$exists.user({
      email: signUpInputDto.email,
    });
    if (emailExists) {
      throw Error('Email is already in use');
    }
    const password = await bcryptjs.hash(signUpInputDto.password, 10);
    const user = await this.prisma.client.createUser({
      ...signUpInputDto,
      password,
    });

    const jwt = this.jwt.sign({ id: user.id });
    res.cookie('token', jwt, { httpOnly: true });
    return {
      ...user,
    };
  }
}

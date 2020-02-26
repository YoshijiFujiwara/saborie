import { SignUpInput } from '../graphql.schema.generated';
import { IsEmail, MinLength } from 'class-validator';

export class SignUpInputDto extends SignUpInput {
  @IsEmail()
  readonly email: string;

  @MinLength(6)
  readonly password: string;
}

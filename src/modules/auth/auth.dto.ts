import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
    email: string;

  @IsNotEmpty()
  @MinLength(7)
    password: string;
}

export class RegisterDTO {
  @IsNotEmpty()
  @IsEmail()
    email: string;

  @IsNotEmpty()
  @MinLength(7)
    password: string;

  @IsNotEmpty()
  @MaxLength(20)
    name: string;
}

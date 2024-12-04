export class CreateUserDto {
  readonly id?: string; // Optional if id is auto-generated
  readonly firstName: string;
  readonly lastName: string;
}

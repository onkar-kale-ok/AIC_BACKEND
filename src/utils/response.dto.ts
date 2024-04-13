import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class commonResponseDto {
  @Expose()
  statusCode: number;

  @Expose()
  message: string;
}

@Exclude()
export class responseDataDto extends commonResponseDto {
  @Expose()
  data: any;
}

export class users {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  role: string;
}

export class userDataResponseDto extends commonResponseDto {
  @Type(() => users)
  users: users[];
}

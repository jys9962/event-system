import { Role } from '@common/domain/role';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export namespace SignIn {
  export const pattern = 'auth.sign-in';

  export class SignInRequest {
    @ApiProperty({
      description: 'Username for authentication',
      example: 'admin',
    })
    @IsString()
    @IsNotEmpty()
    username!: string;

    @ApiProperty({
      description: 'Password for authentication',
      example: '$argon2id$v=19$m=65536,t=3,p=4$l4M0r7VurxXJFTpmsWEr0Q$DN5OTAGbbGtDtYbB0DKiO75jzJNhqKRrfS7nwNiAs+k',
    })
    @IsString()
    @IsNotEmpty()
    password!: string;
  }

  export class SignInResponse {
    accessToken!: string;
    refreshToken!: string;
  }
}

export namespace RefreshAccessToken {
  export const pattern = 'auth.refresh-access-token';

  export class RefreshAccessTokenRequest {
    @IsString()
    @IsNotEmpty()
    refreshToken!: string;
  }

  export class RefreshAccessTokenResponse {
    accessToken!: string;
    refreshToken!: string;
  }
}

export namespace SignOut {
  export const pattern = 'auth.sign-out';

  export class SignOutRequest {
    @ApiProperty({
      description: 'Refresh token for generating new access token',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    @IsString()
    @IsNotEmpty()
    refreshToken!: string;
  }
}

export namespace UpdateRoles {
  export const pattern = 'auth.update-role';
  export type Request = RolesDto;
}

export namespace AddRoles {
  export const pattern = 'auth.add-role';
  export type Request = RolesDto;
}

export namespace RemoveRoles {
  export const pattern = 'auth.remove-role';
  export type Request = RolesDto;
}

export class RolesDto {
  @ApiProperty({
    description: 'User ID to update roles for',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'List of roles to be assigned',
    example: ['ADMIN', 'USER'],
    isArray: true,
    enum: Role,
  })
  @IsEnum(Role)
  @IsArray()
  @ArrayNotEmpty()
  roles!: Role[];
}

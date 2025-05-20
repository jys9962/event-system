import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthAppService } from '@common/services/auth/auth-app.service';
import {
  AddRoles,
  RefreshAccessToken,
  RemoveRoles,
  SignIn,
  SignOut,
  UpdateRoles,
} from '@common/services/auth/auth-app.service.method';
import { AllowRoles } from '../guard/allow-roles.decorator';
import { Role } from '@common/domain/role';

@ApiTags('인증')
@Controller()
export class AuthGatewayController {

  constructor(
    private readonly authAppService: AuthAppService,
  ) {}

  @Post('/auth/sign-in')
  @ApiOperation({
    summary: '로그인',
    description: '사용자 로그인을 처리합니다.',
  })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async signIn(
    @Body() dto: SignIn.SignInRequest,
  ) {
    return this.authAppService.signIn(dto);
  }

  @Post('/auth/refresh')
  @ApiOperation({
    summary: '토큰 갱신',
    description: '액세스 토큰을 갱신합니다.',
  })
  @ApiResponse({ status: 200, description: '토큰 갱신 성공' })
  @ApiResponse({ status: 401, description: '유효하지 않은 리프레시 토큰' })
  async refresh(
    @Body() dto: RefreshAccessToken.RefreshAccessTokenRequest,
  ) {
    return this.authAppService.refreshAccessToken(dto);
  }

  @Post('/auth/sign-out')
  @ApiOperation({
    summary: '로그아웃',
    description: '사용자 로그아웃을 처리합니다.',
  })
  @ApiResponse({ status: 200, description: '로그아웃 성공' })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청' })
  async signOut(
    @Body() dto: SignOut.SignOutRequest,
  ) {
    return this.authAppService.signOut(dto);
  }

  @Post('change-role')
  @AllowRoles(Role.Admin)
  @ApiOperation({
    summary: '역할 변경',
    description: '사용자의 역할을 변경합니다. 관리자 권한이 필요합니다.',
  })
  @ApiResponse({ status: 200, description: '역할 변경 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  async updateRoles(
    @Body() dto: UpdateRoles.Request,
  ) {
    return this.authAppService.updateRoles(dto);
  }

  @Post('add-roles')
  @ApiOperation({
    summary: '역할 추가',
    description: '사용자에게 새로운 역할을 추가합니다.',
  })
  @ApiResponse({ status: 200, description: '역할 추가 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  addRoles(
    @Body() data: AddRoles.Request,
  ): Promise<void> {
    return this.authAppService.addRoles(data);
  }

  @Post('remove-roles')
  @ApiOperation({
    summary: '역할 제거',
    description: '사용자의 역할을 제거합니다.',
  })
  @ApiResponse({ status: 200, description: '역할 제거 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  removeRoles(
    @Body() data: RemoveRoles.Request,
  ): Promise<void> {
    return this.authAppService.removeRoles(data);
  }


}

import {
  AddRoles,
  RefreshAccessToken,
  RemoveRoles,
  SignIn,
  SignOut,
  UpdateRoles,
} from '@common/services/auth/auth-app.service.method';

export abstract class AuthAppService {

  abstract signIn(data: SignIn.SignInRequest): Promise<SignIn.SignInResponse>

  abstract refreshAccessToken(data: RefreshAccessToken.RefreshAccessTokenRequest): Promise<RefreshAccessToken.RefreshAccessTokenResponse>

  abstract signOut(data: SignOut.SignOutRequest): Promise<void>

  abstract addRoles(data: AddRoles.Request): Promise<void>

  abstract removeRoles(data: RemoveRoles.Request): Promise<void>

  abstract updateRoles(data: UpdateRoles.Request): Promise<void>

}

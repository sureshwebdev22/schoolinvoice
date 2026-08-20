export interface CurrentUser {
  email: string;
  cognitoSub: string;
  roles: string[];
}
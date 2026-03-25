export type AuthUser = {
  id: string;
  email: string;
  fullname: string;
  createdAt: string;
};

export type AuthSignUpParams = {
  fullname: string;
  email: string;
  password: string;
};

export type AuthUpdateProfileParams = {
  fullname: string;
  email: string;
};

export type AuthUpdatePasswordParams = {
  currentPassword: string;
  newPassword: string;
};

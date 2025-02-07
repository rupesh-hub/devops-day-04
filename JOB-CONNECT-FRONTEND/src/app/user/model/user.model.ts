export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  name: string;
  password: string;
  email: string;
  profile: string;
  access_token: string;
}

export interface GlobalResponse<T> {
  message: string;
  status: string;
  code: string;
  error: string;
  errors: string[];
  data:T;
  page: Paging;
}

export interface Paging{
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserResponse {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  createOn: string;
  modifiedOn: string;
  createdBy: string;
  modifiedBy: string;
  enabled: boolean;
}

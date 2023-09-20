export type ScreenArgs = 'LOGIN' | 'SIGNIN';

export type Screen = {
    LOGIN: 'LOGIN',
    SIGNIN: 'SIGNIN'
};

export interface FormDataType {
    fullName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface FormDataError {
    fullNameError: string,
    phoneError: string,
    emailError: string,
    passwordError: string,
    confirmPasswordError: string,
}

export type LoginFormType = {
    email: string,
    password: string
}

export interface LoginErorType {
    emailError: string,
    passwordError: string,
}

export type UserData = {
    id: string;
    createdAt: string;
    fullName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
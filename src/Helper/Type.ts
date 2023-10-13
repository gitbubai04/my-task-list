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

export type Employee = {
    created_by: string;
    address: string;
    createdAt: string;
    dob: string;
    email: string;
    id: string;
    name: string;
    note: string;
    phone: string;
    uId: string;
};

export type ModalType = {
    adminId: string;
    open: boolean;
    handelClose: () => void;
    fetchData: () => void;
};

export type EmpListProps = {
    handelOpen: () => void;
};

export type EmpDataType = {
    created_by: string;
    id: string;
    uId: string;
    createdAt: string;
    name: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
    note: string;
}





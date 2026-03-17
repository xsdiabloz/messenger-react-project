export interface ISignUp {
  fullName: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IInputs<T = ISignUp> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

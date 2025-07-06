export interface BodyLoginForm {
  email: string;
  password: string;
}

export interface BodyRegisterForm extends BodyLoginForm {
  name: string;
  confirmPassword: string;
}

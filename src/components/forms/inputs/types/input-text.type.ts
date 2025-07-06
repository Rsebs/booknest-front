import type { BaseInput } from './base-input.type';

export interface InputText<T> extends BaseInput<T> {
  component: 'TextInput';
  type?: 'text' | 'email' | 'password';
}

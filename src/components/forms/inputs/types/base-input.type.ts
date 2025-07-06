type ComponentType = 'TextInput';

export interface BaseInput<T> {
  component: ComponentType;
  label: string;
  key: keyof T;
}

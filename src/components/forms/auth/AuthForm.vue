<template>
  <v-form @submit.prevent="onSubmitAuth">
    <v-card class="pa-6">
      <v-card-title>{{ isLogin ? 'Iniciar sesión' : 'Registrarse' }}</v-card-title>
      <v-card-text>
        <component
          v-for="input in inputs"
          v-model="bodyForm[input.key]"
          :is="inputComponentMap[input.component]"
          :key="input.key"
          :label="input.label"
          :type="input.type"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          :text="getSubmitText(!isLogin)"
          color="secondary"
          variant="outlined"
          @click="isLogin = !isLogin"
        />

        <v-btn type="submit" color="primary" variant="elevated" :text="getSubmitText(isLogin)" />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { inputComponentMap } from '../inputs/inputComponentMap';
import { loginUser } from '@/api/services/auth.service';
import { ref, watch, type Ref } from 'vue';
import type { BodyLoginForm, BodyRegisterForm } from './types/auth-form.type';
import type { Input } from '../inputs/types/input-union.type';

interface Props {
  type?: 'login' | 'register';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'login',
});

type FormType = Props['type'] extends 'login' ? BodyLoginForm : BodyRegisterForm;
const isLogin = ref(props.type === 'login');

const bodyForm: Ref<FormType> = ref({
  email: '',
  password: '',
  ...(!isLogin.value && {
    name: '',
    confirmPassword: '',
  }),
} as FormType);

const getLoginInputs = (): Input<BodyLoginForm>[] => [
  {
    component: 'TextInput',
    label: 'Email',
    type: 'email',
    key: 'email',
  },
  {
    component: 'TextInput',
    label: 'Contraseña',
    type: 'password',
    key: 'password',
  },
];

const getRegisterInputs = (): Input<BodyRegisterForm>[] => [
  {
    component: 'TextInput',
    label: 'Nombre',
    key: 'name',
    type: 'text',
  },
  {
    component: 'TextInput',
    label: 'Email',
    type: 'email',
    key: 'email',
  },
  {
    component: 'TextInput',
    label: 'Contraseña',
    type: 'password',
    key: 'password',
  },
  {
    component: 'TextInput',
    label: 'Confirmar contraseña',
    type: 'password',
    key: 'confirmPassword',
  },
];

const inputs = ref(isLogin.value ? getLoginInputs() : getRegisterInputs());

const getSubmitText = (isLogin: boolean) => (isLogin ? 'Iniciar sesión' : 'Registrarse');

const onSubmitAuth = async () => {
  if (!bodyForm.value.email && !bodyForm.value.password) {
    return;
  }

  const user = await loginUser(bodyForm.value.email, bodyForm.value.password);
  console.log(user);
};

watch(isLogin, (newValue) => {
  inputs.value = newValue ? getLoginInputs() : getRegisterInputs();
});
</script>

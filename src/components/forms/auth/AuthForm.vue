<template>
  <v-form @submit.prevent="onSubmitAuth">
    <v-card class="pa-6">
      <v-card-title>{{ isLogin ? $t('login') : $t('register') }}</v-card-title>
      <v-card-text>
        <component
          v-for="input in inputs"
          v-model="bodyForm[input.key]"
          :is="inputComponentMap[input.component]"
          :key="input.key"
          :label="input.label"
          :type="input.type"
          :appendIcon="input?.appendIcon"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          :text="getSubmitText(!isLogin)"
          color="secondary"
          variant="outlined"
          @click="isLogin = !isLogin"
        />

        <v-btn
          type="submit"
          color="primary"
          variant="elevated"
          :text="getSubmitText(isLogin)"
          :loading
        />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { handleApiError } from '@/utils/handleApiError';
import { inputComponentMap } from '../inputs/inputComponentMap';
import { ref, watch, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/userStore';
import type { BodyLoginForm, BodyRegisterForm } from './types/auth-form.type';
import type { Input } from '../inputs/types/input-union.type';

interface Props {
  type?: 'login' | 'register';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'login',
});

const { t } = useI18n();
const userStore = useUserStore();

type FormType = Props['type'] extends 'login' ? BodyLoginForm : BodyRegisterForm;
const isLogin = ref(props.type === 'login');
const loading = ref(false);

const bodyForm: Ref<FormType> = ref({
  email: '',
  password: '',
  ...(!isLogin.value && {
    name: '',
    confirmPassword: '',
  }),
} as FormType);

const emits = defineEmits(['isAuthenticated']);

const togglePasswordVisibility = (key: string) => {
  const indexInputPassword = inputs.value.findIndex((input) => input.key === key);
  if (inputs.value[indexInputPassword].type === 'password') {
    inputs.value[indexInputPassword].type = 'text';
    inputs.value[indexInputPassword].appendIcon!.icon = 'mdi-eye-off';
    return;
  }

  inputs.value[indexInputPassword].type = 'password';
  inputs.value[indexInputPassword].appendIcon!.icon = 'mdi-eye';
};

const appendIconProp = (key: string) => ({
  icon: 'mdi-eye',
  action: () => {
    togglePasswordVisibility(key);
  },
});
const getLoginInputs = (): Input<BodyLoginForm>[] => [
  {
    component: 'TextInput',
    label: t('email'),
    type: 'email',
    key: 'email',
  },
  {
    component: 'TextInput',
    label: t('password'),
    type: 'password',
    key: 'password',
    appendIcon: appendIconProp('password'),
  },
];

const getRegisterInputs = (): Input<BodyRegisterForm>[] => [
  {
    component: 'TextInput',
    label: t('name'),
    key: 'name',
    type: 'text',
  },
  {
    component: 'TextInput',
    label: t('email'),
    type: 'email',
    key: 'email',
  },
  {
    component: 'TextInput',
    label: t('password'),
    type: 'password',
    key: 'password',
    appendIcon: appendIconProp('password'),
  },
  {
    component: 'TextInput',
    label: t('confirmPassword'),
    type: 'password',
    key: 'confirmPassword',
    appendIcon: appendIconProp('confirmPassword'),
  },
];

const inputs = ref(isLogin.value ? getLoginInputs() : getRegisterInputs());

const getSubmitText = (isLogin: boolean) => (isLogin ? t('login') : t('register'));

const onSubmitAuth = async () => {
  try {
    loading.value = true;

    if (isLogin.value) {
      await userStore.login(bodyForm.value.email, bodyForm.value.password);
    } else {
      await userStore.signup(
        bodyForm.value.name,
        bodyForm.value.email,
        bodyForm.value.password,
        bodyForm.value.confirmPassword,
      );
    }

    emits('isAuthenticated', userStore.isAuthenticated);
  } catch (error) {
    handleApiError(error);
  } finally {
    loading.value = false;
  }
};

watch(isLogin, (newValue) => {
  inputs.value = newValue ? getLoginInputs() : getRegisterInputs();
});
</script>

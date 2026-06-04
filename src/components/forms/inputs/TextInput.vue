<template>
  <v-text-field
    v-model="model"
    :label
    :type
    required
    :append-inner-icon="appendIcon?.icon"
    @click:append-inner="appendIcon?.action"
  />
</template>

<script lang="ts" setup>
interface Props {
  label: string;
  type?: 'text' | 'email' | 'password';
  appendIcon?: {
    icon: string;
    action?: () => void;
  };
}

withDefaults(defineProps<Props>(), {
  type: 'text',
});

const model = defineModel();
</script>

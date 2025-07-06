<template>
  <v-text-field v-model="model" :label :type required />
</template>

<script lang="ts" setup>
interface Props {
  label: string;
  type?: 'text' | 'email' | 'password';
}

withDefaults(defineProps<Props>(), {
  type: 'text',
});

const model = defineModel();
</script>

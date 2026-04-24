<template>
  <v-container class="my-8 py-16">
    <v-row>
      <v-col cols="12" sm="4" lg="3">
        <h1 class="font-weight-semibold my-3">{{ $t('catalog') }}</h1>
        <p class="my-3 font-weight-light">{{ $t('catalogDescription') }}</p>
        <component
          :is="input.name"
          v-for="input in inputsSearch"
          :key="input.name"
          v-model="bodySearch[input.key]"
          v-bind="input.props"
        />
      </v-col>

      <v-col cols="12" sm="8" lg="9">
        <v-row v-if="loading" justify="center" align="center" class="h-100">
          <v-col cols="auto">
            <loading-spinner />
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col v-for="book in books" :key="book.id" cols="12" sm="6" md="4" lg="3">
            <CardBookPreview :book="book" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue';
import { useBook } from '../composables/useBook';
import { useI18n } from 'vue-i18n';
import { useSelectOption } from '@/composables/useSelectOption';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import type { SelectOption } from '@/models/selectOption.model';
import CardBookPreview from '@/components/CardBookPreview.vue';

const { t } = useI18n();

const { books, getBooks, loading } = useBook();
const {
  selectOptions: categories,
  getSelectOption: getCategories,
  loading: loadingCategories,
} = useSelectOption('category');

interface IBodySearch {
  search: string;
  categories: SelectOption[];
  sortBy: string;
  priceRange: [number, number];
}

const bodySearch: Ref<IBodySearch> = ref({
  search: '',
  categories: categories.value,
  sortBy: '',
  priceRange: [10, 20],
});

const propsDefault = {
  bgColor: 'transparent',
  clearable: true,
  density: 'comfortable',
  rounded: 'lg',
  variant: 'outlined',
};

interface IInputSelect {
  name: string;
  key: keyof IBodySearch;
  props: Record<string, unknown>;
}

const inputsSearch: ComputedRef<IInputSelect[]> = computed(() => [
  {
    name: 'v-text-field',
    key: 'search',
    props: {
      color: 'primary',
      label: 'Buscar',
      placeholder: 'Título o autor...',
      prependInnerIcon: 'mdi-magnify',
      ...propsDefault,
    },
  },
  {
    name: 'v-select',
    key: 'categories',
    props: {
      chips: true,
      color: 'primary',
      items: categories.value,
      itemTitle: 'value',
      itemValue: 'id',
      label: t('category'),
      loading: loadingCategories.value,
      multiple: true,
      ...propsDefault,
    },
  },
  {
    name: 'v-select',
    key: 'sortBy',
    props: {
      color: 'primary',
      items: ['Precio (asc)', 'Precio (desc)', 'Título', 'Autor'],
      label: 'Ordenar por',
      ...propsDefault,
    },
  },
  {
    name: 'v-range-slider',
    key: 'priceRange',
    props: {
      label: 'Precio',
      color: 'primary',
    },
  },
]);

onMounted(async () => {
  await getBooks();
  await getCategories();
});
</script>

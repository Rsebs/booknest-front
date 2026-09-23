<template>
  <v-dialog :model-value="modelValue" max-width="800" scrollable @update:model-value="emit('update:modelValue', $event)">
    <v-card v-if="book" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between pa-4 bg-grey-lighten-4">
        <span class="font-secondary font-weight-bold text-h6 text-truncate">
          {{ book.title }}
        </span>
        <v-btn icon="mdi-close" variant="text" density="comfortable" @click="close" />
      </v-card-title>

      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12" md="5" class="text-center">
            <v-img
              :src="book.coverUrl"
              height="300"
              cover
              rounded="lg"
              class="elevation-2 mb-3"
            />
            <v-chip color="primary" size="small" variant="tonal" class="mb-2">
              {{ book.categoryName }}
            </v-chip>
            <div class="d-flex align-center justify-center ga-1 my-1">
              <v-rating
                :model-value="book.rating || 0"
                color="amber-darken-2"
                density="compact"
                half-increments
                readonly
                size="small"
              />
              <span class="text-body-2 font-weight-bold">
                {{ book.rating ? book.rating.toFixed(1) : 'Sin ratings' }}
              </span>
              <span class="text-caption text-medium-emphasis">
                ({{ book.ratingCount || 0 }})
              </span>
            </div>
            <div class="text-h6 font-weight-bold text-primary my-2">
              ${{ book.price }}
            </div>
          </v-col>

          <v-col cols="12" md="7">
            <h2 class="font-secondary font-weight-bold mb-1">{{ book.title }}</h2>
            <p class="text-subtitle-1 text-medium-emphasis mb-3">
              Por <span class="font-weight-medium text-black">{{ book.author }}</span>
            </p>
            <p class="text-body-2 text-high-emphasis mb-4" style="line-height: 1.6;">
              {{ book.description }}
            </p>

            <v-btn
              color="primary"
              variant="flat"
              prepend-icon="mdi-book-open-page-variant"
              :href="book.fileUrl"
              target="_blank"
              rounded="lg"
              class="mb-6"
            >
              Leer Libro
            </v-btn>

            <v-divider class="my-4" />

            <div class="d-flex align-center justify-space-between mb-3">
              <h3 class="text-subtitle-1 font-weight-bold">
                Reseñas y Comentarios ({{ book.comments ? book.comments.length : 0 }})
              </h3>
            </div>

            <!-- Comment Form if Logged In -->
            <v-sheet
              v-if="userStore.isAuthenticated"
              color="grey-lighten-4"
              rounded="lg"
              class="pa-4 mb-4 border"
            >
              <h4 class="text-subtitle-2 font-weight-semibold mb-2">
                Deja tu reseña
              </h4>
              <div class="d-flex align-center mb-2">
                <span class="text-caption mr-2">Calificación:</span>
                <v-rating
                  v-model="newRating"
                  color="amber-darken-2"
                  density="compact"
                  size="small"
                  hover
                />
              </div>
              <v-textarea
                v-model="newComment"
                placeholder="Escribe tu opinión sobre este libro..."
                rows="3"
                variant="outlined"
                density="comfortable"
                bg-color="white"
                hide-details
                class="mb-3"
              />
              <div class="d-flex justify-end">
                <v-btn
                  color="primary"
                  size="small"
                  :loading="submitting"
                  :disabled="!newComment.trim()"
                  @click="handleAddComment"
                >
                  Publicar Reseña
                </v-btn>
              </div>
            </v-sheet>

            <!-- Login Prompt if Guest -->
            <v-alert
              v-else
              type="info"
              variant="tonal"
              density="comfortable"
              rounded="lg"
              class="mb-4"
            >
              <template #title>
                ¿Quieres calificar o comentar este libro?
              </template>
              Inicia sesión para compartir tu opinión con la comunidad.
              <template #append>
                <v-btn
                  color="primary"
                  size="small"
                  variant="flat"
                  @click="requestLogin"
                >
                  Iniciar sesión
                </v-btn>
              </template>
            </v-alert>

            <!-- Comments List -->
            <div v-if="book.comments && book.comments.length > 0" class="comments-list ga-3 d-flex flex-column">
              <v-card
                v-for="c in book.comments"
                :key="c.id"
                variant="outlined"
                density="compact"
                class="pa-3 rounded-lg"
              >
                <div class="d-flex align-center justify-space-between mb-1">
                  <span class="font-weight-bold text-body-2">{{ c.userName }}</span>
                  <span class="text-caption text-medium-emphasis">{{ c.createdAt }}</span>
                </div>
                <v-rating
                  :model-value="c.rating"
                  color="amber-darken-2"
                  density="compact"
                  readonly
                  size="x-small"
                  class="mb-1"
                />
                <p class="text-body-2 mb-0 text-high-emphasis">{{ c.comment }}</p>
              </v-card>
            </div>
            <div v-else class="text-center py-4 text-disabled text-body-2">
              Aún no hay reseñas para este libro. ¡Sé el primero en dejar una!
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Book } from '@/models/book.model';
import { useUserStore } from '@/stores/userStore';
import { addBookComment } from '@/api/services/book.service';
import { showToast } from '@/utils/vue3Toastify';

const props = defineProps<{
  modelValue: boolean;
  book: Book | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'comment-added', updatedBook: Book): void;
  (e: 'open-login'): void;
}>();

const userStore = useUserStore();
const newRating = ref(5);
const newComment = ref('');
const submitting = ref(false);

const close = () => {
  emit('update:modelValue', false);
};

const requestLogin = () => {
  close();
  emit('open-login');
};

const handleAddComment = async () => {
  if (!props.book || !newComment.value.trim()) return;

  try {
    submitting.value = true;
    const updated = await addBookComment(props.book.id, {
      rating: newRating.value,
      comment: newComment.value.trim(),
      userName: userStore.user.name || userStore.user.email || 'Usuario Demo',
      userEmail: userStore.user.email,
    });

    newComment.value = '';
    newRating.value = 5;
    showToast('¡Reseña publicada con éxito!');
    emit('comment-added', updated);
  } catch (err) {
    console.error('Error publicando comentario:', err);
    showToast('Ocurrió un error al publicar la reseña');
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.comments-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>

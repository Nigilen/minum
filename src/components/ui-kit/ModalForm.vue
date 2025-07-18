<script setup lang="ts">
import AppButton from '@/components/ui-kit/AppButton.vue';
import { useModalStore } from '@/stores/modal';
import { useTodosStore } from '@/stores/todos';
import type { IColumn, TaskStatus } from '@/types/types';
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import AppIcon from '@/components/ui-kit/AppIcon.vue';
import IconAlert from '@/components/icons/IconAlert.vue';

const modalStore = useModalStore();
const todosStore = useTodosStore();

const contentRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  id: number;
  done: boolean;
  task?: string;
  status?: TaskStatus;
  important?: boolean;
  tag?: string;
  todo: IColumn;
}>();

const emit = defineEmits<{
  (e: 'save', value: IColumn): void;
  (e: 'done', value: number): void;
  (e: 'remove', value: number): void;

  (e: 'update:task', value: string): void;
  (e: 'update:status', value: TaskStatus): void;
  (e: 'update:important', value: boolean): void;
  (e: 'update:tag', value: string): void;
}>();

const statusOptions = [
  { value: 'incoming', label: 'Входящие' },
  { value: 'day', label: 'День' },
  { value: 'week', label: 'Неделя' },
] as const;

const tagOptions = [
  { value: undefined, label: 'без тега' },
  { value: 'work', label: 'Work' },
  { value: 'self', label: 'Self' }
] as const;

const buttonLabels = computed(() => ({
  save: {
    title: modalStore.isEditMode ? 'Сохранить' : 'Добавить',
    icon: modalStore.isEditMode ? defineAsyncComponent(() => import('@/components/icons/IconSave.vue')) : defineAsyncComponent(() => import('@/components/icons/IconPlus.vue')),
  },
  done: {
    title: props.done ? 'В работу' : 'Завершить',
    icon: props.done ? defineAsyncComponent(() => import('@/components/icons/IconDone.vue')) : defineAsyncComponent(() => import('@/components/icons/IconNotDone.vue')),
  },
  remove: {
    title: 'Удалить',
    icon: defineAsyncComponent(() => import('@/components/icons/IconTrash.vue')),
  },
  cancel: {
    title: 'Отмена', 
    icon: defineAsyncComponent(() => import('@/components/icons/IconX.vue')),
  }
}));


onMounted(() => {
  if (modalStore.isOpen) {
    contentRef.value?.focus();
  }
});

const handleTaskInput = (e: Event) => {
  emit('update:task', (e.target as HTMLTextAreaElement).value);
}

const handleStatusChange = (e: Event) => 
  emit('update:status', (e.target as HTMLSelectElement).value as TaskStatus);

const handleTagChange = (e: Event) => 
  emit('update:tag', (e.target as HTMLSelectElement).value);

const handleImportantChange = (e: Event) => 
  emit('update:important', (e.target as HTMLInputElement).checked);


const handleCloseModal = () => {
  todosStore.resetTodo();
  modalStore.closeModal();
};

</script>

<template>
  <form class="form" @submit.prevent="$emit('save', todo)">
    <legend class="visually-hidden">Параметры задачи</legend>
    <textarea 
      ref="contentRef"
      class="form__input"
      :value="task"
      @input="handleTaskInput"
      placeholder="Что-то новенькое?..." 
      aria-label="Текст задачи"
    >
    </textarea>

    <fieldset class="form__params params">
      <label class="params__label" for="param-status">
        <select 
          class="params__input" 
          name="param-status" 
          id="param-status" 
          :value="status"
          @change="handleStatusChange"
        >
          <option v-for="item in statusOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
        </select>
      </label>
      <label class="params__label" for="param-important">
        <input 
          class="params__input params__input--checkbox" 
          type="checkbox" 
          name="param-important" 
          id="param-important" 
          :checked="important"
          @change="handleImportantChange"
          aria-label="Важная задача"
          :aria-checked="important"
        />
        <AppIcon :icon="IconAlert" class="menu__icon" />
      </label>
      <label class="params__label" for="param-tag">
        <select 
          class="params__input" 
          name="param-tag" 
          id="param-tag" 
          :value="tag"
          @change="handleTagChange"
        >
          <option 
            v-for="item in tagOptions" 
            :key="item.value" 
            :value="item.value || ''"
          >
            {{ item.label }}
          </option>
        </select>
      </label>
    </fieldset>

    <div class="form__controls controls">
      <AppButton 
        class="controls__item" 
        @click="$emit('save', todo)" 
        :ariaLabel="buttonLabels.save.title"
      >
        <AppIcon :icon="buttonLabels.save.icon" class="menu__icon" />
      </AppButton>
      <AppButton 
        class="controls__item" 
        @click="$emit('done', id)" 
        :ariaLabel="buttonLabels.done.title"
      >
        <AppIcon :icon="buttonLabels.done.icon" class="menu__icon" />
      </AppButton>
      <AppButton 
        class="controls__item" 
        @click="$emit('remove', id)" 
        :ariaLabel="buttonLabels.remove.title"
      >
        <AppIcon :icon="buttonLabels.remove.icon" class="menu__icon" />
      </AppButton>
      <AppButton 
        class="controls__item" 
        @click="handleCloseModal" 
        :ariaLabel="buttonLabels.cancel.title"
      >
        <AppIcon :icon="buttonLabels.cancel.icon" class="menu__icon" />
      </AppButton>
    </div>
  </form>
</template>


<style lang="scss" scoped>

.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;

  &__input {
    border: none;
    padding: 5px;
    font: inherit;
    width: 100%;
    resize: none;
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  &__params {
    display: flex;
    column-gap: 20px;
    border: none;
    padding: 5px;
    grid-column: 1 / 2;
    inline-size: max-content;
    align-items: center;
  }
  &__controls {
    padding: 5px;
    grid-column: 2 / 3;
    inline-size: max-content;
    align-items: center;
  }

  @media (width < 768px) {
    grid-template-columns: 1fr;
    justify-content: center;
    gap: 0;

    &__params {
      grid-column: 1 / 1;
      grid-row: 2 / 3;
      width: 100%;
      justify-content: space-between;
    }

    &__controls {
      grid-column: 1 / 1;
      grid-row: 3 / 3;
      justify-content: space-between;
      width: 100%;
    }
  }
}

.params {
  &__label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  &__input {
    
    &--checkbox {
      display: none;

      &:checked {
        & + .menu__icon {
          stroke: tomato;
          stroke-width: 3px;
        }
      }
    }
  }
  &__icon {
    width: 20px;
    height: 20px;
    margin-inline-end: 10px;
    vertical-align: middle;

  }
}

.controls {
  display: flex;
  column-gap: 20px;
  margin-inline-start: auto;
  
  &__item {
    background-color: transparent;
    cursor: pointer;
  }
}

</style>
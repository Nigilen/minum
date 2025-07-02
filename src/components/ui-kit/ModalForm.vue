<script setup lang="ts">
import AppButton from '@/components/ui-kit/AppButton.vue';
import { useModalStore } from '@/stores/modal';
import type { IColumn } from '@/types/types';
const modalStore = useModalStore();

defineProps<{
  id: number;
  done: boolean;
  task?: string;
  status?: string;
  important?: boolean;
  tag?: string;
  todo: IColumn;
}>();

defineEmits<{
  (e: 'save', value: IColumn): void;
  (e: 'done', value: number): void;
  (e: 'remove', value: number): void;

  (e: 'update:task', value: string): void;
  (e: 'update:status', value: string): void;
  (e: 'update:important', value: boolean): void;
  (e: 'update:tag', value: string): void;
}>();

</script>

<template>
  <form class="form" @submit.prevent>
    <textarea 
      class="form__input-field" 
      name="input-field" 
      id="input-field" 
      placeholder="some new task ..." 
      :value="task"
      @input="$emit('update:task', ($event.target as HTMLTextAreaElement).value)"
    >
    </textarea>

    <fieldset class="form__params params">
      <select 
        class="params__item" 
        name="param-status" 
        id="param-status" 
        :value="status"
        @change="$emit('update:status', ($event.target as HTMLSelectElement).value)"
      >
        <option value="incoming" selected>Входящие</option>
        <option value="day">День</option>
        <option value="week">Неделя</option>
      </select>
      <label class="params__item" for="param-important">
        <input 
          class="params__item-input" 
          type="checkbox" 
          name="param-important" 
          id="param-important" 
          :checked="important"
          @change="$emit('update:important', ($event.target as HTMLInputElement).checked)"
        />
        Важная
      </label>
      <select 
        class="params__item" 
        name="param-tag" 
        id="param-tag" 
        :value="tag"
        @change="$emit('update:tag', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">без тега</option>
        <option value="work">work</option>
        <option value="self">self</option>
      </select>
    </fieldset>

    <div class="form__controls controls">
      <AppButton 
        class="controls__item" 
        @click="$emit('save', todo)" 
      >{{ modalStore.editModal ? 'Сохранить' : 'Добавить' }}</AppButton>
      <AppButton 
        class="controls__item" 
        @click="$emit('done', id)" 
      >{{ done ? 'В работу' : 'Завершить' }}</AppButton>
      <AppButton class="controls__item" @click="$emit('remove', id)">Удалить</AppButton>
      <AppButton class="controls__item" @click="modalStore.closeModal">Отмена</AppButton>
    </div>
  </form>
</template>


<style lang="scss" scoped>

.form {

  &__input-field {
    width: 100%;
    height: 100px;
    resize: none;
    border: none;
    font: inherit;
  
    &:focus {
      outline: none;
    }
  }
}

.params {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  border: none;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__item {
    padding-block: 10px;
  }
}

</style>
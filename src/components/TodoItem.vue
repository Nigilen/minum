<script setup lang="ts">
  import AppButton from '@components/ui-kit/AppButton.vue';
  import IconDoneBtn from '@components/icons/IconDoneBtn.vue';
  import IconCloseBtn from '@components/icons/IconCloseBtn.vue';
  import { ref } from 'vue';

  const props = defineProps<{
    data?: {
      id: number,
      task: string,
      status: string,
      done: false
    };
  }>();

  const isDone = ref(false);
  const isImportant = ref(true);

  const handleDone = () => {
    isDone.value = !isDone.value;
  };

</script>

  <template>
    <li class="item" :class="{ 'item--done': props.data.done }">
      <AppButton class="item__done-btn" @click="handleDone">
        <IconDoneBtn :class="{'item__done-btn--important': isImportant}" />
      </AppButton>
      <p class="item__text">
        <span class="item__tag">dev</span>
        <span class="item__divider"> | </span>
        {{props.data.task}}
      </p>
      <AppButton class="item__remove-btn">
        <IconCloseBtn />
      </AppButton>
    </li>
  </template>

<style scoped lang="scss">

.item {
  position: relative;
  display: flex;
  align-items: first baseline;
  column-gap: 10px;
  padding: 3px;
  border-radius: 5px;

  &__text {
    position: relative;
    inline-size: 100%;
    border: none;
    resize: none;
    font-family: var(--font-family);
    overflow: hidden;
    padding: 0;
    cursor: default;
    max-inline-size: 388px;
  }

  &__tag {
    font-size: var(--text-size-secondary);
    color: var(--text-color-secondary);
  }

  &__divider {
    font-size: var(--text-size-secondary);
    color: var(--text-color-secondary);
  }

  &__done-btn {
    transition-duration: .2s;

    &--important {
      stroke: tomato;
    }
  }

  &:hover &__done-btn {
    transform: scale(1.4);
  }

  &__remove-btn {
    position: absolute;
    transition-duration: .2s;
    display: none;
    top: 0;
    right: -15px;
    padding: 3px;
  }

  &:hover &__remove-btn {
    display: flex;
  }

  &--done &__text {
    background-color: var(--bg-color-secondary);
    color: var(--text-color-secondary);
    text-decoration: line-through;
  }

  &--done &__done-btn svg {
    fill: var(--text-color-secondary);
    stroke: none;
  }
  
}


</style>

<script setup lang="ts">
  import IconDone from "@/components/icons/IconDone.vue";
  import IconNotes from "@/components/icons/IconNotes.vue";
  import IconTimer from "@/components/icons/IconTimer.vue";
  import IconSound from "@/components/icons/IconSound.vue";
</script>

<template>
  <nav class="menu">
    <ul class="menu__list">
      <li class="menu__item menu-item">
        <RouterLink class="menu__link" exactActiveClass="menu__link--active" to="/">
          <IconDone />
          Todo
        </RouterLink>
      </li>
      <li class="menu__item menu-item">
        <RouterLink class="menu__link" exactActiveClass="menu__link--active" to="/notes">
          <IconNotes />
          Записи
        </RouterLink>
      </li>
      <li class="menu__item menu-item">
        <RouterLink class="menu__link" exactActiveClass="menu__link--active" to="/timer">
          <IconTimer />
          Таймер
        </RouterLink>
      </li>
      <li class="menu__item menu-item">
        <RouterLink class="menu__link" exactActiveClass="menu__link--active" to="/music">
          <IconSound />
          Музыка
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
  .menu {
    padding-block: 4px;
    margin-inline: auto;

    &__list {
      list-style: none;
      padding: 0;

      display: flex;
      align-items: center;
      column-gap: min(9vw, 116px);
    }

    &__link {
      text-decoration: none;
      color: inherit;
      text-transform: uppercase;
      transition-duration: .2s;

      display: flex;
      align-items: center;
      column-gap: 15px;
      padding-block: 4px;
      color: var(--text-color-secondary);
      stroke: var(--text-color-secondary);
      fill: var(--text-color-secondary);

      &:hover, &:hover svg {
        color: var(--text-color-primary);
        stroke: var(--text-color-primary);
        fill: var(--text-color-primary);
      }
      
      &--active, &--active svg {
        color: var(--text-color-primary);
        stroke: var(--text-color-primary);
        fill: var(--text-color-primary);
      }
    }
  }
</style>
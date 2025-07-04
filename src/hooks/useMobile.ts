import { ref, onMounted, onUnmounted, type Ref } from 'vue';

const useMobile = (
  breakpoint: number = 768, 
  debounceDelay: number = 100
): Ref<boolean> => {

  const isMobile = ref(window.innerWidth < breakpoint); // моб все что ниже 768px

  let debounceTimer: number;

  const handleResize = () => { // проверяем моб или нет
    isMobile.value = window.innerWidth < breakpoint;
  }

  const debounceResize = () => { // дебаунс
    clearTimeout(debounceTimer); // сначала очищаем предыдущий
    debounceTimer = setTimeout(handleResize, debounceDelay); // затем реагируем
  }

  onMounted(() => { // при монтированиии, вешаем слушатель ресайза окна
    window.addEventListener('resize', debounceResize) ;
  });

  onUnmounted(() => { // не забываем удалить слушатель при размонтировании
    window.removeEventListener('resize', debounceResize);
    clearTimeout(debounceTimer);
  });

  return isMobile;
}

export default useMobile;
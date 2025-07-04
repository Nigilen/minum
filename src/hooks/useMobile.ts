import { ref, onMounted, onUnmounted, type Ref } from 'vue';

const useMobile = (
  breakpoint: number = 768, 
  debounceDelay: number = 100
): Ref<boolean> => {

  const isMobile = ref(window.innerWidth < breakpoint); // моб все что ниже 768px

  let debounceTimer: number; // в него будем записывать таймер

  const handleResize = () => { // проверяем моб или нет
    isMobile.value = window.innerWidth < breakpoint;
  };

  // выполнение "ща..."
  const debounceResize = () => { // дебаунс
    clearTimeout(debounceTimer); // сначала очищаем предыдущий таймер
    debounceTimer = setTimeout(handleResize, debounceDelay); // затем запускаем новый таймер
  };

  // при монтированиии, вешаем слушатель ресайза
  onMounted(() => {
    window.addEventListener('resize', debounceResize) ;
  });

  // при размонтировании, удаляем слушатель
  onUnmounted(() => {
    window.removeEventListener('resize', debounceResize);
    clearTimeout(debounceTimer);
  });

  // Итого: при монтированиии, вешаем слушатель ресайза, при наступлении события запускающий «ленивую» функцию, помечающая ресайз как моб или нет. 
  // В дополнение: не забываем очищать таймер и удалять слушатель при размонтировании., удаляем слушатель ресайза и очищаем таймер

  return isMobile;
}

export default useMobile;
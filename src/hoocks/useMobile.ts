import { ref, onMounted, onUnmounted } from 'vue';

function useMobile (breakpoint = 768) {
  const isMobile = ref(window.innerWidth < breakpoint);
  onMounted(() => {
    window.addEventListener('resize', () => {
      isMobile.value = window.innerWidth < breakpoint;
    });
  });
  onUnmounted(() => {
    window.removeEventListener('resize', () => {
      isMobile.value = window.innerWidth < breakpoint;
    });
  });
  return isMobile;
}

export default useMobile;
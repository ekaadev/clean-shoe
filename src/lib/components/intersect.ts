export function intersect(
  node: HTMLElement,
  {
    threshold = 0.1,
    once = true,
    className = 'fade-step',
    delay = 0
  } = {}
) {
  const classes = className.trim().split(/\s+/);
  let timer: ReturnType<typeof setTimeout> | null = null;

  function cleanup() {
    node.classList.remove('opacity-0');
    node.classList.add('opacity-100');
    node.classList.remove(...classes);
    node.removeEventListener('animationend', cleanup);
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        const already = classes.every(c => node.classList.contains(c));
        if (!already) {
          timer = setTimeout(() => {
            node.classList.add(...classes);
            node.addEventListener('animationend', cleanup);
          }, delay);
        }
        if (once) observer.unobserve(node);
      } else if (!once) {
        node.classList.remove(...classes);
        node.classList.remove('opacity-100');
        node.classList.add('opacity-0');
      }
    },
    { threshold }
  );

  observer.observe(node);

  return {
    destroy() {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    }
  };
}

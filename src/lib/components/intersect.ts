// src/lib/components/intersect.ts
export function intersect(
  node: HTMLElement,
  {
    threshold = 0.1,
    once = true,
    className = 'fade-step',
    delay = 0
  }: {
    threshold?: number;
    once?: boolean;
    className?: string;
    delay?: number;
  } = {}
) {
  let timer: ReturnType<typeof setTimeout>;

  const classes = className.trim().split(/\s+/);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        timer = setTimeout(() => {
          node.classList.add(...classes);
        }, delay);
        if (once) observer.unobserve(node);
      } else {
        clearTimeout(timer);
        if (!once) node.classList.remove(...classes);
      }
    },
    { threshold }
  );

  observer.observe(node);

  return {
    destroy() {
      clearTimeout(timer);
      observer.disconnect();
    }
  };
}

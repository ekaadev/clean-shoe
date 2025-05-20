<script lang="ts">

  export interface InputProps {
    id?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    variant?: 'default' | 'error';
  }

  let {
    id = '',
    type = '',
    name = '',
    placeholder = '',
    required = false,
    variant = 'default'
  }: InputProps = $props();

  const variants = {
    default: 'rounded-sm w-full h-9 border border-gray-300 bg-transparent px-3 py-1 text-base shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black md:text-sm',
    error: 'rounded-sm w-full h-9 border border-red-500 bg-transparent px-3 py-1 text-base shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:border-red-500 md:text-sm'
  };
</script>

<input
  id={id}
  name={name}
  placeholder={placeholder}
  type={type}
  required={required}
  class={variants[variant]}
/>




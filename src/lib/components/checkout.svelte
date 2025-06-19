<script lang="ts">
  import { Toaster } from "svelte-sonner"; 
  import * as CartHandler  from '$lib/helper/cart-handler';
  import { onMount } from 'svelte';

  let cart: any = [];
  let total = 0;

  function refresh() {
    cart = CartHandler.getCart();
    total = CartHandler.getTotal();
  }

  function increment(id: string) {
    const item = cart.find(i => i.service_id === id);
    if (item) {
      CartHandler.updateQuantity(id, item.quantity + 1);
      refresh();
    }
  }

  function decrement(id: string) {
    const item = cart.find(i => i.service_id === id);
    if (item) {
      CartHandler.updateQuantity(id, item.quantity - 1);
      refresh();
    }
  }

  function remove(id: string) {
    CartHandler.removeItem(id: string);
    refresh();
  }

  onMount(refresh);
</script>

<div class="p-4 border rounded-lg max-w-xl mx-auto">
  <h2 class="text-xl font-bold mb-4">Checkout Panel</h2>
  {#if cart.length === 0}
    <p>Keranjang kosong.</p>
  {:else}
    <ul>
      {#each cart as item}
        <li class="flex items-center gap-2 mb-2 border-b pb-2">
          <span class="flex-1">{item.name}</span>
          <button on:click={() => decrement(item.service_id)} class="px-2 py-1 bg-gray-200 rounded">-</button>
          <span>{item.quantity}</span>
          <button on:click={() => increment(item.service_id)} class="px-2 py-1 bg-gray-200 rounded">+</button>
          <span class="ml-2">Rp {item.total.toLocaleString()}</span>
          <button on:click={() => remove(item.service_id)} class="ml-2 px-2 py-1 bg-red-500 text-white rounded">Hapus</button>
        </li>
      {/each}
    </ul>
    <div class="mt-4 font-bold">Total: Rp {total.toLocaleString()}</div>
  {/if}
</div>
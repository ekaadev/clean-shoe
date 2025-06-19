import { writable } from 'svelte/store';
import type { CartItem } from '$lib/types/interface/cart.interface';
import * as CartHandler from '$lib/helper/cart-handler';

export const cartStore = writable<CartItem[]>(CartHandler.getCart());

export function refreshCart() {
  cartStore.set(CartHandler.getCart());
}
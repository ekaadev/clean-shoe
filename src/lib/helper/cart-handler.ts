import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { CartItem } from '$lib/types/interface/cart.interface';

const storageKey = 'cart';

// 1. Fungsi utama untuk membuat store keranjang kita
function createCartStore() {
	// Ambil data awal dari localStorage jika ada di browser, jika tidak, array kosong.
	const initialValue: CartItem[] = browser
		? JSON.parse(localStorage.getItem(storageKey) || '[]')
		: [];

	// 2. Buat 'writable' store sebagai inti dari state kita
	const cart = writable<CartItem[]>(initialValue);

	// 3. Gunakan `subscribe` untuk menyimpan perubahan ke localStorage secara otomatis
	cart.subscribe((items) => {
		if (browser) {
			localStorage.setItem(storageKey, JSON.stringify(items));
		}
	});

	// 4. Kembalikan store beserta method-method untuk memanipulasinya.
	//    Logika di dalamnya sama persis dengan helper Anda, tetapi sekarang menggunakan `update`.
	return {
		subscribe: cart.subscribe, // Wajib ada agar bisa dianggap sebagai store
		set: cart.set, // Berguna untuk me-reset atau mengganti seluruh keranjang

		addItem: (item: Omit<CartItem, 'total'> & { qty?: number }) => {
			cart.update((currentCart) => {
				const qty = item.qty ?? 1;
				const existing = currentCart.find((i) => i.service_id === item.service_id);

				if (existing) {
					existing.qty += qty;
					existing.total = existing.qty * existing.price;
				} else {
					currentCart.push({
						service_id: item.service_id,
						service_name: item.service_name,
						qty: qty,
						price: item.price,
						total: qty * item.price,
						estimated_days: item.estimated_days
					});
				}
				return currentCart;
			});
		},

		removeItem: (service_id: number) => {
			cart.update((currentCart) => currentCart.filter((i) => i.service_id !== service_id));
		},

		increaseQuantity: (service_id: number) => {
			cart.update((currentCart) => {
				const item = currentCart.find((i) => i.service_id === service_id);
				if (item) {
					item.qty++;
					item.total = item.qty * item.price;
				}
				return currentCart;
			});
		},

		decreaseQuantity: (service_id: number) => {
			cart.update((currentCart) => {
				const itemIndex = currentCart.findIndex((i) => i.service_id === service_id);
				if (itemIndex === -1) return currentCart;

				const item = currentCart[itemIndex];
				item.qty--;
				item.total = item.qty * item.price;

				// Jika kuantitas 0 atau kurang, hapus item dari array
				if (item.qty < 1) {
					currentCart.splice(itemIndex, 1);
				}

				return currentCart;
			});
		},

		clearCart: () => {
			cart.set([]);
		}
	};
}

// 5. Buat dan ekspor satu instance dari store keranjang
export const cart = createCartStore();

// 6. Buat dan ekspor store turunan (derived stores) untuk kemudahan
export const cartItemCount = derived(cart, ($cart) => {
	// Menjumlahkan semua 'qty' dari setiap item di keranjang
	return $cart.reduce((sum, item) => sum + item.qty, 0);
});

export const cartTotal = derived(cart, ($cart) => {
	return $cart.reduce((sum, item) => sum + item.total, 0);
});

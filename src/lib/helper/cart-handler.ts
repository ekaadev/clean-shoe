import type { CartItem } from '$lib/types/interface/cart.interface';

const storageKey = 'cart';

// Ambil data keranjang terbaru dari localStorage
export function getCart() {
	if (typeof localStorage === 'undefined') return [];
	return JSON.parse(localStorage.getItem(storageKey) || '[]') as CartItem[];
}

// Simpan keranjang terbaru ke localStorage
export function saveCart(cart: CartItem[]) {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(storageKey, JSON.stringify(cart));
	}
}

// ORDER PANEL: Tambah item ke keranjang atau update qty jika sudah ada
export function addItem(item: Omit<CartItem, 'total'> & { qty?: number }) {
	const cart = getCart();
	const existing = cart.find((c: CartItem) => c.service_id === item.service_id);
	const qty = item.qty ?? 1;

	if (existing) {
		existing.qty += qty;
		existing.total = existing.qty * existing.price;
	} else {
		cart.push({
			service_id: item.service_id,
			service_name: item.service_name,
			qty: qty,
			price: item.price,
			total: qty * item.price,
			estimated_days: item.estimated_days
		});
	}

	// Save cart after either updating existing item or adding new item
	saveCart(cart);
}

// CHECKOUT PANEL: Tambah qty hanya untuk item tertentu
export function increaseQuantity(service_id: number) {
	const cart = getCart();
	const item = cart.find((c: CartItem) => c.service_id === service_id);
	if (!item) return;
	item.qty += 1;
	item.total = item.qty * item.price;
	saveCart(cart);
}

// CHECKOUT PANEL: Kurangi qty, hapus jika qty < 1
export function decreaseQuantity(service_id: number) {
	const cart = getCart();
	const item = cart.find((c: CartItem) => c.service_id === service_id);
	if (!item) return;

	item.qty -= 1;
	if (item.qty < 1) {
		removeItem(service_id);
	} else {
		item.total = item.qty * item.price;
		saveCart(cart);
	}
}

// Hapus item berdasarkan service_id
export function removeItem(service_id: number) {
	let cart = getCart();
	cart = cart.filter((c: CartItem) => c.service_id !== service_id);
	saveCart(cart);
}

// Total harga keranjang
export function getTotal(): number {
	return getCart().reduce((sum, item) => sum + item.total, 0);
}

// Cek apakah item tertentu ada di keranjang (untuk UI conditional)
export function hasItem(service_id: number): boolean {
	return getCart().some((c: CartItem) => c.service_id === service_id);
}

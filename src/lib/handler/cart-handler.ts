import type { CartItem } from '$lib/types/interface/cart.interface';

export class CartHandler {
  private static storageKey = "cart";

  // Ambil data keranjang terbaru dari localStorage
  static getCart(): CartItem[] {
    if (typeof localStorage === "undefined") return [];
    return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
  }

  // Simpan keranjang terbaru ke localStorage
  static saveCart(cart: CartItem[]) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }
  }

  // ORDER PANEL: Tambah item ke keranjang atau update qty jika sudah ada
  static addItem(item: Omit<CartItem, "total"> & { qty?: number }) {
    const cart = this.getCart();
    const existing = cart.find((c) => c.service_id === item.service_id);
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

    this.saveCart(cart);
  }

  // CHECKOUT PANEL: Tambah qty hanya untuk item tertentu
  static increaseQty(service_id: number) {
    const cart = this.getCart();
    const item = cart.find((c) => c.service_id === service_id);
    if (!item) return;
    item.qty += 1;
    item.total = item.qty * item.price;
    this.saveCart(cart);
  }

  // CHECKOUT PANEL: Kurangi qty, hapus jika qty < 1
  static decreaseQty(service_id: number) {
    const cart = this.getCart();
    const item = cart.find((c) => c.service_id === service_id);
    if (!item) return;

    item.qty -= 1;
    if (item.qty < 1) {
      this.removeItem(service_id);
    } else {
      item.total = item.qty * item.price;
      this.saveCart(cart);
    }
  }

  // Hapus item berdasarkan service_id
  static removeItem(service_id: number) {
    let cart = this.getCart();
    cart = cart.filter((c) => c.service_id !== service_id);
    this.saveCart(cart);
  }

  // Total harga keranjang
  static getTotal(): number {
    return this.getCart().reduce((sum, item) => sum + item.total, 0);
  }

  // Cek apakah item tertentu ada di keranjang (untuk UI conditional)
  static hasItem(service_id: number): boolean {
    return this.getCart().some((c) => c.service_id === service_id);
  }
}
import type { Service } from '$lib/types';

export const services: Service[] = [
	{
		id: 'fast-clean',
		name: 'Fast Cleaning',
		price: 35000,
		description:
			'Pembersihan cepat dan efisien pada bagian upper dan midsole. Cocok untuk Anda yang butuh sepatu bersih dalam waktu singkat.',
		imageUrl: 'https://placehold.co/400x300/e2e8f0/334155?text=Fast+Clean'
	},
	{
		id: 'deep-clean',
		name: 'Deep Cleaning',
		price: 50000,
		description:
			'Perawatan pembersihan sepatu secara detail dan menyeluruh pada seluruh bagian sepatu, termasuk tali dan insole.',
		imageUrl: 'https://placehold.co/400x300/cbd5e1/1e293b?text=Deep+Clean'
	},
	{
		id: 'unyellowing',
		name: 'Unyellowing',
		price: 60000,
		description:
			'Proses khusus untuk menghilangkan noda kuning (oksidasi) pada bagian midsole sepatu yang berbahan karet.',
		imageUrl: 'https://placehold.co/400x300/94a3b8/0f172a?text=Unyellowing'
	},
	{
		id: 'repaint',
		name: 'Repaint',
		price: 120000,
		description:
			'Memberikan lapisan cat baru pada sepatu Anda yang warnanya sudah pudar atau tergores.',
		imageUrl: 'https://placehold.co/400x300/64748b/1e293b?text=Repaint'
	},
	{
		id: 'waterproofing',
		name: 'Waterproofing',
		price: 45000,
		description: 'Memberikan lapisan pelindung anti air untuk melindungi sepatu dari noda dan air.',
		imageUrl: 'https://placehold.co/400x300/475569/f1f5f9?text=Waterproof'
	},
	{
		id: 'leather-care',
		name: 'Leather Care',
		price: 75000,
		description:
			'Perawatan premium khusus untuk sepatu berbahan kulit, meliputi pembersihan dan pemberian kondisioner.',
		imageUrl: 'https://placehold.co/400x300/78716c/e7e5e4?text=Leather+Care'
	},
	{
		id: 'suede-cleaning',
		name: 'Suede Cleaning',
		price: 70000,
		description:
			'Pembersihan kering menggunakan sikat dan produk khusus untuk material Suede & Nubuck yang sensitif.',
		imageUrl: 'https://placehold.co/400x300/a3a3a3/d4d4d4?text=Suede+Clean'
	}
];

export const websiteInfo = {
	name: 'Clean Shoe Surabaya',
	description:
		'Solusi perawatan sepatu terbaik di kota Surabaya. Kami memberikan layanan pembersihan profesional untuk membuat sepatu Anda tampak seperti baru setiap saat.'
};

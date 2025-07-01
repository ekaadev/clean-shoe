import { z } from 'zod';

export const formSchema = z
	.object({
		// --- Detail Pemesan ---
		fullName: z.string().min(2, { message: 'Nama lengkap harus diisi.' }),
		contact: z
			.string()
			.min(10, { message: 'Nomor telepon tidak valid, Masukkan Minimal 10 digit.' }),
		email: z.string().email({ message: 'Format email tidak valid.' }),

		// --- Detail Pengiriman ---
		deliveryType: z.enum(['antar_jemput', 'antar_sendiri'], {
			required_error: 'Pilih jenis layanan.'
		}),
		pickupDate: z.string().optional(), // Menggunakan string agar kompatibel dengan <input type="date">
		delieveryAddress: z.string().min(1, { message: 'Alamat pengantaran harus diisi.' }),
		pickupAddress: z.string().optional(),
		notes: z.string().max(250, { message: 'Catatan terlalu panjang.' }).optional()

		// --- Detail Pembayaran ---
		// paymentProvider: z.enum(['gopay', 'dana', 'ovo', 'bca_va', 'mandiri_va'], {
		// 	required_error: 'Pilih satu metode pembayaran.'
		// })
	})
	.superRefine((data, ctx) => {
		// Logika validasi kondisional
		// Jika tipenya 'Antar Jemput', maka semua field terkait wajib diisi.
		if (data.deliveryType === 'antar_jemput') {
			if (!data.pickupDate) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Tanggal pengambilan harus diisi.',
					path: ['pickupDate']
				});
			}
			if (!data.delieveryAddress || data.delieveryAddress.length < 10) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Alamat pengantaran harus diisi (min. 10 karakter).',
					path: ['delieveryAddress']
				});
			}
			if (!data.pickupAddress || data.pickupAddress.length < 10) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Alamat pengambilan harus diisi (min. 10 karakter).',
					path: ['pickupAddress']
				});
			}
		} else if (data.deliveryType === 'antar_sendiri') {
			// Untuk antar sendiri, hanya alamat pengantaran yang diperlukan
			if (!data.delieveryAddress || data.delieveryAddress.length < 10) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Alamat pengantaran harus diisi (min. 10 karakter).',
					path: ['delieveryAddress']
				});
			}
		}
	});

export type FormSchema = typeof formSchema;

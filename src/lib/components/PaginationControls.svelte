<script lang="ts">
	import { Button } from 'bits-ui';

	export let currentPage: number;
	export let totalPages: number;
	export let totalItems: number = 0;
	export let siblings: number = 1;
	export let onPageChange: (page: number) => void;

	function goToPage(pageNumber: number) {
		if (typeof pageNumber !== 'number' || isNaN(pageNumber)) {
			console.error('[PaginationControls] goToPage called with invalid pageNumber:', pageNumber);
			return;
		}
		if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
			if (onPageChange) {
				onPageChange(pageNumber);
			}
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			if (onPageChange) {
				onPageChange(currentPage - 1);
			}
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			if (onPageChange) {
				onPageChange(currentPage + 1);
			}
		}
	}

	let range: (string | number)[] = [];
	$: {
		const R: (string | number)[] = [];

		if (totalPages <= 1) {
			range = [];
		} else {
			// Selalu tambahkan halaman pertama jika ada halaman
			if (totalPages > 0) R.push(1);

			// Batas untuk angka di sekitar halaman saat ini
			// L tidak akan kurang dari 2, K tidak akan lebih dari totalPages - 1
			let L = Math.max(2, currentPage - siblings);
			let K = Math.min(totalPages - 1, currentPage + siblings);

			// Elipsis setelah halaman 1, jika L "melompati" angka 2
			if (L > 2) {
				R.push('...');
			}

			// Angka-angka di tengah
			for (let i = L; i <= K; i++) {
				R.push(i);
			}

			// Elipsis sebelum halaman terakhir, jika K "melompati" angka totalPages - 1
			if (K < totalPages - 1) {
				R.push('...');
			}

			// Selalu tambahkan halaman terakhir jika totalPages > 1
			// dan jika belum ada di R (misalnya jika K adalah totalPages-1, loop sudah menambahkannya)
			if (totalPages > 1 && (R.length === 0 || R[R.length - 1] !== totalPages)) {
				// Jika R masih [1] dan K < totalPages -1, maka R akan menjadi [1, '...', totalPages]
				// Jika R sudah berisi K, dan K adalah totalPages-1, maka R sudah [..., totalPages-1]
				// kita hanya perlu push totalPages jika belum ada.
				// Pengecekan R[R.length - 1] !== totalPages memastikan totalPages tidak ditambahkan dua kali.
				// Kasus khusus: jika totalPages=2, L=2, K=1 (loop kosong), R=[1], maka push(2) -> [1,2]
				// Jika totalPages=3, currentPage=1, S=1 -> L=2, K=1 (loop kosong), R=[1], push(3) -> [1,3]. Perlu 2.
				// Logika di atas perlu sedikit penyesuaian untuk kasus tepi dengan sedikit halaman.
				// Mari sederhanakan: setelah angka tengah, selalu coba tambahkan halaman terakhir jika berbeda dari 1
			}

			// Konstruksi ulang logika range yang lebih standar dan sering dipakai untuk menghindari kompleksitas di atas:
			const R_final: (string | number)[] = [];
			const page_threshold = 7; // Tampilkan semua jika <= 7 halaman, atau sesuaikan

			if (totalPages <= page_threshold) {
				for (let i = 1; i <= totalPages; i++) {
					R_final.push(i);
				}
			} else {
				R_final.push(1); // Halaman 1

				const showLeftDots = currentPage - siblings > 2;
				const showRightDots = currentPage + siblings < totalPages - 1;

				if (showLeftDots) R_final.push('...');

				let start = Math.max(2, currentPage - siblings);
				let end = Math.min(totalPages - 1, currentPage + siblings);

				// Penyesuaian agar tidak ada '1 ... 2' atau 'N-1 ... N'
				if (currentPage - siblings <= 2 && showLeftDots) start = 2; // Jika dekat awal, mulai dari 2 setelah elipsis
				if (currentPage + siblings >= totalPages - 1 && showRightDots) end = totalPages - 1; // Jika dekat akhir

				for (let i = start; i <= end; i++) {
					if (!R_final.includes(i)) R_final.push(i);
				}

				if (showRightDots) R_final.push('...');

				if (!R_final.includes(totalPages)) R_final.push(totalPages); // Halaman terakhir
			}

			// Membersihkan elipsis yang mungkin salah tempat (misalnya 1, ..., 2 menjadi 1, 2)
			// atau ..., ..., menjadi ...
			const cleanedRange: (string | number)[] = [];
			if (R_final.length > 0) {
				cleanedRange.push(R_final[0]);
				for (let i = 1; i < R_final.length; i++) {
					if (R_final[i] === '...' && cleanedRange[cleanedRange.length - 1] === '...') {
						// skip elipsis duplikat
					} else if (
						typeof R_final[i] === 'number' &&
						cleanedRange[cleanedRange.length - 1] === '...' &&
						R_final[i] === (cleanedRange[cleanedRange.length - 2] as number) + 1
					) {
						// Ganti elipsis jika angka berikutnya adalah kelanjutan dari angka sebelum elipsis
						// misal [1, '...', 2] -> hapus '...', tambahkan 2 (sudah ada)
						cleanedRange.pop(); // hapus '...'
						if (cleanedRange[cleanedRange.length - 1] !== R_final[i]) {
							// hindari duplikat angka
							cleanedRange.push(R_final[i]);
						}
					} else {
						cleanedRange.push(R_final[i]);
					}
				}
			}
			// Final check untuk 1 ... 2 dan N-1 ... N
			if (cleanedRange.length >= 3) {
				if (cleanedRange[0] === 1 && cleanedRange[1] === '...' && cleanedRange[2] === 2) {
					cleanedRange.splice(1, 1);
				}
			}
			if (cleanedRange.length >= 3) {
				const Lidx = cleanedRange.length;
				if (
					cleanedRange[Lidx - 3] === totalPages - 1 &&
					cleanedRange[Lidx - 2] === '...' &&
					cleanedRange[Lidx - 1] === totalPages
				) {
					cleanedRange.splice(Lidx - 2, 1);
				}
			}
			range = cleanedRange;
		}
	}
</script>

{#if totalPages > 1}
	<div
		class="mt-8 flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0"
	>
		{#if totalItems > 0}
			<div class="text-sm text-gray-700">
				Halaman <span class="font-medium">{currentPage}</span> dari
				<span class="font-medium">{totalPages}</span>
				(Total <span class="font-medium">{totalItems}</span> item)
			</div>
		{:else}
			<div class="text-sm text-gray-700">
				Halaman <span class="font-medium">{currentPage}</span> dari
				<span class="font-medium">{totalPages}</span>
			</div>
		{/if}

		<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
			<Button.Root
				onclick={prevPage}
				disabled={currentPage === 1}
				class="relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 disabled:cursor-not-allowed disabled:opacity-50 {currentPage ===
				1
					? 'text-gray-400'
					: 'text-gray-900'}"
			>
				<span class="sr-only">Sebelumnya</span>
				<svg
					class="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
						clip-rule="evenodd"
					/>
				</svg>
			</Button.Root>

			{#each range as pageNum, i (pageNum + '-' + i)}
				{#if typeof pageNum === 'string'}
					<span
						class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset"
					>
						{pageNum}
					</span>
				{:else}
					{@const isActivePage = currentPage === pageNum}
					{@const baseClasses =
						'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed'}
					{@const activePageClasses =
						'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-indigo-700'}
					{@const inactivePageClasses = 'text-gray-900 hover:bg-gray-50'}
					<Button.Root
						onclick={() => goToPage(pageNum)}
						aria-current={isActivePage ? 'page' : undefined}
						disabled={typeof pageNum !== 'number'}
						class={`
                ${baseClasses}
                ${isActivePage ? activePageClasses : inactivePageClasses}
              `}
					>
						{pageNum}
					</Button.Root>
				{/if}
			{/each}

			<Button.Root
				onclick={nextPage}
				disabled={currentPage === totalPages}
				class="relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 disabled:cursor-not-allowed disabled:opacity-50 {currentPage ===
				totalPages
					? 'text-gray-400'
					: 'text-gray-900'}"
			>
				<span class="sr-only">Selanjutnya</span>
				<svg
					class="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
						clip-rule="evenodd"
					/>
				</svg>
			</Button.Root>
		</nav>
	</div>
{/if}

<script lang="ts">
  // import component library
  import { Command } from "bits-ui";
  import { Pagination } from "bits-ui";

  // import component custom
  import Navbar from '$lib/component/Navbar.svelte';
  import Table from '$lib/component/Table.svelte';
  import SearchFilter from '$lib/component/SearchFilter.svelte';
  import type { IHistory } from '$lib/types/interface/history.interface';

  let currentPage = $state(1);
  let loading = $state(false);
  let error: string | null = $state(null);
  let currentData: IHistory[] = $state([]);

  // DATA FOR HEADER
  const columns = ['NO', 'ID ORDER', 'SERVICE', 'STATUS', 'DETAIL'];

  // DATA DUMMY FOR TESTING// DATA DUMMY FOR TESTING (SESUAI INTERFACE IHistory)
  const historyData: IHistory[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Deep Clean',
      status: 'Completed',
      destination: '/order/detail/1'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Fast Clean & Deep Cleaning',
      status: 'Pending',
      destination: '/order/detail/1'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Premium Clean',
      status: 'Completed',
      destination: '/order/detail/1'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Premium Cean',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'Premium lean',
      status: 'Pending',
      destination: '/order/detail/1'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      name: 'Premium lean 2',
      status: 'Pending',
      destination: '/order/detail/1'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440006',
      name: 'Premiu lean 2',
      status: 'Completed',
      destination: '/order/detail/1'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440007',
      name: 'Prmium lean 2',
      status: 'Pending',
      destination: '/order/detail/1'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440008',
      name: 'Pmium lean 2',
      status: 'Completed',
      destination: '/order/detail/1'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440010',
      name: 'Prmium lea 2',
      status: 'Pending',
      destination: '/order/detail/1'
    },
    {
      id: '550e800-e29b-41d4-a716-446655440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '50e8400-e29b-41d4-a716-446655440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '550e400-e29b-41d4-a716-446655440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400-e29b-41d4-a716-446655440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400-e29b-41d4-a16-446655440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400-e29b-41d4-a716-44665544009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400-e29b-41d4-a716-44665440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e840-e29b-41d4-a716-446655440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400-e29b-41d-a716-446655440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400-e29b-41d-a16-446655440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400-e2b-41d4-a716-44665544009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400-e29b-41d4-a76-44665440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e840-e29b-41d4-a716-44665544009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400-e29b-41d-a71-446655440009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e840-e2b-41d4-a716-44665544009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400-e29b-41d-a71-44665544009',
      name: 'rmium lean 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e840-e29b-4d4-a716-44665544009',
      name: 'rmium lea 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
    {
      id: '55e8400-e29b-41d-a1-446655440009',
      name: 'rmium lea 2',
      status: 'Canceled',
      destination: '/order/detail/1'
    },
  ];

  // FETCH ASYNC
  async function fetchHistoryData(): Promise<IHistory[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return historyData;
  }

  async function getCurrentPageData() {
    loading = true;
    error = null;

    try {
      const data = await fetchHistoryData();
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      // Memastikan slice bekerja dengan benar
      currentData = data.slice(start, end);

      // Debug
      console.log({
        currentPage,
        start,
        end,
        dataLength: currentData.length,
        totalPages
      });
    } catch (err) {
      error = 'Failed to fetch history data' + err;
      currentData = [];
    } finally {
      loading = false;
    }
  }

  // PAGINATION VARIABLES
  const itemsPerPage = 14;
  const totalPages = Math.ceil(historyData.length / itemsPerPage);

  // Effect untuk memuat data saat halaman berubah
  $effect(() => {
    currentPage;
    getCurrentPageData();
  });

  // Simplified logic to handle filtered data from SearchFilter component
  function handleFilteredData(filtered: IHistory[]) {
    if (filtered.length === 0) {
      getCurrentPageData();
    } else {
      currentData = filtered;
    }
  }


</script>

<Navbar />

<div class="max-w-200 ml-13 grid grid-cols-1">
  <div class="pt-5 pb-3">
    <p class="text-4xl"> HISTORY ORDER </p>
  </div>
  <div>
    <p>Here's a list history of your order.</p>
  </div>

  <!-- SEARCH INPUT -->
  <div class="py-5">
    <SearchFilter allData={historyData} onFilteredData={(filtered) => currentData = filtered} />
  </div>
</div>

<div class="px-13 py-2">
  <Table columns={columns} data={currentData} loading={loading} error={error} currentPage={currentPage} />
</div>

<!-- PAGINATION -->
{#if totalPages > 1}
  <div class="flex justify-center mt-3.5 py-2">
    <Pagination.Root
      total={totalPages}
      bind:page={currentPage}
      class="flex gap-2 items-center"
    >
      <Pagination.PrevButton class="px-3 py-1 border rounded-md">
        Previous
      </Pagination.PrevButton>

      <div class="flex gap-2">
        {#each Array(totalPages) as _, i}
          <button
            class="px-3 py-1 border rounded-md"
            class:bg-blue-500={currentPage === i + 1}
            class:text-white={currentPage === i + 1}
            on:click={() => currentPage = i + 1}
          >
            {i + 1}
          </button>
        {/each}
      </div>

      <Pagination.NextButton class="px-3 py-1 border rounded-md">
        <button on:click={() => currentPage = Math.min(totalPages, currentPage + 1)}>Next</button>
      </Pagination.NextButton>
    </Pagination.Root>
  </div>
{/if}

<script lang="ts">
  import type { IHistory } from '$lib/types/interface/history.interface';

  let { allData, onFilteredData }: {
    allData: IHistory[];
    onFilteredData: (data: IHistory[]) => void;
  } = $props();

  let searchQuery = $state("");
  let showSuggestions = $state(false);
  let suggestions = $state<IHistory[]>([]);

  function filterSuggestions() {
    if (!searchQuery.trim()) {
      suggestions = [];
      return;
    }

    suggestions = allData.filter(item =>
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3); // Tampilkan maksimal 3 saran
  }

  function handleInput() {
    filterSuggestions();
    showSuggestions = true;

    if (!searchQuery.trim()) {
      onFilteredData(allData);
    }
  }

  function selectSuggestion(item: IHistory) {
    searchQuery = item.id;
    onFilteredData([item]);
    showSuggestions = false;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && suggestions.length > 0) {
      event.preventDefault();
      selectSuggestion(suggestions[0]);
    } else if (event.key === 'Escape') {
      showSuggestions = false;
    }
  }

  function handleBlur() {
    setTimeout(() => {
      showSuggestions = false;
    }, 200);
  }
</script>

<div class="relative w-full max-w-md">
  <input
    type="text"
    placeholder="Search by Order ID..."
    bind:value={searchQuery}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    on:blur={handleBlur}
    on:focus={() => { if (searchQuery) showSuggestions = true; }}
    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {#if showSuggestions && suggestions.length > 0}
    <div class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
      {#each suggestions as item (item.id)}
        <div
          class="p-2 hover:bg-gray-100 cursor-pointer"
          on:mousedown={() => selectSuggestion(item)}
        >
          <div class="flex justify-between items-center">
            <span class="font-medium">{item.id}</span>
            <span class="text-sm text-gray-500">{item.name}</span>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
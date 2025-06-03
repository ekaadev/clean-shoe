<script lang="ts">
  export let columns: string[] = [];
  export let data: any[] = [];
  export let loading: boolean = false;
  export let error: string | null = null;
  let itemsPerPage = 14;
  export let currentPage: number = 1;

</script>
<table class="w-full table-auto border">
  <thead>
  <tr>
    {#each columns as col, index}
      {#if index === 0}
        <th class="border p-1 w-10">No</th>
      {:else if index === 1}
        <th class="border px-4 py-2 w-86">{col}</th>
      {:else if index === 3 || index === 4}
        <th class="border px-4 py-2 w-30 text-center justify-center">{col}</th>
      {:else}
        <th class="border px-4 py-2">{col}</th>
      {/if}
    {/each}
  </tr>
  </thead>
  <tbody>
  {#if loading}
    <tr>
      <td colspan={columns.length} class="border px-4 py-2 text-center">Loading data...</td>
    </tr>
  {:else if error}
    <tr>
      <td colspan={columns.length} class="border px-4 py-2 text-center text-red-500">{error}</td>
    </tr>
  {:else if data.length === 0}
    <tr>
      <td colspan={columns.length} class="border px-4 py-2 text-center">No data</td>
    </tr>
  {:else}
    {#each data as row, i}
      <tr>
        <td class="border p-1 text-center w-10">{((currentPage - 1) * itemsPerPage) + i + 1}</td>
        <td class="border px-4 py-2">{row.id}</td>
        <td class="border px-4 py-2">{row.name}</td>
        <td class="border px-4 py-2 text-center">{row.status}</td>
        <td class="border px-4 py-2 text-center">
          <a class="text-blue-500 underline" href={row.destination}>Detail</a>
        </td>
      </tr>
    {/each}
  {/if}
  </tbody>

</table>
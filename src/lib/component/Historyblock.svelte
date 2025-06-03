<script lang="ts">
  export let title: string;
  export let status: string;
  export let destination_url: string | null = null;
  export let header: boolean | null = null;
  export let idOrder: string;
</script>

<!-- ROOT dengan lebar tetap -->
<div class="border-2 grid grid-cols-4 w-full gap-3 items-center justify-between px-5 py-3 rounded-md">

  <!-- ID -->
  {#if header !== false && header !== null} <!--Header is true-->
    <div class="border-2 p-3 max-w-[500px] rounded-md text-center w-90">
      <p>ID ORDER</p>
    </div>
  {:else if header === false && header !== null} <!--Header is false but not null-->
    <div class="border-2 p-3 max-w-[400px] inline-block rounded-md text-justify w-90">
      {idOrder}
    </div>
  {/if}

  <!-- TITLE (auto width) -->
  {#if header !== false && header !== null} <!--Header is true-->
    <div class="border-2 p-3 inline-block max-w-[300px] rounded-md text-center w-500 col-span-2">
      SERVICE
    </div>
  {:else if header === false && header !== null} <!--Header is false but not null-->
    <div class="border-2 p-3 inline-block max-w-[300px] rounded-md text-justify">
      {title}
    </div>
  {/if}

  <!-- STATUS & DETAILS dengan jarak terpisah -->
  <div class="flex items-center gap-x-4 justify-end">

    <!-- STATUS (lebar tetap, teks tengah) -->
    {#if header !== false && header !== null} <!--Header is true-->
      <div class="border-2 w-28 h-10 flex items-center justify-center text-justify rounded-md">
        STATUS
      </div>
    {:else if header === false && header !== null} <!--Header is false but not null-->
      {#if status === 'Completed'}
        <div class="border-2 w-28 h-10 flex items-center justify-center text-justify rounded-md bg-green-500">
          {status}
        </div>
      {:else if status === 'Pending'}
        <div class="border-2 w-28 h-10 flex items-center justify-center text-justify rounded-md bg-amber-500">
          {status}
        </div>
      {:else if status === 'Canceled'}
        <div class="border-2 w-28 h-10 flex items-center justify-center text-justify rounded-md bg-red-500">
          {status}
        </div>
      {/if}
    {/if}

    <!-- DETAILS -->
    {#if header !== false && header !== null} <!--Header is true-->
      <div class="border-2 h-10 flex items-center justify-center px-4 rounded-md">
        DETAILS
      </div>
    {:else if header === false && header !== null} <!--Header is false but not null-->
      <div class="border-2 h-10 flex items-center justify-center px-4 rounded-md bg-gray-200">
        <a href={destination_url}>Details</a>
      </div>
    {/if}
  </div>
</div>
<script lang="ts">
  import { Button } from 'bits-ui';
  import image from '$lib/assets/placeholder.svg';
  import Input from '$lib/components/Input.svelte';
</script>

<div class="flex min-h-svh w-full items-center justify-center bg-gray-50 flex-col p-6 md:p-10">
  <div
    class="w-full flex max-w-sm md:max-w-3xl rounded-md bg-white shadow-sm justify-between items-center">
    <div class="flex flex-col gap-6">
      <div class="overflow-hidden">
        <div class="grid p-0 md:grid-cols-2">
          <form class="p-6 md:p-8" action="?/login" method="post">
            <div class="flex flex-col gap-6">
              <div class="text-center flex flex-col items-center">
                <p class="font-bold text-2xl">Welcome back</p>
                <p class="font-thin text-gray-500">Login pake akun clean-shoe mu!</p>
              </div>
              <div class="space-y-2">
                <label for="email" class="block text-gray-900 text-sm font-medium">Email</label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Masukkan email mu!"
                  type="email"
                  required={true}
                  variant="default"
                />
              </div>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <label for="password" class="text-gray-900 text-sm font-medium">Password</label>
                  <a href="/auth" class="text-gray-900 text-sm font-medium hover:underline">Lupa password?</a>
                </div>
                <Input
                  id="password"
                  name="password"
                  placeholder="Masukkan password rahasia mu!"
                  type="password"
                  required={true}
                  variant="default"
                />
              </div>
              <Button.Root
                type="submit"
                class="w-full h-9 cursor-pointer rounded-sm bg-blue-300 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-blue-400 transition-all duration-300"
              >
                Masuk gak nih?
              </Button.Root>
              <div class="relative flex items-center ">
                <div class="flex-grow border-t border-gray-300"></div>
                <span class="mx-4 text-sm text-gray-500">Or</span>
                <div class="flex-grow border-t border-gray-300"></div>
              </div>
              <Button.Root
                formaction="?/signup"
                type="submit"
                class="w-full h-9 cursor-pointer rounded-sm bg-gray-50 px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-100 transition-all duration-300 border border-gray-200"
              >
                Daftar dulu ah
              </Button.Root>
            </div>
          </form>
          <div class="w-full relative hidden md:block">
            <img src={image} alt="placeholder" class=" w-full h-full object-cover rounded-e-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

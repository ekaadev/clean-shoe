<script lang="ts">
	import { Input } from '@/components/ui/input/index';
	import * as Card from '@/components/ui/card/index';
	import * as Form from '@/components/ui/form/index';
	import { formSchema, type FormSchema } from './schemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();
	const form = superForm(data.form as SuperValidated<Infer<FormSchema>>, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<div class="flex flex-col items-center justify-center gap-8">
	<div class="flex flex-col items-center gap-1 text-center">
		<h1 class="text-3xl font-bold lg:text-4xl">Cek Pesanan Kamu, Cepat & Praktis</h1>
		<p class="text-muted-foreground mt-2 text-base lg:text-lg">
			Masukkan nomor invoice buat lihat detail pembelianmu.
		</p>
	</div>
	<Card.Root class="w-full max-w-lg">
		<Card.Content>
			<form method="post" use:enhance>
				<Form.Field {form} name="id">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Cek detail pesanan di sini</Form.Label>
							<Input
								{...props}
								bind:value={$formData.id}
								placeholder="Masukkan nomor invoice"
								required
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button class="w-full" type="submit">Cek Pesanan</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>

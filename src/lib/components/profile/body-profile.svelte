<script lang="ts">
	import * as Form from '@/components/ui/form/index';
	import { Input } from '@/components/ui/input/index';
	import { formSchema, type FormSchema } from './schemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	const { data } = $props();

	const form = superForm(data.form as SuperValidated<Infer<FormSchema>>, {
		validators: zodClient(formSchema),
		onUpdated: async ({ form }) => {
			if (form.valid && (form.message || form.posted)) {
				// Show success message
				toast.success('Profile updated successfully!');

				// Invalidate all data to refresh from server
				await invalidateAll();

				// Update form fields with fresh data after invalidation
				if (data.profile) {
					$formData.id = data.profile.id || '';
					$formData.name = data.profile.name || '';
					$formData.address = data.profile.address || '';
					$formData.phone_number = data.profile.phone_number || '';
				}
			}
		},
		onError: ({ result }) => {
			// Show error message
			toast.error('Failed to update profile. Please try again.');
			console.error('Form error:', result);
		}
	});

	const { form: formData, enhance } = form;

	onMount(() => {
		// assign data to form data
		$formData.id = data.profile.id || '';
		$formData.name = data.profile.name || '';
		$formData.address = data.profile.address || '';
		$formData.phone_number = data.profile.phone_number || '';
	});
</script>

<form method="post" action="?/patch" use:enhance>
	<!-- Hidden ID field -->
	<input type="hidden" name="id" bind:value={$formData.id} />

	<div class="flex max-w-2xl flex-col gap-4 py-4 text-base">
		<Form.Field {form} name="name">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Name</Form.Label>
					<Input {...props} bind:value={$formData.name} />
				{/snippet}
			</Form.Control>
			<Form.Description>This is your display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="address">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Address</Form.Label>
					<Input {...props} bind:value={$formData.address} />
				{/snippet}
			</Form.Control>
			<Form.Description>
				Please provide your address for shipping and billing purposes.
			</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="phone_number">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Phone Number</Form.Label>
					<Input {...props} bind:value={$formData.phone_number} />
				{/snippet}
			</Form.Control>
			<Form.Description>Please provide your phone number for contact purposes.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button type="submit" class="w-fit">Submit</Form.Button>
	</div>
</form>

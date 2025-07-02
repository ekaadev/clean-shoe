import { Xendit } from 'xendit-node';
import { PUBLIC_XENDIT_SECRET_KEY } from '$env/static/public';

const xendit = new Xendit({
	secretKey: PUBLIC_XENDIT_SECRET_KEY || ''
});

export const { Invoice } = xendit;

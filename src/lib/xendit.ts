import { Xendit } from 'xendit-node';
import { env } from '$env/dynamic/private';

const xendit = new Xendit({
	secretKey: env.XENDIT_SECRET_KEY || '',
});

export const { Invoice } = xendit;

import { fontFamily } from 'tailwindcss/fontFamily';

export default {
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans],
				mono: ['JetBrains Mono', ...fontFamily.mono]
			}
		}
	}
};

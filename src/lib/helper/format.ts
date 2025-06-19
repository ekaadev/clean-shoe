export const toUppercaseFirstWord = (value: string): string => {
	return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getLastStringUUID = (value: string): string => {
	return value.split('-').slice(-1)[0];
};

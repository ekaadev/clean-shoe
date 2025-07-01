import { v4 as uuidv4 } from 'uuid';

export const toUppercaseFirstWord = (value: string): string => {
	return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getLastStringUUID = (value: string): string => {
	return value.split('-').slice(-1)[0];
};

export const formatInvoiceOrder = (): string => {
	// generate a uuid v4
	const uuid = uuidv4();
	// get last section of uuid xxxx-xxxx-xxxx-xxxx-(xxxx)
	const lastSection = uuid.substring(uuid.lastIndexOf('-') + 1);

	// date
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	const firstSectionInvoice = 'INV';
	const secondSectionInvoice = `${year}${month}${day}`;
	// get last 4 characters of last section and convert to uppercase
	const thirdSectionInvoice = lastSection.slice(-4).toUpperCase();

	return `${firstSectionInvoice}${secondSectionInvoice}${thirdSectionInvoice}`;
};

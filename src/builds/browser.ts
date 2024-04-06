import CAMIC, { Structure, TYPES, type Type } from '../index';

declare global {
	interface Window {
		CAMIC: Record<Type, Structure[]>;
	}
}

// @ts-ignore
window.CAMIC = {};

TYPES.forEach((type) => {
	const captured = new CAMIC(type);

	window.CAMIC[type] = captured.messages;
});

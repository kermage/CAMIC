export const TYPES = ['debug', 'error', 'info', 'log', 'warn'] as const;

export type Type = (typeof TYPES)[number];

export interface Structure {
	timestamp: Date;
	arguments: IArguments;
}

export default class CAMIC {
	readonly messages: Structure[] = [];

	constructor(type: Type) {
		const original = console[type].bind(console);
		const $this = this;

		console[type] = function () {
			$this.messages.push({
				timestamp: new Date(),
				arguments: arguments,
			});
			original.apply(console, arguments as unknown as Parameters<(typeof console)[Type]>);
		};
	}
}

export const TYPES = ['debug', 'error', 'info', 'log', 'warn'] as const;

export type Type = (typeof TYPES)[number];
export type Callback = (data: Structure) => void;

export interface Structure {
	timestamp: Date;
	arguments: IArguments;
}

export default class CAMIC {
	readonly messages: Structure[] = [];
	private hooks: Callback[] = [];

	constructor(type: Type) {
		const original = console[type].bind(console);
		const $this = this;

		console[type] = function () {
			const data = {
				timestamp: new Date(),
				arguments: arguments,
			};

			$this.messages.push(data);
			$this.hooks.forEach((callback) => callback(data));
			original.apply(console, arguments as unknown as Parameters<(typeof console)[Type]>);
		};
	}

	hook(callback: Callback) {
		this.hooks.push(callback);
	}
}

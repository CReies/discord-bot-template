import type { ClientEvents } from 'discord.js';
import type ExtendedClient from './Client';
import createDebug from 'debug';

const log = createDebug('Class : Event');
log.enabled = true;

class EventBuilder<T extends keyof ClientEvents> {
	public constructor(public name: T, public once?: true) {}

	public callback!: EventFunction<T>;

	public setCallback(fn: EventFunction<T>) {
		this.callback = fn;
		return this;
	}
}

type EventFunction<T extends keyof ClientEvents> = (client: ExtendedClient, ...args: ClientEvents[T]) => unknown;

export default EventBuilder;

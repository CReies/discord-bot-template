import { join } from 'path';
import { readdirSync } from 'fs';
import createDebug from 'debug';
import type EventBuilder from '@classes/Event';
import type ExtendedClient from '@classes/Client';

const log = createDebug('Handler : Event');
log.enabled = true;

const eventHandler = async (client: ExtendedClient) => {
	const eventsPath = join(__dirname, '..', 'events');
	const categories = readdirSync(eventsPath);

	for (const category of categories) {
		const events = readdirSync(join(eventsPath, category));

		for (const event of events) {
			const { default: evt }: { default: EventBuilder<'ready'> } = await import(join(eventsPath, category, event));

			if (evt.once) {
				client.once(evt.name, (...args) => void evt.callback(client, ...args));
			} else {
				client.on(evt.name, (...args) => void evt.callback(client, ...args));
			}
		}
	}
};

export default eventHandler;

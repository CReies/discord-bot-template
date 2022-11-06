import commandHandler from '@handlers/command';
import eventHandler from '@handlers/event';
import { Client, Collection } from 'discord.js';
import CommandBuilder from './Command';
import createDebug from 'debug';

const log = createDebug('Class : Client');
log.enabled = true;

class ExtendedClient extends Client<true> {
	public constructor() {
		/* https://discord-intents-calculator.vercel.app/ */
		super({ intents: 38667 });
	}

	public commands = new Collection<string, CommandBuilder>();

	public async start() {
		await commandHandler(this);
		await eventHandler(this);
		await this.login();
		log('Client started');
	}
}

export default ExtendedClient;

import { join } from 'path';
import { readdirSync } from 'fs';
import createDebug from 'debug';
import type ExtendedClient from '@classes/Client';
import type CommandBuilder from '@classes/Command';

const log = createDebug('Handler : Command');
log.enabled = true;

const commandHandler = async (client: ExtendedClient) => {
	const commandsPath = join(__dirname, '..', 'commands');
	const groups = readdirSync(commandsPath);

	for (const group of groups) {
		const commands = readdirSync(join(commandsPath, group));

		for (const command of commands) {
			const { default: cmd }: { default: CommandBuilder } = await import(join(commandsPath, group, command));
			client.commands.set(cmd.name, cmd);
		}
	}

	client.once('ready', () => void client.application.commands.set(client.commands.map(cmd => cmd.toJSON())));
};

export default commandHandler;

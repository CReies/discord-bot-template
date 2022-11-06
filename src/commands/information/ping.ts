import CommandBuilder from '@classes/Command';
import createDebug from 'debug';

const log = createDebug('Command : Information : Ping');
log.enabled = true;


export default new CommandBuilder()
	.setName('ping')
	.setDescription('Show bot ping (ms)')
	.setCallback(async ({ client, interaction }) => {
		return interaction.reply(`Pong! \`${client.ws.ping}ms\``);
	});

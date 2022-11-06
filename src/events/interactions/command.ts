import { ChannelType } from 'discord.js';
import EventBuilder from '@classes/Event';
import createDebug from 'debug';

const log = createDebug('Events : Interaction : Command');
log.enabled = true;

export default new EventBuilder('interactionCreate').setCallback(async (client, interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.channel && interaction.channel.type == ChannelType.DM) {
		return interaction.reply({ content: "You can't use commands on DM", ephemeral: true });
	}

	if (!interaction.inCachedGuild()) {
		await interaction.guild?.fetch();
		return interaction.reply({ content: 'Saving server in cache...', ephemeral: true });
	}

	const { commandName } = interaction;
	const command = client.commands.get(commandName);

	if (!command) {
		client.application.commands.set(client.commands.map(c => c.toJSON()));
		log(`Command ${commandName} not found`);
		return interaction.reply({ content: 'Command not found', ephemeral: true });
	}

	await command.callback({ client, interaction });
	return;
});

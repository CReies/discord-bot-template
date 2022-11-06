import { SlashCommandBuilder } from '@discordjs/builders';
import createDebug from 'debug';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from '@discordjs/builders';
import type ExtendedClient from './Client';

const log = createDebug('Class : Command');
log.enabled = true;

class CommandBuilder extends SlashCommandBuilder {
	public callback!: CommandFunction;

	public setCallback(fn: CommandFunction) {
		this.callback = fn;
		return this;
	}

	public override addSubcommand(
		input:
			| SlashCommandSubcommandBuilder
			| ((subcommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder)
	) {
		super.addSubcommand(input);
		return this;
	}

	public override addSubcommandGroup(
		input:
			| SlashCommandSubcommandGroupBuilder
			| ((subcommandGroup: SlashCommandSubcommandGroupBuilder) => SlashCommandSubcommandGroupBuilder)
	) {
		super.addSubcommandGroup(input);
		return this;
	}
}

type CommandFunction = (idk: { client: ExtendedClient; interaction: ChatInputCommandInteraction<'cached'> }) => unknown;

export default CommandBuilder;

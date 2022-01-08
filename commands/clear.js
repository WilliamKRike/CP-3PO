const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

/* nicky g
Things I wanna add:
- If no input parameter, clear all (or max amount, perhaps 25-50)
- Clear up to input parameter if given one
- Log the messages deleted, probably through true/false statement in input
*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Delete messages from a channel')
		.addIntegerOption(option => option.setName('messages')
			.setDescription('Enter the amount of messages you want deleted, leave blank if max')
			.setRequired(false)),

	async execute(message) {
		const messagesClearing = message.options.getInteger('messages');
		const maxClear = 25;

		if (message.member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES])) {

			if (messagesClearing == null) {
				message.reply('No parameter input, clearing max [25] messages...');

				message.channel.bulkDelete(maxClear);

				return;
			}

			else if (messagesClearing > maxClear || messagesClearing < 1) {
				message.reply('Invalid number input, minimum 1 - max 25');

				return;
			}

			else {
				message.channel.bulkDelete(messagesClearing);

				return;
			}

		}

		else {
			message.reply('You do not have the required permissions! LOSER');

			return;
		}
	},
};
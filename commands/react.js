const { SlashCommandBuilder } = require('@discordjs/builders');
// const { Client, Intents } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('react')
		.setDescription('should react to message'),
	async execute(interaction) {
		const message = await interaction.reply({ content: 'You can react with custom emojis!', fetchReply: true });
		const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'huGoblin');
		message.react(reactionEmoji);
		message.awaitReactions().then(collected => console.log(`Collected ${collected.size} reactions`));
		/* .catch(console.error);
		const client = new Client({
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
			partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
		});

		client.on('messageReactionAdd', async (reaction) => {
			// When a reaction is received, check if the structure is partial
			if (reaction.partial) {
				// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
				try {
					await reaction.fetch();
				}
				catch (error) {
					console.error('Something went wrong when fetching the message:', error);
					// Return as `reaction.message.author` may be undefined/null
					return;
				}
			}

			// Now the message has been cached and is fully available
			console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
			// The reaction is now also fully available and the properties will be reflected accurately:
			console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
		});
*/
	},
};
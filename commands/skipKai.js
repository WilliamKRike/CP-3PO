const { SlashCommandBuilder } = require('@discordjs/builders');

const { queue } = require('./playYoutube.js');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above
module.exports = {
	data: new SlashCommandBuilder()
		.setName('skipkai')
		.setDescription('kai skip command'),
	async execute(message) {

		// get the command to play
		const command = message.client.commands.get('play');

		// play with specific skip key
		command.execute(message, true);
	},

};

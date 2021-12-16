// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pongg!');
	}
	else if (commandName === 'server') {
		await interaction.reply('Server info.');
	}
	else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
	else if (commandName === 'hi') {
		await interaction.reply(`Kill Yourself ${interaction.user.username}`);
	}
	else if (commandName === 'kolbysearchhistory') {
		await interaction.reply('1.Pineapple nudes\n2.Norewegian men in diapers\n3.How to get girlfriend who plays wow\n4.Do I need to shower\n5.NorewegianPeopleMeet web site');
	}
});

// Login to Discord with your client's token
client.login(token);
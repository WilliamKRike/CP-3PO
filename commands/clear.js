const { SlashCommandBuilder } = require('@discordjs/builders');
// nicky g 
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Delete messages from a channel')
        .addIntegerOption(option => option.setName('messages')
            .setDescription('Enter the amount of messages you want deleted, leave blank if all')
            .setRequired(false)),

    async execute(interaction){
            if (interaction.member.hasPermission("MANAGE_MESSAGES")){

            }
            else {
                interaction.reply('You do not have the required permisssions! LOSER')
            }
        }
    };
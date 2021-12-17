module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		// display info in console
		console.log('member joined');
		console.log(member.nickname);
		// welcome channel
		const greetCh = '826221643482529822';
		// roles channel
		const roleCh = '685009677922467840';
		// message to be printed in welcome channel
		const greetMsg = `Welcome <@${member.id}> to Andromeda, get your roles in the ${member.guild.channels.cache.get(roleCh).toString()} channel` ;

		// get get the channel to send the messag eto
		const channel = member.guild.channels.cache.get(greetCh);
		channel.send(greetMsg);

	},
};
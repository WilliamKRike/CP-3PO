module.exports = {
	name: 'guildMemberRemove',
	execute(guildMember) {
		console.log(`${guildMember.nickname} was kicked`);
		console.log(guildMember.nickname);
	},
};
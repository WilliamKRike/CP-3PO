module.exports = {
	name: 'channelCreate',
	execute(channel) {
		console.log(`${channel.name} was created`);
		console.log(channel.id);
	},
};
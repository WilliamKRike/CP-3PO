module.exports = {
	name: 'presenceUpdate',
	execute(oldPresence, newPresence) {
		// check if presences are null and return false
		// if (!newPresence.activities) return false;
		// if (!oldPresence) return false;
		// if (!oldPresence.activities) return false;

		// check if old presence and newPresence are the same
		// if (oldPresence.clientStatus !== newPresence.clientStatus) return;
		// console.log(`${newPresence.user.tag} presence changed`);
		/*
		// check if they were already steaming, if so return
		for (const oldActivity of oldPresence.activities) {
			//check if this si being called
			if (oldActivity.type === 'STREAMING') break;

			// go through every activity possible
			newPresence.activities.forEach(activity => {
				// if the activity is streaming
				if (activity.type == 'STREAMING') {
					// livestream channel
					const lvstrCh = '926575353303035944';
					const lvStrChCache = newPresence.guild.channels.cache.get(lvstrCh);
					// send the message
					lvStrChCache.send(`${newPresence.user.username} is streaming at: ${activity.url}`);
					console.log(`${newPresence.user.tag} is streaming at ${activity.url}`);
				}
			});
		}*/
	},
};
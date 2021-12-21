// used for image generation
const Canvas = require('canvas');
// add something to the message
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		// display info in console
		// console.log('member joined');
		// console.log(member.nickname);

		// welcome channel
		const greetCh = '826221643482529822';
		// roles channel
		const roleCh = '685009677922467840';
		// message to be printed in welcome channel
		const greetMsg = `Welcome <@${member.id}> to Andromeda, get your roles in the ${member.guild.channels.cache.get(roleCh).toString()} channel` ;

		// get get the channel to send the messag eto
		const channel = member.guild.channels.cache.get(greetCh);
		// channel.send(greetMsg);

		// canvas stuff
		// ////////////////////////////////////////////////////////////////////////////////////

		// create a 700 x 250 profile
		const canvas = Canvas.createCanvas(900, 350);
		// modifies canvas
		const context = canvas.getContext('2d');
		// set the background
		const background = await Canvas.loadImage('./background.jpg');
		// This uses the canvas dimensions to stretch the image onto the entire canvas
		context.drawImage(background, 0, 0, canvas.width, canvas.height);


		// set the color of the attatchment
		// context.strokeStyle = '#009ff';

		// draw a rectangle around the canvas, this works its just really thin
		// context.strokeRect(0, 0, canvas.width - 20, canvas.height - 20);

		// Add text for user draw
		// /////////////////////////////////////////////////////////////////////////////////////
		// select the font size and font
		context.font = '60px sans-serif';
		// pick the color
		context.fillStyle = '#808080';
		// include
		context.fillText(member.user.tag, 40, 325, 250, 5);
		// Avatar image draw
		// /////////////////////////////////////////////////////////////////////////////////////
		// pick up pen
		context.beginPath();

		// create the arc for the circle
		context.arc(160, 138, 122, 0, Math.PI * 2, true);

		// put down pen
		context.closePath();

		// save image before clip
		context.save();
		// clip off the region
		context.clip();

		const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'jpg' }));

		// Draw a shape onto the main canvas
		context.drawImage(avatar, 27, 8, 270, 270);


		// restore settings to before clip (undo clipping)
		context.restore();
		// set the avatar
		const avatarBorder = await Canvas.loadImage('./avBorder.png');

		context.drawImage(avatarBorder, 34, 12, 260, 260);


		// Message Attatchment simply shortens code by adding values to a new item
		const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

		// send the messages in the chat
		channel.send(greetMsg);
		channel.send({ files: [attachment] });


		console.log('member joined');

	},
};
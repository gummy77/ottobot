const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('replies with pong!'),
	async execute(_bot, _interaction) {
        _interaction.reply({content:"pinging....", fetchReply: true })
        .then((message) => {
            const embed = new _bot.Discord.EmbedBuilder()
                .setColor(0x0000ff)
                .setTitle("pong! :ping_pong:")
                .addFields({name:"time taken: ", value:`${message.createdTimestamp - _interaction.createdTimestamp}ms`})
                .setFooter({text:"'if i put you in a meatgrinder''"})
            message.edit({content:"", embeds:[embed]})
                .catch((errorMsg) => {_bot.callError(_interaction, errorMsg)})
        })
	}
};

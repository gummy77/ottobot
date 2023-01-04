const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('purges messages!')
        .addIntegerOption(option => 
            option
                .setName('number')
                .setDescription("The ammount of messages to purge")
                .setRequired(true)
                .setMaxValue(99)
                .setMinValue(1))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(_shard, _interaction) {
        const count = _interaction.options.getInteger('number');
        await _interaction.reply({content:`purging ${count} messages`})
        await _interaction.channel.bulkDelete(count+1)
	}
};

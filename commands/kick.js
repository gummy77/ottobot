const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('kicks members!')
        .addUserOption(option => 
            option
                .setName('member')
                .setDescription("the member to kick")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(_shard, _interaction) {
        const member = _interaction.options.getMember('member');
        await _interaction.reply({content:`Kicking ${member.displayName}`})
        await member.kick()
	}
};

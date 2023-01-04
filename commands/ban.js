const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('bans users!')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription("the user to ban")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(_shard, _interaction) {

        const user = _interaction.options.getUser('user');
        await _interaction.reply({content:`Banned ${user.displayName}`})
        await _interaction.guild.members.ban(user)
	}
};

require("dotenv").config()

class bot {

      /*
    --------------------------[Console Messagers]----------------------------------
    */

    post(_postMsg) {
        console.log(`[POST]..\n` + _postMsg)
    }
    warning(_warningMsg){
        console.log(`[WARNING]..`)
        console.log(_warningMsg)
    }
    error(_errorMsg) {
        console.log(`[ERROR]..\n`)
        console.log(_errorMsg)
    }
    
    callLackPerms(permsList) {
        const embed = lackPerms.addFields({name:"Im missing:",content:permsList})
        _interaction.reply({embeds: [ embed ]})
    }

    callError(_interaction, _errorMsg){
        _interaction.reply({embeds: [ this.errorToUser ]})
        this.error(_errorMsg)
    }
    

      /*
    --------------------------[Constructor for bot Object]----------------------------------
    */

    constructor() {
        this.Discord = require("discord.js")
        this.fs = require('fs')
        this.path = require('path')
        
        this.client = new this.Discord.Client({ intents: [this.Discord.GatewayIntentBits.Guilds] })
        
        this.config = JSON.parse(this.fs.readFileSync("./config.json", "utf8"))
        
        // this.commands = new this.Discord.Collection()
        // this.client.commands = this.commands
        // this.generateCommands()
        
        this.readyEmbeds()
        
        this.post("Successfully loaded bot class.")
    }

    generateCommands() {
        const commandsPath = this.path.join(__dirname, "commands")

        this.fs.readdir(commandsPath, (err, files) => {
            if(err) {
                this.error(err)
            } else {
                files.forEach(file => {
                    const filePath = this.path.join(commandsPath, file)
                    const command = require(filePath)

                    if('data' in command && 'execute' in command) {
                        this.client.commands.set(command.data.name, command)
                    } else {
                        this.warning(`The Command at ${filePath} is missing a required "data" or "exucute" property`)
                    }
                })
            }
        })
    }
    
      /*
    --------------------------[Sets up all Discord bot functions]----------------------------------
    */
    
    init() {
        

        this.client.on("ready",() => {
            this.readyDiscord()
        })

        this.client.on("error", this.error)
        
        // this.client.on(this.Discord.Events.InteractionCreate, async interaction => {
        //     this.interactionReceive(interaction)
        // })

        // this.client.on(this.Discord.Events.ShardError, error => {
        //     this.error('Websocket connection error:', error)
        // });
        
        this.client.login(process.env.TOKEN).catch(this.error)
        this.post(`Initialisation Started.`)
    }
    
      /*
    --------------------------[Sets up Discord bot visually, and posts in console]----------------------------------
    */
    
    readyDiscord() {
        //this.updateDiscord();
        this.post(`Successfully Connected to Discord. -> BOTUSER: ${this.client.user.tag}`)
    }
    
      /*
    --------------------------[Updates Discord bot visually]----------------------------------
    */
  
    updateDiscord() {
        this.client.user.setActivity(`jerma clips`, { type: this.Discord.ActivityType.Watching })
        this.client.user.setStatus('online')
    }
    
      /*
    --------------------------[Manages when Interactions are sent to bot]----------------------------------
    */
    
    async interactionReceive(_interaction) {

        if (!_interaction.isChatInputCommand()) return

        const command = _interaction.client.commands.get(_interaction.commandName)

        
        if(!command) return

        // if(cmd.help.restrictions.length != 0){
        //     for(var i in cmd.help.restrictions){
        //         switch(cmd.help.restrictions[i]){
        //         case("owner"):
        //             if(this.config.owners.includes(msg.author.id)) continue
        //             msg.channel.send(this.permsDeny.setTitle("Missing Permissions: ```Bot Owner```"))
        //             return permission = false
        //         case("administrator"):
        //             if(msg.member.permissions.has("ADMINISTRATOR")) continue
        //             msg.channel.send(this.permsDeny.setTitle("Missing Permissions: ```Administrator```"))
        //             return permission = false
        //         case("blocked"):
        //             msg.channel.send(this.permsDeny.setTitle("Missing Permissions: ```higher being```"))
        //             return permission = false
        //         }
        //     }
        // }
        
        try {
            //if(permission){
            await command.execute(this, _interaction)
            //}
        } catch(_errorMsg) {
            await this.callError(_interaction, _errorMsg)
        }
        
    }
    
      /*
    --------------------------[Prepares Embeds that are Frequently used]----------------------------------
    */
    
    readyEmbeds() {
        this.permsDeny = new this.Discord.EmbedBuilder()
            .setColor(0x0000ff)
            .setTitle("insufficient permmisions nerd!")
            .setDescription("you don't have the permissions required to use this command.\nSorry!")
            .setFooter({text:"'if i put you in a meatgrinder''"})

        this.lackPerms = new this.Discord.EmbedBuilder()
            .setColor(0x0000ff)
            .setTitle("i dont have the perms...")
            .setDescription("I don't have the permissions required to use this command.\nSorry!")
            .setFooter({text:"'if i put you in a meatgrinder''"})
        
        this.errorToUser = new this.Discord.EmbedBuilder()
            .setColor(0xFAA0A0)
            .setTitle("i broke..")
            .addFields({name:"there's been an error!", value:"sorries!"})
            .setFooter({ text:"'if i put you in a meatgrinder''"})
    }  
}


let botObj = new bot()
botObj.init()
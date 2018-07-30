const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '+';


 client.on('ready',  () => {
	 client.user.setStatus("Online");
    console.log('By : _xShaDowZx | Witherr');
    console.log(`Logged in as * [ " ${client.user.username} " ] servers! [ " ${client.guilds.size} " ]`);
    console.log(`Logged in as * [ " ${client.user.username} " ] Users! [ " ${client.users.size} " ]`);
    console.log(`Logged in as * [ " ${client.user.username} " ] channels! [ " ${client.channels.size} " ]`);
  }); 
  
 
  client.on("guildCreate", guild => {
    console.log(` Join Bot Of Server ${guild.name} Owner Of Server ${guild.owner.user.username}!`)
  });
//Activity
client.on('ready',() =>{

setInterval(function(){

client.user.setActivity(` ON ${client.guilds.size} Server(s) -> +help`,"+")

},10000)

});

//warn 
client.on('message', msg => { 
    if (msg.content.startsWith('+warn')) {
      if(!msg.member.hasPermission("MUTE_MEMBERS")) return;
       let args = msg.content.split(" ").slice(1);
      if (!msg.mentions.members.first()) return msg.reply('**Mention a user/player ```Example: +warn @unknown#1547 spamming```**')
      if (!args[1]) return msg.reply('**Reason for warning**')
      if (msg.guild.channels.find('name', '⚠-warns')) {
        msg.guild.channels.find('name', '⚠-warns').send(`
      ***You have been warned*** : ${msg.mentions.members.first()}
      ***___Because you did the following___***
      ${args.join(" ").split(msg.mentions.members.first()).slice(' ')}
      `)
      }
    }
});
//ID ban
client.on('message' , message => {
    var prefix = "+";
    let user = message.mentions.users.first()|| client.users.get(message.content.split(' ')[1])
    if(message.content.startsWith(prefix + 'IDBan')) {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('❌|**You dont have enough permissions!**');
        if(!user) return  message.channel.send('Do this ```Example: +IDBan PlayerID```');
        message.guild.ban(user);
        var embed = new Discord.RichEmbed()
        .setThumbnail(message.author.avatarURl)
        .setColor("RANDOM")
        .setTitle('**●ban** !')
        .addField('**●User ban :** ', `${user}` , true)
        .addField('**●By :**' ,       ` <@${message.author.id}> ` , true)
        .setAuthor(message.guild.name)
        message.channel.sendEmbed(embed)
    }
});

//ban


//kick


//clear
client.on('message', msg => {
  var prefix ="+"
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

    if(command === "clear") {
        const emoji = client.emojis.find("name", "wastebasket")
    let textxt = args.slice(0).join("");
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    if (textxt == "") {
        msg.delete().then
    msg.channel.send("***```Set the number of messages you want to delete 👌```***").then(m => m.delete(3000));
} else {
    msg.delete().then
    msg.delete().then
    msg.channel.bulkDelete(textxt);
        msg.channel.send("```php\n The number of messages that have been cleared: " + textxt + "\n```").then(m => m.delete(3000));
        }    
    }
}
});
//mute
client.on("message", message => {
  if (message.author.bot) return;
  
  let command = message.content.split(" ")[0];
  
  if (command === "+mute") {
        if (!message.member.hasPermission('MUTE_MEMBERS')) return message.reply("** You dont have permissions **").catch(console.error);
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'mute-log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!muteRole) return message.reply("** There is no Mute Role 'Muted' **").catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('** You must mention person first ```Example: +mute @unknown#1547 spamming```**').catch(console.error);
  
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('User:', 'Shut up / tell')
    .addField('Muted:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('By:', `${message.author.username}#${message.author.discriminator}`)
   
   if (!message.guild.member(client.user).hasPermission('MUTE_MEMBERS')) return message.reply('** You dont have permissions **').catch(console.error);
 
  if (message.guild.member(user).roles.has(muteRole.id)) {
return message.reply("**:white_check_mark: .. The member was given Muted**").catch(console.error);
} else {
    message.guild.member(user).addRole(muteRole).then(() => {
return message.reply("**Done The member got muted .. :white_check_mark:**").catch(console.error);
});
  }

};

});
//unmute
   client.on("message", message => {
  if (message.author.bot) return;
  
  let command = message.content.split(" ")[0];
  
  if (command === "+unmute") {
        if (!message.member.hasPermission('MUTE_MEMBERS')) return message.reply("** You dont have permissions **").catch(console.error);
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'mute-log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!muteRole) return message.reply("** There is no Mute Role 'Muted' **").catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('** You must mention person first ```Example: +unmute @unknown#1547```**').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('User:', 'Shut up / tell')
    .addField('Unmuted:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('By:', `${message.author.username}#${message.author.discriminator}`)

  if (!message.guild.member(client.user).hasPermission('MUTE_MEMBERS')) return message.reply('** You dont have permissions **').catch(console.error);

  if (message.guild.member(user).removeRole(muteRole.id)) {
return message.reply("**:white_check_mark: .. Done Unmuted **").catch(console.error);
} else {
    message.guild.member(user).removeRole(muteRole).then(() => {
return message.reply("**Done Unmuted .. :white_check_mark:**").catch(console.error);
});
  }

};

});

//mutechannel and unmutechannel
client.on('message', message => {

    if (message.content === "+mutechannel") {
                        if(!message.channel.guild) return message.reply(' **This command only for servers**');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **You do not have permissions**');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("**Chat has been muted **:white_check_mark: ")
           });
             }
if (message.content === "+unmutechannel") {
    if(!message.channel.guild) return message.reply(' **This command only for servers**');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**You do not have permissions**');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               message.reply("**Chat has been unmuted** :white_check_mark:")
           });
             }

});
//mute voice
client.on('message', message => {
  var prefix = "+"
      if(message.content.startsWith(prefix + 'mutevoice')) {
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage("**You do not have permission to give mute voice**:x: ").then(m => m.delete(5000));
        if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("**I Don't Have `MUTE_MEMBERS` Permission**").then(msg => msg.delete(6000))
         
      if(message.mentions.users.size === 0) {
        return message.reply("**Mention a player to give him mute** ```Example: +mutevoice @unknown#1547```");
      }
      let muteMember = message.guild.member(message.mentions.users.first());
      if(!muteMember) {
        return message.reply("**Try again.**");
      }
      muteMember.setMute(true);
      if(muteMember) {
        message.channel.sendMessage("**User got voice muted successfully.**");
      }
    }
  });
//unmute voice
  client.on('message', message => {
    var prefix = "+"
    if(message.content.startsWith(prefix + 'unmutevoice')) {
      if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage("**You do not have permission to give mute voice**:x: ").then(m => m.delete(5000));
      if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("**I Don't Have `MUTE_MEMBERS` Permission**").then(msg => msg.delete(6000))
       
    if(message.mentions.users.size === 0) {
        return message.reply("**Mention a player to unmute him** ```Example: +unmutevoice @unknown#1547```");
    }
    let muteMember = message.guild.member(message.mentions.users.first());
    if(!muteMember) {
      return message.reply("**Try again.**");
    }
    muteMember.setMute(false);
    if(muteMember) {
      message.channel.sendMessage("**User got unmuted voice successfully.**");
    }
  }
});
//move
client.on('message', message => {
	const prefix = '+'
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'move')) {
 if (message.member.hasPermission("MOVE_MEMBERS")) {
 if (message.mentions.users.size === 0) {
 return message.reply("**Mention a player to move it to you** ```Example: +move @unknown#1547```")
}
if (message.member.voiceChannel != null) {
 if (message.mentions.members.first().voiceChannel != null) {
 var authorchannel = message.member.voiceChannelID;
 var usermentioned = message.mentions.members.first().id;
var embed = new Discord.RichEmbed()
 .setTitle("Succes!")
 .setColor("#000000")
 .setDescription(`**You moved <@${usermentioned}> to your voice channel successfully :white_check_mark: **`)
var embed = new Discord.RichEmbed()
.setTitle(`You are Moved in ${message.guild.name}`)
 .setColor("#000000")
.setDescription(`<@${message.author.id}> moved you to his channel!\nServer => ${message.guild.name}`)
 message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
message.guild.members.get(usermentioned).send(embed)
} else {
message.channel.send("**You can`t move this member **"+ message.mentions.members.first() +" **He must/should join voice to channel to move it**")
}
} else {
 message.channel.send("**You have to be in voice channel if you want to move him to you**")
}
} else {
message.react("❌")
 }}});
//report
client.on('message', msg => { 
if (msg.content.startsWith(`+report`)) {

   let args = msg.content.split(" ").slice(1);

  if (!msg.mentions.members.first()) return msg.reply('**You must mention person first** ```Example: +report @unknown#1547 spamming``` ')

  if (!args[1]) return msg.reply(`**Ummm .. Write your report**`)

  if (msg.guild.channels.find('name', '📝-report')) { //channel name

    msg.guild.channels.find('name', '📝-report').send(`
  **:warning: Report** : ${msg.mentions.members.first()}
  ***Reported by***:  : ${msg.member}
  **Room** : ${msg.channel.name}
  ***:red_circle: Reason*** : :arrow_right: **${args.join(" ").split(msg.mentions.members.first()).slice(' ')}**
  `)
  }
}
});
//sug
client.on('message', msg => { 
    if (msg.content.startsWith(`+sug`)) {
       let args = msg.content.split(" ").slice(1);
      if (!args[1]) return msg.reply('Write your suggestion ```Example: +sug adding new commands```')
      if (msg.guild.channels.find('name', '📋-suggestions')) {
        msg.guild.channels.find('name', '📋-suggestions').send(`
      :pushpin: **Done by: ${msg.member}**
      **:sparkle: Suggestion:** :arrow_right: **${args.join(" ").split(msg.mentions.members.first()).slice(' ')}**
      `)
      }
    }
    });
//your bot has been added to new server
client.on('guildCreate', guild => {
    client.channels.get("467682139975057408").send(`**Nameless Bot joined a new server ✅
  Server name: __${guild.name}__
  Server owner: __${guild.owner}__
  Servers Counter : __${client.guilds.size}__**`)
  });
//your bot has been removed form thhe server
client.on('guildDelete', guild => {
    client.channels.get("472166946981281792").send(`**Nameless Bot left a server ❎
  Server name: __${guild.name}__
  Server owner: __${guild.owner}__
  Servers Counter : __${client.guilds.size}__**`)
  });

 client.on('message' , message => {
   var prefix ="+"
     if (message.content === prefix + "botservers?") {

if(!message.channel.guild) return;
  if(message.content < 1023) return
  const Embed11 = new Discord.RichEmbed()
.setAuthor(client.user.username,client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setDescription(`***Total servers ${client.guilds.size} \n \n${client.guilds.map(guilds => `- ${guilds.name}`).join('\n')}***`)
         message.channel.sendEmbed(Embed11)
    }
});
//bot owners
client.on('message', message => {
  var prefix = "+"
  if (!message.content.startsWith(prefix)) return;
  const verifed = ["236192758765715456","315848387947790336"]; 
if (message.content.startsWith(prefix + 'owner')) {
if( verifed.some(word => message.author.id.includes(word)) ) {    return message.channel.sendMessage(`**   The owner of the bot is here**` + `✅`)
} else {
   message.reply('**You are not the owner of the bot**' + '❌');   
}
}
});

//Welcome
client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', '👋-welcome');
    let memberavatar = member.user.avatarURL
      if (!channel) return;
    let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('**:hugging:  | name :  **',`**${member}**`)
        .addField('**:loudspeaker: | Hello there 👋 **' , `**Welcome to the server, ${member} :wave: **`)
        .addField(':id: | user :', "**[" + `${member.id}` + "]**" )
                .addField('**➡| You are the member number**',`**${member.guild.memberCount}**`)
               
                  .addField("**Name:**",`<@` + `${member.id}` + `>`, true)
                     
                                     .addField(' **Server**', `${member.guild.name}`,true)
                                       
     .setFooter(`${member.guild.name}`)
        .setTimestamp()
   
      channel.sendEmbed(embed);
    });
//GoodBye
    client.on('guildMemberRemove', member => {
        var embed = new Discord.RichEmbed()
        .setAuthor(member.user.username, member.user.avatarURL)
        .setThumbnail(member.user.avatarURL)
        .setTitle(`**Good Bye! :raised_hand::skin-tone-1: :pensive:**`)
        .setDescription(`**Good bye Nice to meet you** :raised_hand::skin-tone-1: :pensive:`)
        .addField('**:bust_in_silhouette:   remain**',`**[ ${member.guild.memberCount} ]**`,true)
        .setColor('RED')
        .setFooter(`==== We wish you the best ====`, 'https://cdn.discordapp.com/attachments/397818254439219217/399292026782351381/shy.png')
    
    var channel =member.guild.channels.find('name', '😢-good-bye')
    if (!channel) return;
    channel.send({embed : embed});
    });


//help
client.on('message', message => {
    if (message.content === "+help") {
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════ {✯Choose✯} ══════─ :sparkle:**')
.addField('     **❧ +help-1 ➺ Setup the bot :wrench: ** ','**════════════**') 
.addField('     **❧ +help-2 ➺ General Commands :fire:**','**════════════**') 
.addField('     **❧ +help-3 ➺ Music Commands __(Coming Soon)__ :musical_note: **' ,'**════════════**') 
.addField('     **❧ +help-4 ➺ Tickets Commands :notepad_spiral:**' ,'**════════════**') 
.addField('     **❧ +help-5 ➺ Management orders__(Staff Commands)__ :no_entry:**' ,'**════════════**') 
.addField('     **❧ +help-6 ➺ Game Commands :video_game:**' ,'**════════════**') 
.addField('     **❧ :pushpin: Important ➺ give the bot needed __permissions__ So it can work without any problems :no_entry:**' ,'**════════════**') 
.addField("**:red_circle:  Nameless Support Discord :tools:   **","**-https://discord.gg/atk3A2C**") 
.addField("**:pushpin:  Don't forget to vote for Nameless Bot :heartbeat:**","**-https://discordbots.org/bot/465993722342014986/vote**")
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});

//help-1
client.on('message', message => {
if (message.content === "+help-1") { 
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("**This is for management only (Who have __ADMINISTRATOR__ ON can setup the bot)**");
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════ {✯Choose✯} ══════─ :sparkle:**')
.addField('     **❧ +help-setup-warn ➺ Setup warn :warning: ** ','**════════════**')  //Done
.addField('     **❧ +help-setup-report ➺ Setup report 📝** ','**════════════**')  //Done
.addField('     **❧ +help-setup-sug  ➺ Setup suggestions 📋** ','**════════════**')  //Done
.addField('     **❧ +help-setup-welcome ➺ Setup welcome message 👋** ','**════════════**') //Done
.addField('     **❧ +help-setup-goodbye ➺ Setup goodbye message  😢** ','**════════════**') //Done
.addField('     **❧ +help-setup-AutoRole ➺ Setup Auto Role  :asterisk:** ','**════════════**') //Done
.addField('     **❧ +help-setup-tickets ➺ Setup tickets :notepad_spiral:** ','**════════════**') //Done
.addField('     **❧ +help-setup-verify ➺ Setup Verify :bust_in_silhouette: ** ','**════════════**') //Done
.addField('     **❧ +help-setup-logs ➺ Setup bot logs ::newspaper: ** ','**════════════**') //Done
.addField("**:red_circle:  Nameless Support Discord :tools:   **","**-https://discord.gg/atk3A2C**") 
.addField("**:pushpin:  Don't forget to vote for Nameless Bot :heartbeat:**","**-https://discordbots.org/bot/465993722342014986/vote**")
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});

//help warn
client.on('message', message => {
if (message.content === "+help-setup-warn") { 
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════  {✯Setup warn :warning:✯} ══════─ :sparkle: **')
.addField('** How to setup warn?  **',"**Just Make new channel and name it ```⚠-warns```**") 
.addField('** :pushpin: Important:  **',"**After you make `⚠-warns` go to this channel __perms__ then got to `@everyone` __disable send messages__**") 
.addField('** :ok_hand: The warn is going to be like this in `⚠-warns` channel  **',"**https://imgur.com/XZd9yR3**") 
.addField("**:red_circle:  Nameless Support Discord :tools:   **","**-https://discord.gg/atk3A2C**") 
.addField("**:pushpin:  Don't forget to vote for Nameless Bot :heartbeat:**","**-https://discordbots.org/bot/465993722342014986/vote**")
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});
//help report
client.on('message', message => {
if (message.content === "+help-setup-report") { 
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════  {✯Setup report 📝✯} ══════─ :sparkle: **')
.addField('** How to setup warn?  **',"**Just Make new channel and name it ```📝-report```**") 
.addField('** :pushpin: Important:  **',"**After you make `📝-report` go to this channel __perms__ then got to `@everyone` and __disable send messages__**")
.addField('** :ok_hand: The report is going to be like this in `📝-report` channel  **',"**https://imgur.com/vNQALax**") 
.addField("**:red_circle:  Nameless Support Discord :tools:   **","**-https://discord.gg/atk3A2C**") 
.addField("**:pushpin:  Don't forget to vote for Nameless Bot :heartbeat:**","**-https://discordbots.org/bot/465993722342014986/vote**")
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});
//help suggestions
client.on('message', message => {
if (message.content === "+help-setup-sug") { 
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════  {✯Setup suggestions 📋✯} ══════─ :sparkle: **')
.addField('** How to setup warn?  **',"**Just Make new channel and name it ```📋-suggestions```**") 
.addField('** :pushpin: Important:  **',"**After you make `📋-suggestions` go to this channel __perms__ then got to `@everyone` __disable send messages__**") 
.addField('** :ok_hand: The suggestions is going to be like this in `📋-suggestions` channel  **',"**https://imgur.com/PVrgyn8**") 
.addField("**:red_circle:  Nameless Support Discord :tools:   **","**-https://discord.gg/atk3A2C**") 
.addField("**:pushpin:  Don't forget to vote for Nameless Bot :heartbeat:**","**-https://discordbots.org/bot/465993722342014986/vote**")
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});
//help welcome
client.on('message', message => {
if (message.content === "+help-setup-welcome") { 
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════  {✯Setup welcome message 👋✯} ══════─ :sparkle: **')
.addField('** How to setup warn?  **',"**Just Make new channel and name it ```👋-welcome```**") 
.addField('** :pushpin: Important:  **',"**After you make `👋-welcome` go to this channel __perms__ then got to `@everyone` __disable send messages__**") 
.addField('** :ok_hand: The welcome message is going to be like this in `👋-welcome` channel  **',"**https://imgur.com/kFf9Mar**")
.addField("**:red_circle:  Nameless Support Discord :tools:   **","**-https://discord.gg/atk3A2C**")
.addField("**:pushpin:  Don't forget to vote for Nameless Bot :heartbeat:**","**-https://discordbots.org/bot/465993722342014986/vote**")
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});
//help goodbye
client.on('message', message => {
if (message.content === "+help-setup-goodbye") { 
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════  {✯Setup goodbye message  👋✯} ══════─ :sparkle: **')
.addField('** How to setup warn?  **',"**Just Make new channel and name it ```😢-good-bye```**")
.addField('** :pushpin: Important:  **',"**After you make `😢-good-bye` go to this channel __perms__ then got to `@everyone` __disable send messages__**") 
.addField('** :ok_hand: The goodbye message is going to be like this in `😢-good-bye` channel  **',"**https://imgur.com/OA6EJGW**")
.addField("**:red_circle:  Nameless Support Discord :tools:   **","**-https://discord.gg/atk3A2C**") 
.addField("**:pushpin:  Don't forget to vote for Nameless Bot :heartbeat:**","**-https://discordbots.org/bot/465993722342014986/vote**")
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});
//help Auto Role
client.on('message', message => {
if (message.content === "+help-setup-AutoRole") { 
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════  {✯Setup Auto Role :asterisk: ✯} ══════─ :sparkle: **')
.addField('** How to setup Auto Role?  **',"**Just Make new Role and name it ```Member```**") 
.addField('** :pushpin: Important:  **',"**We can only Auto Role `Member` role for now**") 
.addField("**:red_circle:  Nameless Support Discord :tools:   **","**-https://discord.gg/atk3A2C**") 
.addField("**:pushpin:  Don't forget to vote for Nameless Bot :heartbeat:**","**-https://discordbots.org/bot/465993722342014986/vote**")
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});
//help Tickets
client.on('message', message => {
if (message.content === "+help-setup-tickets") { 
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════  {✯Setup Tickets System :notepad_spiral: ✯} ══════─ :sparkle: **')
.addField('** How to setup Tickets System?  **',"**Just Make new Role and name it ```Support Team```**") 
.addField('** :pushpin: Important:  **',"**you done Now just let your member use this command `+new` to make a ticket**") 
.addField("**:red_circle:  Nameless Support Discord :tools:   **","**-https://discord.gg/atk3A2C**") 
.addField("**:pushpin:  Don't forget to vote for Nameless Bot :heartbeat:**","**-https://discordbots.org/bot/465993722342014986/vote**")
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});
//help logs .witherwas here
client.on('message', message => {
if (message.content === "+help-setup-logs") { 
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════  {✯Setup Logs :notepad_spiral: ✯} ══════─ :sparkle: **')
.addField('** How to setup Tickets System?  **',"**Just make a channel name it  ```log```**") 
.addField('** :pushpin: Important:  **',"**you done Now just let your staff or you See server logs**") 
.addField("**:red_circle:  Nameless Support Discord :tools:   **","**-https://discord.gg/atk3A2C**") 
.addField("**:pushpin:  Don't forget to vote for Nameless Bot :heartbeat:**","**-https://discordbots.org/bot/465993722342014986/vote**")
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});
//help Verify
client.on('message', message => {
if (message.content === "+help-setup-verify") { 
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════  {✯Setup Verify :bust_in_silhouette: ✯} ══════─ :sparkle: **')
.addField('** How to setup Setup Verify?  **',"**Make 2 Roles and name the first role ```Verified``` and give it access to read msgs**") 
.addField('** Then make second role and name it ```Not Verified``` **',"**you going to disable read msgs on every channel so they can use this command `+verify` on the channel you want**") 
.addField('** :pushpin: The Bot is going to Auto role `Not Verified` role  **',"**If you get any problem join our Nameless Support Discord**") 
.addField("**:red_circle:  Nameless Support Discord :tools:   **","**-https://discord.gg/atk3A2C**") 
.addField("**:pushpin:  Don't forget to vote for Nameless Bot :heartbeat:**","**-https://discordbots.org/bot/465993722342014986/vote**")
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});
//Staff commands 
client.on("message", message => {
  var prefix ="+"
    if (message.content === (prefix + "help-5")) {
     const embed = new Discord.RichEmbed() 
         .setColor("#580e6b")
         .setThumbnail(message.author.avatarURL)
         .setDescription(`
 **
╔[❖════════════❖]╗
              Nameless Bot
╚[❖════════════❖]╝
╔[❖════════════❖]╗
              Prefix = ' + '
╚[❖════════════❖]╝
╔[❖════════════❖]╗
  :radioactive:Management orders:no_entry:
╚[❖════════════❖]╝
__(Staff Commands)__
❖ +say :robot: ➾ The bot is going to say what you want
❖ +clear :octagonal_sign:➾ Clear Chat
❖ +kick  :outbox_tray: ➾ Kick members
❖ +ban :no_entry: ➾ Ban members
❖ +IDBan :no_entry: ➾ Ban members using there ID
❖ +warn  :warning: ➾ Warn members
❖ +mute  :neutral_face: ➾ Mute members
❖ +unmute  :smiley: ➾ Unmute members
❖ +mutechannel  :notepad_spiral: ➾ Mute channels
❖ +unmutechannel  :pencil: ➾ Unmute channels 
❖ +mutevoice  :no_mouth: ➾ Mute members (Voice)
❖ +unmutevoice  :smile: ➾ Unmute members (Voice)
❖ +voicekick :airplane_small:  ➾ Voice kick members (Voice)
❖ +move  :airplane: ➾ Move members to your Voice channel (Voice)
❖ +inviteblocker  :no_entry:  ➾ Enable/Disable Discord Invite Blocker
════════════
:red_circle: Nameless Support Discord :tools: ➾ https://discord.gg/atk3A2C
:pushpin:  Don't forget to vote for Nameless Bot :heartbeat: ➾ https://discordbots.org/bot/465993722342014986/vote
════════════
**`)
   message.channel.sendEmbed(embed)
   
   }
   }); 
//Music commands 
client.on("message", message => {
  var prefix ="+"
    if (message.content === (prefix + "help-3")) {
     const embed = new Discord.RichEmbed() 
         .setColor("#580e6b")
         .setThumbnail(message.author.avatarURL)
         .setDescription(`
 **
╔[❖════════════❖]╗
              Nameless Bot
╚[❖════════════❖]╝
╔[❖════════════❖]╗
              Prefix = ' + '
╚[❖════════════❖]╝
╔[❖════════════❖]╗
    :musical_note: Music Commands :musical_note:
╚[❖════════════❖]╝
__(Coming Soon)__
❖ +join :musical_score: ➾ Summons the bot to your voice channel
❖ +play :musical_note:➾ Plays stated youtube URL or video name
❖ +stop  :musical_keyboard: ➾ Stops current music
❖ +resume  :recycle: ➾ Resumes current song
❖ +skip  :left_right_arrow: ➾ Skip the song
❖ +vol  :speaker:  ➾ Check or change the current volume
❖ +disconnect  :leftwards_arrow_with_hook:  ➾ Disconnect the bot from the voice channel it is in

════════════
:red_circle: Nameless Support Discord :tools: ➾ https://discord.gg/atk3A2C
:pushpin:  Don't forget to vote for Nameless Bot :heartbeat: ➾ https://discordbots.org/bot/465993722342014986/vote
════════════
**`)
   message.channel.sendEmbed(embed)
   
   }
   }); 
client.on("message", message => {
  var prefix ="+"
    if (message.content === (prefix + "help-6")) {
     const embed = new Discord.RichEmbed() 
         .setColor("#580e6b")
         .setThumbnail(message.author.avatarURL)
         .setDescription(`
 **
╔[❖════════════❖]╗
              Nameless Bot
╚[❖════════════❖]╝
╔[❖════════════❖]╗
              Prefix = ' + '
╚[❖════════════❖]╝
╔[❖════════════❖]╗
     Game Commands :video_game: 
╚[❖════════════❖]╝
❖ +roll :game_die: ➾ Roll over/under 50. Rolls random between 0-100.
❖ +rps :newspaper: ➾ Rock, Paper, Scissors. (temporarily disabled)
❖ +coin :money_with_wings: ➾ Flip a Coin. (Coming soon)
════════════
:red_circle: Nameless Support Discord :tools: ➾ https://discord.gg/atk3A2C
:pushpin:  Don't forget to vote for Nameless Bot :heartbeat: ➾ https://discordbots.org/bot/465993722342014986/vote
════════════
**`)
   message.channel.sendEmbed(embed)
   
   }
   }); 
//achieve
const sql = require("sqlite");
client.on("message", async message => {
  var prefix = "+"
    if (message.content.startsWith(prefix + "achieve")) {
         var ids = [
            "20",
            "1",
            "13",
            "18",
            "17",
            "9",
            "31",
            "22",
            "23",
            "2",
            "11",
            "19",
            "24",
            "25",
            "12",
            "33"
            ]
            const randomizer = Math.floor(Math.random()*ids.length);
            const args = message.content.split(" ").slice(1).join(" ")
    if (!args) return message.channel.send("Put something you want to achieve!");
    const image = new Discord.Attachment(`https://www.minecraftskinstealer.com/achievement/a.php?i=${ids[randomizer]}&h=Achievement Get!&t=${args}`, "achievement.png");
message.channel.send(image)
    }
});
client.on('message', message => {
  var prefix = "+"
    if (message.author.id === client.user.id) return;
            if (message.content.startsWith(prefix + "ping")) {
        message.channel.sendMessage('**:ping_pong: Pong! In **`' + `${client.ping}` + ' ms`');
    }
});
//avatar 
client.on('message', message => {
    if (message.content.startsWith("+avatar")) {
if(!message.channel.guild) return;
        var mentionned = message.mentions.users.first();
    var client;
      if(mentionned){
          var client = mentionned; } else {
          var client = message.author;
      }
        const embed = new Discord.RichEmbed()
                           .addField('Requested by:', "<@" + message.author.id + ">")
        .setColor('RANDOM')
        .setImage(`${client.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});
//server
client.on('message', function(msg) {
         var prefix = "+"
    if(msg.content.startsWith (prefix  + 'server')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Showing Details Of  **${msg.guild.name}*`)
      .addField(':globe_with_meridians:** Server Type**',`[** __${msg.guild.region}__ **]`,true)
      .addField(':medal:** __Roles__**',`[** __${msg.guild.roles.size}__ **]`,true)
      .addField(':red_circle:**__ Number of members__**',`[** __${msg.guild.memberCount}__ **]`,true)
      .addField(':large_blue_circle:**__ Number of members online__**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField(':pencil:**__ Text Channels__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField(':microphone:**__ Voice Channels__**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField(':crown:**__ Owner__**',`**${msg.guild.owner}**`,true)
      .addField(':id:**__ Server Id__**',`**${msg.guild.id}**`,true)
      .addField(':date:**__ The server was done in__**',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed});
    }
  });

//id
client.on('message', message => {
    var prefix = "+"
var args = message.content.split(" ").slice(1);    
if(message.content.startsWith(prefix + 'id')) {
var year = message.author.createdAt.getFullYear()
var month = message.author.createdAt.getMonth()
var day = message.author.createdAt.getDate()
var men = message.mentions.users.first();  
let args = message.content.split(' ').slice(1).join(' ');
if (args == '') {
var z = message.author;
}else {
var z = message.mentions.users.first();
}

let d = z.createdAt;          
let n = d.toLocaleString();   
let x;                       
let y;                        

if (z.presence.game !== null) {
y = `${z.presence.game.name}`;
} else {
y = "No Playing... |💤.";
}
if (z.bot) {
var w = 'Bot';
}else {
var w = 'Member';
}
let embed = new Discord.RichEmbed()
.setColor("#502faf")
.addField('🔱| Your Name:',`**<@` + `${z.id}` + `>**`, true)
.addField('🛡| ID:', "**"+ `${z.id}` +"**",true)
.addField('♨| Playing:','**'+y+'**' , true)
.addField('🤖| Your account type:',"**"+ w + "**",true)    
.addField('📛| The code is right for your account:',"**#" +  `${z.discriminator}**`,true)
.addField('**The date in which your account was created | 📆 **: ' ,year + "-"+ month +"-"+ day)    
.addField("**The date you entered the server| ⌚   :**", message.member.joinedAt.toLocaleString())    

.addField('**⌚ | The date of creating your full account:**', message.author.createdAt.toLocaleString())
.addField("**The last message for you | 💬  :**", message.author.lastMessage)            

.setThumbnail(`${z.avatarURL}`)
.setFooter(message.author.username, message.author.avatarURL)

message.channel.send({embed});
    if (!message) return message.reply('**Mention correctly  ❌ **').catch(console.error);

}

});
//member
client.on('message', message => {
    if(message.content == '+member') {
    const embed = new Discord.RichEmbed()
    .setDescription(`**Members info
:green_heart: online:   ${message.guild.members.filter(m=>m.presence.status == 'online').size}
:heart:dnd:       ${message.guild.members.filter(m=>m.presence.status == 'dnd').size}
:yellow_heart: idle:      ${message.guild.members.filter(m=>m.presence.status == 'idle').size}   
:black_heart: offline:   ${message.guild.members.filter(m=>m.presence.status == 'offline').size} 
:blue_heart:   all:  ${message.guild.memberCount}**`)         
         message.channel.send({embed});

    }
  });
//say
client.on('message', message => {
  var prefix = "+"
    if (message.content.startsWith(prefix + "say")) {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("**This is for management only (Who have __ADMINISTRATOR__ ON can use this command)**");
        let args = message.content.split(" ").slice(1)
        let text = args.join(' ').replace('$userid', message.author.id).replace('server-name', message.guild.name)
        message.channel.send(text)
    }
});
//bot
client.on('message', message => {
  if(message.content === "+bot") {
      const embed = new Discord.RichEmbed()
      .setColor("#00FFFF")
      .setDescription(`**On** **__${client.guilds.size}__ Servers 🌐**
**With** **__${client.users.size}__ Users 👥**
**and** **__${client.channels.size}__ Channels 📚** `)
             message.channel.sendEmbed(embed);
         }
});
//MC skins
client.on("message", message => {
    var prefix = "+"
    if (!message.content.startsWith(prefix)) return;
      let command = message.content.split(" ")[0];
      command = command.slice(prefix.length);
        if(command === "MCskin") {
                const args = message.content.split(" ").slice(1).join(" ")
        if (!args) return message.channel.send("** Type your skin name **");
        const image = new Discord.Attachment(`https://minotar.net/armor/body/${args}`, "skin.png");
    message.channel.send(image)
        }
    });
//Date and time
client.on('message' , async (message) => {
    var prefix = "+"
      if (message.content.startsWith(prefix + 'day')) {
  var today = new Date()
  let Day = today.toString().split(" ")[0].concat("day");
  let Month = today.toString().split(" ")[1]
  let Year = today.toString().split(" ")[3]
  message.channel.send(`\`${Day}\` \`${Month}\` \`${Year}\`\n\`Time of day:\` \`${today.toString().split(" ")[4]}\``)
  }
  }); 
//emoji 
const mapping = {
  ' ': '   ',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '!': ':grey_exclamation:',
  '?': ':grey_question:',
  '#': ':hash:',
  '*': ':asterisk:'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});


client.on('message' , async (message) => {
  var prefix = "+"
       if(message.content.startsWith(prefix + "word")) {
          let args = message.content.split(" ").slice(1);
  if (args.length < 1) {
    message.channel.send('You must provide some text to emojify!');
}

message.channel.send(
    args.join(' ')
        .split('')
        .map(c => mapping[c] || c)
        .join('')
);
};
});
//flip
client.on('message' , async (message) => {
  var prefix = "+"
 if (message.content.startsWith(prefix + 'flip')) {
  let args = message.content.split(" ").slice(1);
if(!args[0]) return message.channel.send('Correct usage: **ks!reverse (text to reverse)**');

  function reverseString(str) {
      return str.split("").reverse().join("");
  }

  let sreverse = reverseString(args.join(' '))
   
  if(args[0] === sreverse) {
  
  sreverse = `${args.join(' ')}..Wait... You broke it!`
  
  }
  const reverseEmbed = new Discord.RichEmbed()
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setColor(0xFFF000)
  .addField('Input: ', '```' + `${args.join(' ')}` + '```')
  .addField('Output: ', '```' + `${sreverse}` + '```')
  message.channel.send({embed: reverseEmbed})
    
}
});
//Link
client.on('message', message => {
    if (message.content.startsWith("+Link")) {

  message.channel.createInvite({
        thing: true,
        maxUses: 100,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
  message.channel.send("**The link was sent with a private message**")

message.author.send(`**Link duration: day
Number of uses of the link : 100**`)


    }
});
//invite my bot to your discord server
             client.on('message', message => {
				    var prefix = "+"
                if(message.content === prefix + "inv") {
                    let embed = new Discord.RichEmbed ()
                    embed.setTitle("** :arrow_right: Invite Nameless Bot to your Discord Server!**")
                    .setURL("https://discordapp.com/api/oauth2/authorize?client_id=465993722342014986&permissions=8&scope=bot");
                   message.channel.sendEmbed(embed);
                  }
});
//uptime 
client.on('message', message => {
    var prefix = "+"
if (message.content.startsWith(prefix + "uptime")) {
   let uptime = client.uptime;

   let days = 0;
   let hours = 0;
   let minutes = 0;
   let seconds = 0;
   let notCompleted = true;

   while (notCompleted) {

       if (uptime >= 8.64e+7) {

           days++;
           uptime -= 8.64e+7;

       } else if (uptime >= 3.6e+6) {

           hours++;
           uptime -= 3.6e+6;

       } else if (uptime >= 60000) {

           minutes++;
           uptime -= 60000;

       } else if (uptime >= 1000) {
           seconds++;
           uptime -= 1000;

       }

       if (uptime < 1000)  notCompleted = false;

   }

   message.channel.send("`" + `${days} days, ${hours} hrs, ${minutes} min , ${seconds} sec` + "`");


}
});

//calculate
const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;

client.on('message', msg => {
	var prefix = "+"
 if (msg.content.startsWith(prefix + 'calculate')) {
    let args = msg.content.split(" ").slice(1);
        const question = args.join(' ');
    if (args.length < 1) {
        msg.reply('Specify a equation, please.');
} else {    let answer;
    try {
        answer = math.eval(question);
    } catch (err) {
        msg.reply(`Error: ${err}`);
    }
    
    const embed = new Discord.RichEmbed()
    .addField("**Input**: ",`**${question}**`, true)
    .addField("**Output**: ",`**${answer}**`, true)
    msg.channel.send(embed)
    }
};
});
//tag
const figlet = require('figlet');
client.on('message', message => {
  var prefix = "+"
if (message.content.startsWith(prefix + 'tag')) {
    let args = message.content.split(" ").slice(1);
if(!args[0]) return message.reply('**Please write the text you want**');  

    figlet(args.join(" "), (err, data) => {
              message.channel.send("```" + data + "```")
           })
}
});
//server avatar
client.on("message", message => {    
          if(!message.channel.guild) return;
   if(message.author.bot) return;
      if(message.content === "+ser-av"){ 
          const embed = new Discord.RichEmbed()
  
      .setTitle(`** __${message.guild.name}__ Server Avatar: :arrow_down: **`)
  .setAuthor(message.author.username, message.guild.iconrURL)
    .setColor('RANDOM')
    .setImage(message.guild.iconURL)

   message.channel.send({embed});
      }
  });
//Join Support Server
             client.on('message', message => {
				    var prefix = "+"
                if(message.content === prefix + "support") {
                    let embed = new Discord.RichEmbed ()
                    embed.setTitle("** :arrow_right: Join Nameless Support Discord!**")
                    .setURL("https://discord.gg/YnaS8Up");
                   message.channel.sendEmbed(embed);
                  }
});

//help commands
client.on("message", message => {
  var prefix ="+"
    if (message.content === (prefix + "help-2")) {
     const embed = new Discord.RichEmbed() 
         .setColor("#580e6b")
         .setThumbnail(message.author.avatarURL)
         .setDescription(`
 **
╔[❖════════════❖]╗
              Nameless Bot
╚[❖════════════❖]╝
╔[❖════════════❖]╗
             Prefix = '+'
╚[❖════════════❖]╝
╔[❖════════════❖]╗
         :globe_with_meridians: General commands
╚[❖════════════❖]╝
❖ +ping :stopwatch:➾ Check your connection speed
❖ +meme :joy: ➾ Shows random meme
❖ +avatar  :camping: ➾ Shows your avatar or other players/members avatar
❖ +ser-av  :tent:  ➾ Shows your server avatar
❖ +bot :floppy_disk: ➾ Shows how many server and members there
❖ +info :notebook_with_decorative_cover: ➾ Info about the bot
❖ +server  :recycle: ➾ For server information 
❖ +id  :id: ➾ Shows your ID
❖ +roles  :eight_pointed_black_star:  ➾ Shows your server roles
❖ +member :hearts: ➾ Shows everyone Status
❖ +word  :gem: ➾ Write your word in emoji 
❖ +emojilist :zap:  ➾ Shows your server emojis
❖ +flip  :arrows_clockwise: ➾ Flip your word
❖ +calculate :thinking: ➾ calculate
❖ +invites :sparkles: ➾ Shows how many invites you got
❖ +tag :pen_ballpoint: ➾ put your name or any other name
❖ +uptime  :timer: ➾ Bot uptime
❖ +day :cloud: ➾ Shows the date and the time 
❖ +hack  :satellite:  ➾ Fake hack 
❖ +sh  🔎  ➾ Search for members in your discord server
❖ +Link  :link: ➾ Give you your Discord invite link 
❖ +mcserver-stats  :bookmark_tabs: ➾ Check any Minecraft server stats 
❖ +MCskin :heart_eyes: ➾ Shows your Minecraft skin 
❖ +achieve :clap: ➾ Achieve something in Minecraft
❖ +sug :notepad_spiral: ➾ Your suggestion
❖ +report :pencil: ➾ Report members
❖ +staff 💙  ➾ Shows Nameless Bot Staff Team
❖ +inv :red_circle: ➾ Invite Nameless bot to your discord server 
❖ +support :wrench: ➾ Join Nameless Support Discord
❖ +vote :heartbeat: ➾ Vote for Nameless Bot
❖ +donate :moneybag:  ➾ Nameless Get Premium 
════════════
:red_circle: Nameless Support Discord :tools: ➾ https://discord.gg/atk3A2C
:pushpin:  Don't forget to vote for Nameless Bot :heartbeat: ➾ https://discordbots.org/bot/465993722342014986/vote
════════════
**`)
   message.channel.sendEmbed(embed)
   
   }
   }); 
//fake hack
client.on('message', message => {
  var prefix = "+"
     if(message.content.startsWith(prefix + "hack")) {
 let args = message.content.split(" ").slice(1);

    var user = message.mentions.users.first();
    var reason = args.slice(1).join(' ');
    const embed = new Discord.RichEmbed()
        .setColor(0xFFB200)
        .setTimestamp();

    if (!user) {
        embed.addField("**【✭ Nameless Bot ✭】**", '**Who do you want to hack? ```Example: +hack @unknown#1547 Test```**')
            .setFooter(`Nameless Bot`);
        return message.channel.send({embed});
    } if (!reason) {
        embed.addField("**【✭ Nameless Bot ✭】**", `**Reason for hacking**`)
        return message.channel.send({embed});
    }
    embed.addField("**【✭ Nameless Bot ✭】**", `**Done ${user.tag}! got hacked :arrow_right: Hack type: __${reason}__**`)
        .setFooter(`Nameless`);
    message.channel.send({embed});
    const embed1 = new Discord.RichEmbed()
        .setColor(0xFFB200)
        .setTimestamp()
        .addField("**【✭ Nameless Bot ✭】**", `**You got hacked**`)
        .addField("**Reason for hacking**", `**${reason}**`)
        .setFooter(`**Hack type: is ${reason}**`);
    user.send({embed: embed1});
}
});
//Roles
client.on('message', message => {
    if (message.content === '+roles') {
        var roles = message.guild.roles.map(roles => `${roles.name}, `).join(' ')
        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('**Roles**:',`**[${roles}]**`)
        message.channel.sendEmbed(embed);
    }
});
///search for member
client.on('message', message => {
  var prefix = "+"
   let args = message.content.split(" ").slice(1);
  if (message.content.startsWith(prefix + "sh")) {
let Embed = new Discord.RichEmbed()
        .setColor(0x36393e);
    if (!args[0]) {
        Embed.setFooter(`Example: +sh Name`);
        return message.channel.send(Embed); 
    }

    if (args[0].length <= 1) {
        Embed.setFooter(`Example: +sh Name`);
        return message.channel.send(Embed); 
    }
    let array = []; 
    let number = 0; 
    message.guild.members.map(m => { 
        if (m.user.username.toUpperCase().includes(args[0].toUpperCase())) { 
            number++; 
            array.push(`${number}. ${m.user.username}`); 
        }
    });
    Embed.setTitle(`Results for "${args[0]}"`);
    Embed.setDescription(`\`\`\`${array.slice(0, 30).join(`\n`)}\`\`\``);

    message.channel.send(Embed);
   
   }
}); 
//Staff
client.on("message", message => {
  var prefix ="+"
    if (message.content === (prefix + "staff")) {
     const embed = new Discord.RichEmbed() 
         .setColor("#580e6b")
         .setThumbnail(message.author.avatarURL)
         .setDescription(`
**
⫷༺Nameless Bot Staff༺⫸
Nameless Head Developer(s)👑:
-【✭ @_xShaDowZx#1920 ✭】 
-【✭ @Witherr#1360 ✭】
-【✭ @Zentreax#8277  ✭】
════════════
Nameless Support Manager:
-༺ @_𝕱𝖊𝖆𝖗𝖑𝖊𝖘𝖘#0175 ༻
════════════
Nameless Shop Manager:
-༺ @BarisE#5634 ༻
════════════
Nameless Partnership Manager(s):
-༺ @BuggyPlayz#0931 ༻
-༺ @DuChaonan#5939 ༻
════════════
Nameless Supporter(s):
:one:-@SammyB#0788
:two:-@Zentreax#8277 
════════════
Nameless Discord Moderator(s):
:wrench:-@Ashton#0546 
:wrench:-@XITZJUSTMARWINZX_#5240 
:wrench:-@Chuckles#7837 
:wrench:-@Cukon#1516 
════════════
:red_circle: Nameless Support Discord :tools: ➾ https://discord.gg/atk3A2C
:pushpin:  Don't forget to vote for Nameless Bot :heartbeat: ➾ https://discordbots.org/bot/465993722342014986/vote
════════════
**`)
   message.channel.sendEmbed(embed)
   
   }
   }); 
//MC server Stats 
client.on('message', message => {
  const port = '25565'
  if(message.content.startsWith('+mcserver-stats')) {
 const args = message.content.split(" ").slice(1).join(" ")
    if (!args) return message.channel.send("** Type the server IP ```Example: +mcserver-stats mc.hypixel.net``` **");
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(`https://api.minetools.eu/favicon/${args}/25565`)
        .addField(":scroll: Server Name",`${args}`,true)
        .addField(":globe_with_meridians: Server Port",`${port}`)
        .setImage(`http://status.mclive.eu/${args}/${args}/25565/banner.png`)
        .setFooter(`${client.user.username}`)
                .setTimestamp()
    message.channel.send(embed)      
}});
//verfiy
client.on('guildMemberAdd', (member) => {
    member.addRole(member.guild.roles.find('name', 'Not Verified'));
    });
    client.on('message', message => {   
      var prefix = "+"
        if(!message.channel.guild) return;
           if(message.content.startsWith(prefix + 'verify')) {
            let modlog = client.channels.find('name', 'log');
message.channel.sendMessage(`**Press Check to get verified**`).then(msg => {
            
            
            msg.react('✅')
           .then(() => msg.react('✅'))
         
         
    
           let activeFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
         
           let active = msg.createReactionCollector(activeFilter, { time: 15000 });
         
                                                            
                                  active.on("collect", r => {
                                       message.member.addRole(message.guild.roles.find("name", "Verified"));
                                       message.member.removeRole(message.guild.roles.find("name", "Not Verified"));
                                       msg.delete();
                                       message.channel.send(`**You have been verified.**`).then(m => m.delete(1000));
         
                                       })
                                       })
                                       }
                                       }); 
//Info
client.on('message', message => {
    if (message.content === "+info") {
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('**:sparkle: ─══════ {✯Nameless Bot Info✯} ══════─ :sparkle:**')
.addField('     **❧ Owner of Nameless Bot :crown:: 【✭ @_xShaDowZx#1920 ✭】 ** ','**════════════**') 
.addField('     **❧ Bot Info: `Nameless Bot is a simple to use with a lot of awesome commands and More coming soon!`**','**════════════**') 
.addField('     **❧ Bot Name: `Nameless` **' ,'**════════════**') 
.addField('     **❧ Prefix: `+`**' ,'**════════════**') 
.addField('     **❧ Help Command: `+help`**' ,'**════════════**') 
.addField("     **:robot: Bot Invite Link:**","**https://discordapp.com/api/oauth2/authorize?client_id=465993722342014986&permissions=8&scope=bot**") 
.addField("**:red_circle: Nameless Support Discord:tools::**","**https://discord.gg/GEUt3Ua**")
.addField('     **:pushpin: Vote for Nameless Bot:**' ,'**https://discordbots.org/bot/465993722342014986/vote**') 
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});
//Auto Role
client.on('guildMemberAdd', (member) => {
   member.addRole(member.guild.roles.find('name', 'Member'));
    });

//Invite Blocker
const fs = require("fs");
const ms = require("ms");

let al = JSON.parse(fs.readFileSync(`./inviteblocker.json`, `utf8`));


client.on('message', message => {
    var sender = message.author
    if (!message.channel.guild) return;
    if (message.author.bot) return null;

    if (!al[message.guild.id]) al[message.guild.id] = {
        onoff: 'Off'
    }

    if (message.content === prefix + 'guildinfo') {
        let perms = message.member.hasPermission(`ADMINISTRATOR`)
        if (!perms) return message.reply(`**You don't have permissions __ADMINISTRATOR__**`)
        var embed = new Discord.RichEmbed()
            .setTitle(`${message.guild.name}'s Config`)


            .addField(`:no_entry_sign: inviteblocker : `, `inviteblocker State : ${al[message.guild.id].onoff}`)

            .setColor(`BLUE`)
        message.channel.send({
            embed
        })
    }
    if (message.content === prefix + 'inviteblocker') {
        let perms = message.member.hasPermission(`ADMINISTRATOR`)
        if (!perms) return message.reply(`**You don't have permissions __ADMINISTRATOR__**`)
        let args = message.content.split(" ").slice(1)
        if (!args.join(" ")) {
            if (al[message.guild.id].onoff === 'Off') return [message.channel.send(`**Invite Blocker is now ON! :white_check_mark: **`), al[message.guild.id].onoff = 'On']
            if (al[message.guild.id].onoff === 'On') return [message.channel.send(`**Invite Blocker is now Off! :no_entry_sign: **`), al[message.guild.id].onoff = 'Off'] //:D

        }
    }
    if (message.content.includes('discord.gg','gg')) {
        if (al[message.guild.id].onoff === 'Off') return
        if (message.member.hasPermission('ADMINISTRATOR')) return;
        message.delete()
        return message.reply(`** Discord Invite Links are not allowed here! :anger:  **`)
    }
   
    fs.writeFile("./inviteblocker.json", JSON.stringify(al), (err) => {
        if (err) console.error(err)
    });
});
//Vote for Nameless Bot
             client.on('message', message => {
				    var prefix = "+"
                if(message.content === prefix + "vote") {
                    let embed = new Discord.RichEmbed ()
                    embed.setTitle("** :arrow_right: Vote for Nameless Bot!**")
                    .setURL("https://discordbots.org/bot/465993722342014986/vote");
                   message.channel.sendEmbed(embed);
                  }
});
//Nameless Store
             client.on('message', message => {
				    var prefix = "+"
                if(message.content === prefix + "donate") {
                    let embed = new Discord.RichEmbed ()
                    embed.setTitle("** :arrow_right: Nameless Get Premium!**")
                    .setURL("https://www.patreon.com/NamelessBot");
                   message.channel.sendEmbed(embed);
                  }
});
//emoji list
client.on('message', message => { 
let prefix = '+'
    if (message.content.startsWith(prefix + 'emojilist')) {

        const List = message.guild.emojis.map(e => e.toString()).join(" ");

        const EmojiList = new Discord.RichEmbed()
            .setTitle('➠ Emojis') 
            .setAuthor(message.guild.name, message.guild.iconURL) 
            .setColor('RANDOM') 
            .setDescription(List) 
            .setFooter(message.guild.name) 
        message.channel.send(EmojiList) 
    }
});
//Ticket commands 
client.on("message", message => {
  var prefix ="+"
    if (message.content === (prefix + "help-4")) {
     const embed = new Discord.RichEmbed() 
         .setColor("#580e6b")
         .setThumbnail(message.author.avatarURL)
         .setDescription(`
 **
╔[❖════════════❖]╗
              Nameless Bot
╚[❖════════════❖]╝
╔[❖════════════❖]╗
              Prefix = ' + '
╚[❖════════════❖]╝
╔[❖════════════❖]╗
     Tickets Commands :notepad_spiral: 
╚[❖════════════❖]╝
❖ +new :pencil: ➾ Its going to open a Support Ticket only you and who have Support Team Role can view it.
❖ +close  :wastebasket: ➾ Close the Support Ticket.
════════════
:red_circle: Nameless Support Discord :tools: ➾ https://discord.gg/atk3A2C
:pushpin:  Don't forget to vote for Nameless Bot :heartbeat: ➾ https://discordbots.org/bot/465993722342014986/vote
════════════
**`)
   message.channel.sendEmbed(embed)
   
   }
   }); 
//Tickets
function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

var token = " ";

client.on("ready", () => {
  console.log("Nameless Ticket System is ON");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

if (message.content.toLowerCase().startsWith(prefix + `new`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`**This server doesn't have a __\`Support Team\`__ role made.**`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`** :x: You already have a ticket open.**`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`**:white_check_mark: Your ticket has been created, #${c.name}.**`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Dear @${message.author.username}!`, `**Thank you for reaching out to our Support Team! We will get back to you as soon as possible..**,**【✭ Nameless Bot Ticket ✭】**`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`**You can't use the close command outside of a ticket channel.**`);

    message.channel.send(`**Do you want to close this? 【✭ Nameless Bot Ticket ✭】**, **Type __+confirm__ to close the ticket.**, **__Your request will be voided in 10 seconds.__**`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '+confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('**Ticket close timed out, the ticket was not closed.**').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

});
//bot servers
 client.on('message' , message => {
   var prefix ="+"
     if (message.content === prefix + "botservers") {

if(!message.channel.guild) return;
  if(message.content < 1023) return
  const Embed11 = new Discord.RichEmbed()
.setAuthor(client.user.username,client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setDescription(`***Nameless Bot is ON ${client.guilds.size} Servers \n \n${client.guilds.map(guilds => `- ${guilds.name}`).join('\n')}***`)
         message.channel.sendEmbed(Embed11)
    }
});
//invites
client.on('message', message => {
   if(message.content.startsWith(prefix + "invites")) {
    message.guild.fetchInvites().then(invs => {
      let user = message.mentions.users.first() || message.author
      let personalInvites = invs.filter(i => i.inviter.id === user.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
message.channel.send(`**${user}, You have :arrow_right: __${inviteCount}__ invites!**`);
});
  }
});
 client.on("roleCreate", rc => {
  const channel = rc.guild.channels.find("name", "log") 
  if(channel) {
  var embed = new Discord.RichEmbed()
  .setTitle(rc.guild.name)
  .setDescription(`***Created Role Name : *** **${rc.name}** `)
  .setColor(`RANDOM`)
  .setTimestamp(); 
  channel.sendEmbed(embed)
  }
  });
  //By S Codes
  client.on("roleDelete",  rd => {
  const channel = rd.guild.channels.find("name", "log")
  if(channel) {
  var embed = new Discord.RichEmbed()
  .setTitle(rd.guild.name)
  .setDescription(`***Deleted Role Name : *** **${rd.name}** `)
  .setColor(`RANDOM`)
  .setTimestamp(); 
  channel.sendEmbed(embed)
  }
  });

client.on("channelCreate",  cc => {
  const channel = cc.guild.channels.find("name", "log")
  if(channel) {
  var embed = new Discord.RichEmbed()
  .setTitle(cc.guild.name)
  .setDescription(`***Channel Created Name : *** **${cc.name}** ⬅️`)
  .setColor(`RANDOM`)
  .setTimestamp(); 
  channel.sendEmbed(embed)
  }
  });

   client.on("deleteChannel",  dc => {
  const channel = dc.guild.channels.find("name", "log")
  if(channel) {
  var embed = new Discord.RichEmbed()
  .setTitle(dc.guild.name)
  .setDescription(`***Channel Deleted Name : *** **${dc.name}** ⬅️`)
  .setColor(`RANDOM`)
  .setTimestamp(); 
  channel.sendEmbed(embed)
  }
  });
  
  
  
  client.on('messageUpdate', (message, newMessage) => {
    if (message.content === newMessage.content) return;
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'log');
    if (!channel) return;

    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('SILVER')
       .setDescription(`✏ **Edit message
       Send it <@${message.author.id}>                                                                                                                         Changed in Chat** <#${message.channel.id}>\n\nBefor Editing:\n \`${message.cleanContent}\`\n\nAfter Editing:\n \`${newMessage.cleanContent}\``)
       .setTimestamp();
     channel.send({embed:embed});


});

client.on('messageDelete', message => {
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'log');
    if (!channel) return;
    
    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('BLACK')
       .setDescription(`🗑️ **Delete message**
**Send it <@${message.author.id}>                                                                                                                        Deleted in Chat** <#${message.channel.id}>\n\n \`${message.cleanContent}\``)
       .setTimestamp();
     channel.send({embed:embed});

});
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = "+" ;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("**Can't find user!** ```Example: +kick Player Reason```");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Soory User bot you dont have enghout permision to use this command");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    

    message.guild.member(kUser).kick(kReason);
    message.channel.sendEmbed(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("**Can't find user!** ```Example: +ban Player Reason```");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Soory User bot you dont have enghout permision to use this command");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    message.channel.sendEmbed(banEmbed);


    return;
  }
	});
//memes
const superagent = require('superagent');

client.on('message' , async (message) => {
       if(message.content.startsWith(prefix + "meme")) {

  let{body} = await superagent
  .get(`https://api-to.get-a.life/meme`);

  let me = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("**Random meme:**")
  .setImage(body.url);

  message.channel.send(me);
    }
    });
//voice kick
client.on("message", message => {
    var prefix = "+";
    const command = message.content.split(" ")[0];

    if(command == prefix+"voicekick"){

        if (!message.guild.member(message.author).hasPermission('MOVE_MEMBERS') || !message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
            return message.reply('**you do not have permission**');
        }

        var member = message.guild.members.get(message.mentions.users.array()[0].id);
        if(!message.mentions.users){
            message.reply("**please mention the member ```Example: +kick @unknown#1547```")
            return;
        }

    if(!member.voiceChannel){
    message.reply("**I can't find this player in any Voice Channel**")
    return;
    }
              message.guild.createChannel('voicekick', 'voice').then(c => {
                member.setVoiceChannel(c).then(() => {
                    c.delete(305).catch(console.log)
        


    
      });
     });
    }
});
//New welcome test
//var Canvas = require('canvas');
//var jimp = require('jimp');
      //client.on('guildMemberAdd', member => {
      //const welcomer =  member.guild.channels.find('name', 'welcome'); 

      //var Canvas = require('canvas')
      //var jimp = require('jimp')

      //const w = ['./NamelessWelcomejpg.jpg'];

              ///let Image = Canvas.Image,
                  //canvas = new Canvas(401, 202),
                  //ctx = canvas.getContext('2d');
              //ctx.patternQuality = 'bilinear';
              //ctx.filter = 'bilinear';
              //ctx.antialias = 'subpixel';
              //ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
              //ctx.shadowOffsetY = 2;
              //ctx.shadowBlur = 2;
              //fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
                  //if (err) return console.log(err)
                  //let BG = Canvas.Image;
                  //let ground = new Image;
                  //ground.src = Background;
                  //ctx.drawImage(ground, 0, 0, 401, 202);

      //})

                      //let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".gif" : member.user.displayAvatarURL;
                      //jimp.read(url, (err, ava) => {
                          //if (err) return console.log(err);
                          //ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                              //if (err) return console.log(err);

                              //-AVATAR�
                              //let Avatar = Canvas.Image;
                              //let ava = new Avatar;
                              //ava.src = buf;
                              //ctx.drawImage(ava, 152, 27, 95, 95);

                                                      //wl
                              //ctx.font = '20px Arial Bold';
                              //ctx.fontSize = '15px';
                              //ctx.fillStyle = "#f20000";
                              //ctx.textAlign = "center";
                                                         //ctx.fillText(member.user.username, 200, 154);

                              //-NAME�
                              //ctx.font = '20px Arial';
                              //ctx.fontSize = '28px';
                              //ctx.fillStyle = "#f20000";
                              //ctx.textAlign = "center";
                                    ///ctx.fillText(`You're member number ${member.guild.memberCount} `
                              //, 200, 190);

 //welcomer.sendFile(canvas.toBuffer())



      //})
      //})
      //});

//Server counts 
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.API_KEY, client);

// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

//Music
const db = require('quick.db');
const giphy = require('giphy-api')();    
const googl = require('goo.gl');  
const translate = require('google-translate-api');   
const getYoutubeID = require('get-youtube-id'); 
const moment = require("moment");  
const { Client, Util } = require('discord.js');  
const UserBlocked = new Set(); 

const queue = new Map(); 
const zalgo = require('zalgolize');   
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
 const dateFormat = require('dateformat'); 
 const pretty = require('pretty-ms') 

//Music
/*client.on('message', async msg => { 
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;
	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)
	if (command === `play`) {
    if (!searchString) return msg.channel.send('**Please provide a link/song name.**')
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('**:x: Please connect to a voice channel first.**');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			
			return msg.channel.send('**:x: I don`t have permissions to connect that channel.**');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('**:x: I don`t have permissions to join that channel.**');
		}

		if (!permissions.has('EMBED_LINKS')) {
			return msg.channel.sendMessage("**:x: I must have `EMBED LINKS` permission.**")
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
				await handleVideo(video2, msg, voiceChannel, true);
			}
			return msg.channel.send(` **${playlist.title}** **Has been added to the playlist**`);
		} else {
			try {

				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 5);
					let index = 0;
					const embed1 = new Discord.RichEmbed()
			        .setDescription(`:sparkle: **─══════ {✯Choose✯} ══════─** :sparkle: 
              ${videos.map(video2 => `[**${++index} **] \`${video2.title}\``).join('\n')}`)
              .setColor(0x800080)
              .setFooter("Type the Number of your choice. Times out in 10 seconds.")
					msg.channel.sendEmbed(embed1).then(message =>{message.delete(10000)})
          
					
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 15000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send(':x: **No song selected.**');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send(':X: **No search results available.**');
				}
			}

/			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === `skip`) {
		if (!msg.member.voiceChannel) return msg.channel.send(':x: **Please connect to a voice channel first.**');
		if (!serverQueue) return msg.channel.send(':x:');
		serverQueue.connection.dispatcher.end(':white_check_mark: **Skipped** ');
		return undefined;
	} else if (command === `stop`) {
		if (!msg.member.voiceChannel) return msg.channel.send(':x: **Please connect to a voice channel first.**');
		if (!serverQueue) return msg.channel.send(':x:');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end(':white_check_mark: **Stopped**');
		return undefined;
	} else if (command === `vol`) {
		if (!msg.member.voiceChannel) return msg.channel.send(':x: **Please connect to a voice channel first.**');
		if (!serverQueue) return msg.channel.send(':x:');
		if (!args[1]) return msg.channel.send(`:loud_sound: Volume: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
		return msg.channel.send(`:speaker: Volume changed to **${args[1]}**`);
	} else if (command === `np`) {
		if (!serverQueue) return msg.channel.send(':x: **There is nothing playing on this server.**');
		const embedNP = new Discord.RichEmbed()
	.setDescription(`:notes: Now playing : **${serverQueue.songs[0].title}**`)
		return msg.channel.sendEmbed(embedNP);
	} else if (command === `queue`) {
		
		if (!serverQueue) return msg.channel.send(':x: **There is nothing playing on this server.**');
		let index = 0;
		
		const embedqu = new Discord.RichEmbed()

.setDescription(`:sparkle: ** ─══════ {✯Queue✯} ══════─ ** :sparkle:
${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}**`)
    .setFooter(`**{✯Now playing✯}** ${serverQueue.songs[0].title}`)
    .setColor(0x800080)
		return msg.channel.sendEmbed(embedqu);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send(':pause_button: **Music paused!**');
		}
		return msg.channel.send(':x: **There is nothing playing on this server.**');
	} else if (command === "resume") {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send(':play_pause: **Music resumed!**');
		}
		return msg.channel.send(':x: **There is nothing playing on this server.**');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	
//	console.log('yao: ' + Util.escapeMarkdown(video.thumbnailUrl));
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 3,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`:x:** I could not join the voice channel:** ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`:x: **I don't have permissions to connect that channel** ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(` **${song.title}** **has been added to the Queue!**`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`**Started playing:** **${song.title}**`);
}
*/
 /*
Roll (Minigame)
client.on('message', message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
      
    if (message.content.startsWith(prefix + "roll")) {
        if (!args[0]) {
          let rollerror = new Discord.RichEmbed()
          .setAuthor("Roll")
           .setDescription('**Please enter if you want to roll <over/under> 50. (Rolls between 0 - 100)**')
           .setColor(0xFFA500)
           .setFooter("Nameless Bot")
          return message.channel.send(rollerror);
        }
        var rollx = Math.floor(Math.random() * 101);
    if (args[0] == "over" || args[0] == "o") {
        if (rollx > 50) {
            let rolloverwin = new Discord.RichEmbed()
            //.setTitle('**ROLL**')
            .setAuthor("Roll")
            .setDescription(`**You won, the roll was ${rollx}**`)
            .setFooter("Nameless Bot")
            .setColor(0xFFA500)
            return message.channel.send(rolloverwin);
        } else {
            let rolloverloss = new Discord.RichEmbed()
            //.setTitle('**ROLL**')
            .setAuthor("Roll")
            .setDescription(`**You lost, the roll was ${rollx}**`)
            .setColor(0xFFA500)
            .setFooter("Nameless Bot")
            return message.channel.send(rolloverloss);
        }
    } else if (args[0] == "under" || args[0] == "u") {
        if (rollx < 50) {
            let rollunderwin = new Discord.RichEmbed()
            //.setTitle('**ROLL**')
            .setAuthor("Roll")
            .setDescription(`**You won, the roll was ${rollx}**`)
            .setFooter("Nameless Bot")
            .setColor(0xFFA500)
            return message.channel.send(rollunderwin);
        } else {
            let rollunderloss = new Discord.RichEmbed()
            //.setTitle('**ROLL**')
            .setAuthor("Roll")
            .setDescription(`**You lost, the roll was ${rollx}**`)
            .setColor(0xFFA500)
            .setFooter("Nameless Bot")
            return message.channel.send(rollunderloss);
        }
    } else {
        let rollarg = new Discord.RichEmbed()
        //.setTitle('**ROLL**')
        .setDescription(`**Please use +roll <over/under>**`)
        .setColor(0xFFA500)
        .setFooter("Nameless Bot")
        return message.channel.send(rollarg);
    }
  }
});
*/
/*
//RPS (Minigame)
client.on("message", message => {
  
  let args = message.content.slice(prefix.length).trim().split(' ');
  
  let rock2 = ["Paper! I win!", "Scissors! You win!"]
  let rock1 = Math.floor(Math.random() * rock2.length);
  
  let paper2 = ["Rock! You win!", "Scissors! I win!"]
  let paper1 = Math.floor(Math.random() * paper2.length);
  
  let scissors2 = ["Rock! I win!", "Paper! You win!"]
  let scissors1 = Math.floor(Math.random() * scissors2.length);
  
  let rock = new Discord.RichEmbed()
  .setAuthor("Rock, Paper, Scissors")
  .setColor(0xFFA500)
  .addField("You Chose", `${args[1]}`)
  .addField("I choose", rock2[rock1])
  .setFooter("Nameless Bot")
  
  let paper = new Discord.RichEmbed()
  .setAuthor("Rock, Paper, Scissors")
  .setColor(0xFFA500)
  .addField("You Chose", `${args[1]}`)
  .addField("I choose", paper2[paper1])
  .setFooter("Nameless Bot")
  
  let scissors = new Discord.RichEmbed()
  .setAuthor("Rock, Paper, Scissors")
  .setColor(0xFFA500)
  .addField("You Chose", `${args[1]}`)
  .addField("I choose", scissors2[scissors1])
  .setFooter("Nameless Bot")
  
  
  if (message.content === "+rps rock") message.channel.send(rock)
  if (message.content === "+rps Rock") message.channel.send(rock)
  if (message.content === "+rps r") message.channel.send(rock)
  
  if (message.content === "+rps paper") message.channel.send(paper)
  if (message.content === "+rps Paper") message.channel.send(paper)
  if (message.content === "+rps p") message.channel.send(paper)
  
  if (message.content === "+rps scissors") message.channel.send(scissors)
  if (message.content === "+rps Scissors") message.channel.send(scissors)
  if (message.content === "+rps s") message.channel.send(scissors)
  
  let rpsembed = new Discord.RichEmbed()
  .setAuthor("Rock, Paper, Scissors")
  .setColor(0xFFA500)
  .setDescription("Options: <rock, paper, scissors>")
  .setFooter("Usage: +rps <r, p, s> | by Zentreaxᴰᵉᵛ")
  if (message.content === "+rps") message.channel.send(rpsembed);
}); 
*/

//Voice count
let rebel;
client.on("ready", async  => {
    let guild = client.guilds.get("467441235334791168"); //Server ID
  let users = guild.members.map(member => member.user.id);
  let i;
  rebel=0;
for (i=0 ; i < users.length ; i++) {
 let   check = guild.members.get(users[i]);
if(!check.voiceChannelID){
        continue;
}else{
  rebel++;
}
}
guild.channels.find('id', '473598991737683969').setName(" Voice Online ->「"+rebel+"」"); //Channel ID
  client.setInterval(() =>{
    let d = Date.now()
  }, 5000);
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let guild = client.guilds.get("467441235334791168"); //Server ID
let newUserChannel = newMember.voiceChannel
let oldUserChannel = oldMember.voiceChannel
 if(oldUserChannel === undefined && newUserChannel !== undefined) {
   rebel++;
guild.channels.find('id', '473598991737683969').setName(" Voice Online ->「"+rebel+"」"); //Channel ID
} else if(newUserChannel === undefined){
  rebel--;
guild.channels.find('id', '473598991737683969').setName(" Voice Online ->「"+rebel+"」"); //Channel ID
}
});
client.on('message', Codes => {
  
  if(Codes.content === "+voice") {
      Codes.channel.send(" Voice ->「"+rebel+"」");
}
});
//Count
client.on('guildMemberAdd', member => {
    const botCount = member.guild.members.filter(m=>m.user.bot).size
    const memberCount = [member.guild.memberCount] - [botCount]
    client.channels.get('473608142043873293').setName(`⟫『 Total Users: ${memberCount} 』⟪`);
    client.channels.get('473608120199807006').setName(`⟫『 Total Bots: ${botCount} 』⟪`);
});

client.on('guildMemberRemove', member => {
    const botCount = member.guild.members.filter(m=>m.user.bot).size
    const memberCount = [member.guild.memberCount] - [botCount]
    client.channels.get('473608142043873293').setName(`⟫『 Total Users: ${memberCount} 』⟪`);
    client.channels.get('473608120199807006').setName(`⟫『 Total Bots: ${botCount} 』⟪`);
});




client.login(process.env.BOT_TOKEN);


import {Client , IntentsBitField, MessageActivityType} from 'discord.js';
import 'dotenv/config';

export const client = new Client({intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
],})

client.on('ready',(c) =>{
	console.log(`Ready BOT! ${c.user.displayName}`)
});


client.on('messageCreate',async(m) =>{
	if(m.content.startsWith("hey mentionspy")){
  checkMentions(m);
	}
})

function checkMessage(msg){
	if(msg.content.startsWith("hey")){
	 msg.reply("Ok working!" + "written at time " + new Date());
	};
}


async function checkMentions(msg){
	let count = 0;
	if(msg.mentions.users.size == 2){
		const mentionedUsersArray = Array.from(msg.mentions.users.values());
		const id1 = mentionedUsersArray[0].id;   
		const id2 = mentionedUsersArray[1].id; 
		try{
			msg.channel.messages.fetch({limit : 100,cache : false})
					.then((messages) => {
							messages.forEach((message,key) => {
							if(message.mentions.users.size > 0 && message.author.id == id1){
								message.mentions.users.forEach((user) =>{
									if(user.id == id2){
									count = count +1;
								}
								
							});
						}
						});
					msg.reply(mentionedUsersArray[0].username + " mentioned " + mentionedUsersArray[1].username + " " + count + " times.");
					})
				.catch(console.error);
		}
		catch(err){ console.log(err); }
	}
}

client.login(process.env.TOKEN); 
 
 

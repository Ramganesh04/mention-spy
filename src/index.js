import { Client, IntentsBitField, MessageActivityType } from "discord.js";
import "dotenv/config";
import { checkMentions } from "./mentions.js";

export const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


client.on("ready", (connectClient) => {
  console.log(`The Bot ${connectClient.user.displayName} is ready!`);
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("Hey mentionspy")) {
		const usersArray = Array.from(message.mentions.users.values())
		const user1 = usersArray[0];
		const user2 = usersArray[1];
		const messageLimit = 100;
    let { count } = await checkMentions(message,user1,user2,messageLimit); 
		message.reply(`The user ${user1.username} has mentioned ${user2.username} ${count} times!`);
	}
});


client.login(process.env.TOKEN);

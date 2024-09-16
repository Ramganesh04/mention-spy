import { Client, IntentsBitField, MessageActivityType } from "discord.js";
import "dotenv/config";
import { checkMentions } from "./mentions";

export const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


client.on("ready", (c) => {
  console.log(`The Bot ${c.user.displayName} is ready!`);
});

client.on("messageCreate", async (message) => {
  if (m.content.startsWith("hey mentionspy")) {
    let { usersArray, count } = await checkMentions(message); 
		message.reply(`The user ${usersArray[0].username} has mentioned ${usersArray[1].username} ${count} times!`)
  }
});

client.login(process.env.TOKEN);

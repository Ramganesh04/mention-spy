export async function checkMentions(msg) {
  let count = 0;
  if (msg.mentions.users.size >= 2) {
    const mentionedUsersArray = Array.from(msg.mentions.users.values());
    const user1 = mentionedUsersArray[0];
    const user2 = mentionedUsersArray[1];
    let messages = await msg.channel.messages.fetch({
      limit: 100,
      cache: false,
    });
    try {
      messages
        .forEach((message) => {
          if (
            message.mentions.users.size > 0 &&
            message.author.id == user1.id
          ) {
            message.mentions.users.forEach((user) => {
              if (user.id == user2.id) {
                count = count + 1;
              }
            });
          }
        })
    } catch (err) {
      console.log(err);
    }
    return { mentionedUsersArray, count };
  }
}

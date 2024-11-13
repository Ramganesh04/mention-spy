export async function checkMentions(msg, user1, user2, messageLimit) {
	let count = 0;
	if (msg.mentions.users.size >= 2) {
		let last_message = msg;
		while (true) {
			let t0 = performance.now();
			const messages = await msg.channel.messages.fetch({
				before: last_message.id,
				limit: messageLimit,
				cache: false,
			});
			let t1 = performance.now();
			console.log(t1 - t0);
			let r_count = 0;
			try {
				messages.forEach((message) => {
					r_count++;
					last_message = message;
					if (
						message.mentions.users.size > 0 &&
						message.author.id == user1.id
					) {
						message.mentions.users.forEach((user) => {
							if (user.id == user2.id) {
								count++;
							}
						});
					}
				});
			} catch (err) {
				console.log(err);
			}
			if (r_count < messageLimit) break;
		}
	}
	return { count };
}

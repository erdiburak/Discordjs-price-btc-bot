require("dotenv").config();
const bitcoin = require('bitcoinjs-lib');
const coingeckoApi = require("coingecko-api");
const { Client, Intents } = require("discord.js");
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	]
});

client.once("ready", () => {
	console.log("Avadako is online.");
});

client.on("messageCreate", message => {
	if (message.content.startsWith(">")) {
		if (message.content.substring(1) === "ping") {
			message.reply("Pong!!!!");
		}
	}
});


// btc alert post to discord
const postToDiscord = (btcPrice) => {
	const discordWebhook = process.env.DISCORD_WEBHOOK;
	const discordChannel = process.env.DISCORD_CHANNEL;
	const discordMessage = `${btcPrice} BTC`;
	const discordEmbed = {
		title: "Bitcoin Price Alert",
		description: discordMessage,
		color: 0x00ff00,
		timestamp: new Date(),
		footer: {
			text: "Avadako"
		}
	};
	const discordOptions = {
		method: "POST",
		uri: discordWebhook,
		body: {
			content: discordMessage,
			embeds: [discordEmbed]
		},
		json: true
	};
	return rp(discordOptions)

		.then(() => {
			console.log(`Posted to Discord: ${discordMessage}`);
		})
		.catch(err => {	
			console.log(err);
		});
};







client.on("messageCreate", message => {
	if (message.content.startsWith(">")) {
		if (message.content.substring(1) === "price") {
			const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
			const request = require("request");
			request(url, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					const data = JSON.parse(body);
					message.reply(data.bpi.USD.rate);
				}
			});
		}
	}
});











client.login(process.env.TOKEN);

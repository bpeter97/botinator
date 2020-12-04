require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const { token, prefix } = require("./config.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Login to the discord server.
client.login(token);

// Get all of the commands in the command folder.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Set list of commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Status messages
client.once('ready', () => {
    console.log("Connected!");
});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

// Command handler
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  // If the command exists in the collection of commands, 
  // execute the command execute function using the message 
  // and args.
  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
      command.execute(message, args);
  } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
  }
});

// @flow
const Discord = require('discord.js');
const logger = require('winston');
const token = require('../token.js');

const prefix = 'tb!';

// Create the bot as a new Discord Client
const bot = new Discord.Client();

// Configure Logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true,
});
logger.level = 'debug';

// Initialize the Bot
bot.on('ready', () => {
  logger.info('Ready!');
  bot.user.setActivity('Playing with JavaScript', 'twitch.tv/kjs0');
});

bot.on('message', (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content.startsWith(`${prefix}hello`)) {
    message.reply('Hi!');
  }
});

// Log the bot into Discord (this always should be the final command)
bot.login(token.DISCORD_BOT_TOKEN);

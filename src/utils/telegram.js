const TelegramBot = require('node-telegram-bot-api');

/**
 * Sends Telegram notification.
 * @function
 * @param {String} token - telegram bot token
 * @param {String} chat_id - Telegram chat id
 * @param {String} msg - Message to send
 */
export function sendTelegram (token, chat_id, msg){
  const bot = new TelegramBot(token, {polling: true});

  try {
    bot.sendMessage(chat_id, msg);
  } catch(e) {
    console.log(e);
  }
}

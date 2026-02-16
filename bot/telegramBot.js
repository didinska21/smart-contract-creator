require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { exec } = require("child_process");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const adminId = parseInt(process.env.TELEGRAM_ADMIN_ID);

const keyboard = {
  reply_markup: {
    keyboard: [
      ["ethereum", "bnb"],
      ["arbitrum", "optimism"],
      ["base", "linea"],
      ["polygon", "avalanche"],
      ["scroll", "blast"],
      ["mantle"]
    ],
    resize_keyboard: true
  }
};

bot.onText(/\/start/, (msg) => {
  if (msg.from.id !== adminId) {
    bot.sendMessage(msg.chat.id, "⛔ Unauthorized");
    return;
  }
  bot.sendMessage(msg.chat.id, "🚀 Select chain to deploy:", keyboard);
});

bot.on("message", (msg) => {
  if (msg.from.id !== adminId) return;

  const network = msg.text.toLowerCase();

  bot.sendMessage(msg.chat.id, `🚀 Deploying to ${network}...`);

  exec(`npx hardhat run scripts/deploy.js --network ${network}`, 
  (error, stdout, stderr) => {
    if (error) {
      bot.sendMessage(msg.chat.id, `❌ Error:\n${stderr}`);
      return;
    }
    bot.sendMessage(msg.chat.id, `✅ Result:\n${stdout}`);
  });
});

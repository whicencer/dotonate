class TelegramService {
  private readonly botToken: string | undefined;
  private readonly apiUrl: string;
  constructor() {
    this.botToken = process.env.MODE === "development" ? process.env.DEV_BOT_TOKEN : process.env.BOT_TOKEN;
    this.apiUrl = `https://api.telegram.org/bot${this.botToken}`;
  }

  async sendMessage(chatId: number, message: string){
    await fetch(this.apiUrl + "/sendMessage", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "chat_id": chatId,
        "parse_mode": "HTML",
        "text": message
      })
    });
  }

  chequeMessage(recipientUsername: string, tonTip: number, fiatTip: number, donationMessage: string) {
    return `✅ Your donation has been sent, thank you for support!

<b>Recipient</b>: ${recipientUsername}
<b>Sum</b>: ${tonTip} TON (≈ $${fiatTip})
<b>Your Message</b>: ${donationMessage}
    `
  }
}

export default TelegramService;
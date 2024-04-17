import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fetch from 'node-fetch'

@Injectable()
export class NotificationsService implements OnModuleInit {
  private telegramToken = ''
  private telegramChatId = ''

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.telegramToken = this.configService.get('TELEGRAM_TOKEN')
    this.telegramChatId = this.configService.get('TELEGRAM_CHATID')
  }

  private async sendTelegramMessage(msg: string, groupType = 'NOTIFICATION') {
    if (groupType == 'NOTIFICATION') {
      const url = `https://api.telegram.org/bot${this.telegramToken}/sendMessage?chat_id=${this.telegramChatId}&parse_mode=HTML&text=${msg}`
      fetch(url)
    }
  }
}

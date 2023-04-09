import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  private readonly key: string = '00je070cuyxo6nvj';
  private readonly url: string = 'https://api.ultramsg.com/instance41368/';
  private readonly instanceId = 'instance41368';

  constructor(private configService: ConfigService) {
    //this.key = this.configService.get<string>('WHATSAPP_API_KEY');
    //this.url = 'https://app-server.wati.io';
  }

  async sendWhatsappMessage({
    message,
    phone,
  }: {
    message: string;
    phone: string;
  }): Promise<any> {
    const response = await axios.post(
      `${this.url}/messages/chat`,
      {
        token: this.key,
        to: phone,
        body: message,
      },
      {
        headers: {
          Authorization: `Bearer ${this.key}`,
        },
      },
    );
    console.log(phone, message);
    return response.data;
  }
}

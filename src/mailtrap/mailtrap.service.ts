import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MailtrapService {
  private readonly sender = 'harryskotch11@gmail.com';

  constructor(private configService: ConfigService) {}

  async sendEmail(options: { to: string; subject: string; text: string }) {
    console.log(options);
    const data = await axios({
      method: 'post',
      url: 'https://api.sendinblue.com/v3/smtp/email',
      data: {
        sender: {
          name: 'Hari',
          email: this.sender,
        },
        to: [
          {
            email: options.to,
          },
        ],
        subject: options.subject,
        htmlContent: options.text,
      },
      headers: {
        accept: 'application/json',
        'api-key': this.configService.get<string>('SENDINBLUE_API_KEY'),
        'content-type': 'application/json',
      },
    });

    console.log(data);

    return data.data;
  }
}

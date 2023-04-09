import { Injectable } from '@nestjs/common';
import { MailtrapService } from './mailtrap/mailtrap.service';
import { OpenaiService } from './openai/openai.service';
import { WhatsappService } from './whatsapp/whatsapp.service';

@Injectable()
export class AppService {
  constructor(
    private readonly mailtrapService: MailtrapService,
    private readonly openaiService: OpenaiService,
    private readonly whatsappService: WhatsappService,
  ) {}

  async execute(prompt: string, from: string, eventType: string) {
    if (eventType !== 'message_received') {
      return;
    }

    const { front = "Couldn't understand what you said...🤔", back } =
      await this.openaiService.complete(prompt);

    await Promise.all([
      this.orchestrateCommand(back),
      this.whatsappService.sendWhatsappMessage({
        phone: from.split('@')?.[0],
        message: front,
      }),
    ]);
  }

  private async orchestrateCommand(back: {
    command: string;
    params: Record<any, any>;
  }) {
    const { command, params } = back;

    switch (command) {
      case 'send_mail':
        return this.mailtrapService.sendEmail({
          to: params.receiver,
          subject: params.sub,
          text: params.body,
        });

      case 'schedule_event':
        return;

      default:
        return;
    }
  }
}

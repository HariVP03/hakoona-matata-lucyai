import { All, Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailtrapService } from './mailtrap/mailtrap.service';
import { OpenaiService } from './openai/openai.service';
import { extractJson } from './utils/common';
import { WhatsappService } from './whatsapp/whatsapp.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly openaiService: OpenaiService,
    private readonly whatsappService: WhatsappService,
    private readonly mailtrapService: MailtrapService,
  ) {}

  @All()
  async receiveMessage(@Body() body: any) {
    return await this.appService.execute(
      body.data.body,
      body.data.from,
      body['event_type'],
    );
  }

  @Post('email')
  async sendMail(
    @Body()
    body: {
      to: string;
      subject: string;
      text: string;
    },
  ) {
    return await this.mailtrapService.sendEmail(body);
  }

  @Get('history')
  getHistory() {
    return this.openaiService.getHistory();
  }

  @Get('clear')
  clearHistory() {
    this.openaiService.clearHistory();
  }

  @Get('context')
  getContext() {
    return this.openaiService.getContext();
  }

  @Post('prompt')
  async completePrompt(@Body() body: { prompt: string }) {
    return await this.openaiService.complete(body.prompt);
  }
}

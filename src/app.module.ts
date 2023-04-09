import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiService } from './openai/openai.service';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { GapiService } from './gapi/gapi.service';
import { MailtrapService } from './mailtrap/mailtrap.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    OpenaiService,
    WhatsappService,
    GapiService,
    MailtrapService,
  ],
})
export class AppModule {}

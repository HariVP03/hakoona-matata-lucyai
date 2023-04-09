import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { extractJson } from 'src/utils/common';
import { config } from './config';

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAIApi;
  private previousMessage: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content: config.context,
    },
  ];

  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });

    this.openai = new OpenAIApi(configuration);
  }

  async complete(prompt: string): Promise<{
    front: string;
    back: any;
  }> {
    const {
      data: { choices },
    } = await this.openai.createChatCompletion({
      model: config.model,
      messages: [
        ...this.previousMessage,
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    this.previousMessage.push(
      {
        role: 'user',
        content: prompt,
      },

      choices[0].message,
    );

    const y = extractJson(choices[0].message.content);
    return y;
  }

  clearHistory(): void {
    this.previousMessage = [
      {
        role: 'system',
        content: config.context,
      },
    ];
  }

  getHistory(): ChatCompletionRequestMessage[] {
    return this.previousMessage;
  }

  getContext(): string {
    return config.context;
  }
}

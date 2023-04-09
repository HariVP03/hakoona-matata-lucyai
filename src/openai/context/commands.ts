import { Command } from 'src/types';
import { commandsFactory } from './utils';

const commandsInJson: Command[] = [
  {
    description: 'If sending a mail is required',
    command: `{ command: 'send_mail', params: { receiver:<receipient>, sub:<subject>, body:<body> } }`,
  },

  {
    description: 'If scheduling an event is required in the calendar',
    command: `{ command:'schedule_event', params: { event: <name>, from: <time_from_in_ISO_string>, to: <time_till_in_ISO_string> }}`,
  },
];

export const commandsInString = commandsFactory(commandsInJson);

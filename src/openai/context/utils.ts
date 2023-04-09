import { Command } from 'src/types';

export function commandsFactory(command: Command[]): string {
  let result: string = '';

  command.forEach((command, index) => {
    result +=
      `${index + 1}. ` + command.description + ': ' + command.command + '\n';
  });

  return result;
}

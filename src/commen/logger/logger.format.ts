import { Format } from 'logform';
import * as chalk from 'chalk';
import { format } from 'winston';

const nestLikeColorScheme: Record<string, chalk.Chalk> = {
  info: chalk.greenBright,
  error: chalk.red,
  warn: chalk.yellow,
  debug: chalk.magentaBright,
  verbose: chalk.cyanBright,
};
export const loggerFormat = (appName = 'Nest'): Format =>
  format.printf(({ context, level, timestamp, message }) => {
    const color =
      nestLikeColorScheme[level] || ((text: string): string => text);
    return (
      `${chalk.green(`[${appName}]`)} ` +
      `${color(
        `${`[${level.toUpperCase()}]          `}`.substr(0, 8) + '-',
      )} ` +
      `${new Date(timestamp).toLocaleString('zh', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })}   ` +
      ('undefined' !== typeof context
        ? `${chalk.yellow('[' + context + ']')} `
        : '') +
      `${color(message)}`
    );
  });

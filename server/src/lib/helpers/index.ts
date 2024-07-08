import { spawn } from 'child_process';
import package_json from '../../../package.json';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

/* eslint-disable no-console */

// console
export const success = (message: string) => {
  console.log( chalk.greenBright(message) );
}

export const warning = (message: string) => {
  console.log( chalk.yellowBright(message) );
}

export const error = (message: string) => {
  console.log( chalk.redBright(message) );
}

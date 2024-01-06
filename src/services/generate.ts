import chalk from 'chalk';
import logSymbols from 'log-symbols';
import ora from 'ora';

import { generateCases } from './generate-cases.js';
import { generateGroup } from './generate-group.js';
import { generateSuite } from './generate-suite.js';

export class GenerateService {

  private currentDirectory = process.cwd();

  api(): void {
    console.log('api');
  }
  
  async tests(name: string): Promise<void> {
    const spinnerSuite = ora('Gerando Suite').start();
    await this.delayedGenerate(name, generateSuite);
    spinnerSuite.succeed();

    const spinnerGroup = ora('Gerando Grupo').start();
    await this.delayedGenerate(name, generateGroup);
    spinnerGroup.succeed();

    const spinnerCases = ora('Gerando Cases').start();
    await this.delayedGenerate(name, generateCases);
    spinnerCases.succeed();

    this.successFeedback(name);
  }

  private async delayedGenerate(name: string, generate: (c: string, n: string) => Promise<void>): Promise<void> {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise(resolve => setTimeout(resolve, 1000));
    await generate(this.currentDirectory, name);
  }

  private successFeedback(name: string): void {
    console.log(`\n${logSymbols.success} Pastas e arquivos foram criados com sucesso:\n`);
    console.log(`${chalk.green('📁 Testes')} ${chalk.yellowBright('(ADVPR)')}`);
    console.log(`${chalk.green('├── 📁 Suite')}`);
    console.log(`${chalk.green(`│   ├── 📄 ${name}TestSuite.prw`)}`);
    console.log(`${chalk.green('├── 📁 Grupo')}`);
    console.log(`${chalk.green(`│   ├── 📄 ${name}TestGroup.prw`)}`);
    console.log(`${chalk.green('└── 📁 Casos de Teste')}`);
    console.log(`${chalk.green(`    ├── 📄 ${name}TestCases.prw`)}`);
    console.log('\n');
  }
}

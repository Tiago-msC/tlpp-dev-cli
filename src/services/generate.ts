import chalk from "chalk";

import { generateCases } from "./generate-cases.js";
import { generateGroup } from "./generate-group.js";
import { generateSuite } from "./generate-suite.js";

export class GenerateService {

  private currentDirectory = process.cwd();

  api(): void {
    console.log('api');
  }
  
  tests(name: string): void {
    generateSuite(this.currentDirectory, name)
    generateCases(this.currentDirectory, name)
    generateGroup(this.currentDirectory, name)

    this.sucessFeedback(name);
  }

  private sucessFeedback(name: string): void {
    console.log(`\n${chalk.gray('🎉 Foram criados as seguintes pastas e arquivos:')}\n`);
    console.log(`${chalk.green('📁 Testes')} ${chalk.yellowBright('(ADVPR)')}`);
    console.log(chalk.green('├── 📁 Suite'));
    console.log(chalk.green(`│   ├── 📄 ${name}TestSuite.prw`));
    console.log(chalk.green('├── 📁 Group'));
    console.log(chalk.green(`│   ├── 📄 ${name}TestGroup.prw`));
    console.log(chalk.green('└── 📁 Cases'));
    console.log(chalk.green(`    ├── 📄 ${name}TestCases.prw`));
    console.log('\n');
  }

}
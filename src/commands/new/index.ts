import { Args, Command } from '@oclif/core';

import { handlePrompt } from '../../prompts/handle-prompt.js';
import { typePrompt } from '../../prompts/type-prompt.js';

export class New extends Command {
  static args = {
    type: Args.string({
      description: 'Tipo de projeto',
      name: 'type',
      options: ['api', 'test'],
      required: false,
    }),
  }

  static description = 'Crie um novo projeto para APIs em TLPP ou arquivos de teste'

  async run(): Promise<void> {
    const result = await this.parse(New)
    const { args } = result

    if (!args.type) {
      args.type = await typePrompt();
    }

    await handlePrompt(args.type);
  }
}

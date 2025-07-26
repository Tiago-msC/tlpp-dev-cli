import inquirer from 'inquirer';


export async function typePrompt(): Promise<string> {
  const { type } = await inquirer.prompt([
    {
      choices: [
        { name: 'API', value: 'api' },
        { name: 'Arquivo de testes', value: 'test' },
      ],
      message: 'Escolha o tipo de projeto:',
      name: 'type',
      type: 'list',
    },
  ]);

  return type;
}
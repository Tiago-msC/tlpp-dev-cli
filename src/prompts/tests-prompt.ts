import inquirer from "inquirer";

import { GenerateService } from "../services/generate.js";

export async function testsPrompt() {
  const {name} = await inquirer.prompt([
    {
      message: 'Qual é o nome da API que você deseja criar os testes?',
      name: 'name',
      type: 'input',
      validate: value => value ? true : 'Digite um nome válido'
    }
  ]);

  new GenerateService().tests(name);
}
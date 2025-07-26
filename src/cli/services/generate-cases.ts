import fs from 'node:fs/promises'
import path from 'node:path'

import {getCasesTemplate} from '../templates/tests/cases.js'

export async function generateCases(currentPath: string, nome: string) {
  const templateSuite = getCasesTemplate(nome)

  try {
    await fs.mkdir(path.join(currentPath, 'Testes', 'Cases'), {recursive: true})
    await fs.writeFile(path.join(currentPath, 'Testes', 'Cases', `${nome}TestCase.prw`), templateSuite)
  } catch (error) {
    console.error(error)
  }
}

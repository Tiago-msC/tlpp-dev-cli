import fs from 'node:fs/promises'
import path from 'node:path'

import {getSuiteTemplate} from '../templates/tests/suite.js'

export async function generateSuite(currentPath: string, nome: string) {
  const templateSuite = getSuiteTemplate(nome)

  try {
    await fs.mkdir(path.join(currentPath, 'Testes', 'Suite'), {recursive: true})
    await fs.writeFile(path.join(currentPath, 'Testes', 'Suite', `${nome}TestSuite.prw`), templateSuite)
  } catch (error) {
    console.error(error)
  }
}

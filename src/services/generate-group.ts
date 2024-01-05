import fs from 'node:fs/promises'
import path from 'node:path'

import {getGroupTemplate} from '../templates/tests/group.js'

export async function generateGroup(currentPath: string, nome: string) {
  const templateSuite = getGroupTemplate(nome)

  try {
    await fs.mkdir(path.join(currentPath, 'Testes', 'Group'), {recursive: true})
    await fs.writeFile(path.join(currentPath, 'Testes', 'Group', `${nome}TestGroup.prw`), templateSuite)
  } catch (error) {
    console.error(error)
  }
}

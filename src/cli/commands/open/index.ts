import {Args, Command} from '@oclif/core'

import {spawn} from 'child_process'
import path from 'path'
import {fileURLToPath} from 'url'

export class Open extends Command {
  static description = 'TESTE'

  async run() {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const electronMain = path.join(__dirname, '../../../../dist/electron/main.js')

    this.log('Abrindo interface gráfica...')
    spawn('npx', ['electron', electronMain], {
      stdio: 'inherit',
      shell: true,
    })
  }
}

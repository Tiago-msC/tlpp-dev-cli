import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

// Compatibilidade com ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
    }
  })

  win.loadFile(path.join(__dirname, 'renderer.html'))
}

app.whenReady()
  .then(createWindow)
  .catch(err => {
    console.error('Erro ao iniciar Electron:', err)
  })

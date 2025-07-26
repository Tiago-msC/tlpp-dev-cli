"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
// Compatibilidade com ESM
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
        }
    });
    win.loadFile(path_1.default.join(__dirname, 'renderer.html'));
}
electron_1.app.whenReady()
    .then(createWindow)
    .catch(err => {
    console.error('Erro ao iniciar Electron:', err);
});

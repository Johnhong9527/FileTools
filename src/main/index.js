import { app, BrowserWindow, ipcMain } from 'electron'; // eslint-disable-line
import constant from '../constant'; // eslint-disable-line
const http = require('http'); // eslint-disable-line
const path = require('path'); // eslint-disable-line
const url = require('url'); // eslint-disable-line
const fs = require('fs'); // eslint-disable-line
const ms = require('mediaserver'); // eslint-disable-line
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  // eslint-disable-next-line no-underscore-dangle
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\'); // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: true,
    width: 900,
  });
  // eslint-disable-next-line no-use-before-define,no-unused-vars
  startMusicServer((port) => {
    ipcMain.on('getFilePath', (event, path) => {
      console.log('event, port' * 10);
      console.log(path);
      // const mp4 = fs.readFileSync(path);
      event.sender.send('getPort', port);
    });
    mainWindow.loadURL(winURL);
  });
  // mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}


// 开启服务
function startMusicServer(callback) {
  // eslint-disable-next-line no-use-before-define
  const server = http.createServer((req, res) => {
    // ms.pipe(req, res, 'music.mp3');
    const musicUrl = decodeURIComponent(req.url);
    ms.pipe(req, res, musicUrl);
  })
    .listen(0, () => {
      // console.log('server.address().port', server.address().port);
      callback(server.address().port);
    });
  return server;
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

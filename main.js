const {app, BrowserWindow, ipcMain} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let win;
let viewWin;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 570,
    height: 590,
    resizable: false,
    transparent: true,
    //backgroundColor: '#fff',
    frame: false,
    toolbar: false
  });

  win.loadURL(`file://${__dirname}/index.html?type=add`);
  //win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

}

function changeWindow (obj,target) {

  if (target == 'add') {
    win.setSize(570,590);
  }

  /*
  if (target == 'view') {
    win.hide();
    viewWin.show();
  }
  else {
    win.show();
    viewWin.hide();
  }
  */
}


function closeApp() {
  app.quit();
}
function onTop() {

  if (win.isAlwaysOnTop()) {
    win.setAlwaysOnTop(false);
  }
  else {
    win.setAlwaysOnTop(true);
  }
}

function resizeWidth(browser, width) {
  win.setSize(width,50);
}

ipcMain.on('changeWindow', changeWindow);
ipcMain.on('closeApp', closeApp);
ipcMain.on('onTop', onTop);
ipcMain.on('resizeWidth', resizeWidth);

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

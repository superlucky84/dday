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
    frame: true,
    toolbar: false
  });

  win.loadURL(`file://${__dirname}/index.html?type=add`);
  //win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });


  viewWin = new BrowserWindow({
    width: 500,
    height: 100,
    resizable: false,
    transparent: true,
    frame: false,
    toolbar: false,
    show: false
  });

  viewWin.loadURL(`file://${__dirname}/index.html?type=view`);
  //viewWin.webContents.openDevTools();

}

function changeWindow (aa,target) {

  if (target == 'view') {
    win.hide();
    viewWin.show();
  }
  else {
    win.show();
    viewWin.hide();
  }
}


function closeApp() {
  //if (process.platform !== 'darwin') {
    app.quit();
  //}
}
function onTop() {

  if (viewWin.isAlwaysOnTop()) {
    viewWin.setAlwaysOnTop(false);
  }
  else {
    viewWin.setAlwaysOnTop(true);
  }
}

ipcMain.on('changeWindow', changeWindow);
ipcMain.on('closeApp', closeApp);
ipcMain.on('onTop', onTop);

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

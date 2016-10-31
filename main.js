const {app, BrowserWindow, ipcMain} = require('electron');

if (require('electron-squirrel-startup')) return;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let win;
let viewWin;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    title: 'JW-DDAY',
    width: 570,
    height: 590,
    resizable: false,
    transparent: true,
    frame: false,
    toolbar: false
  });

  win.setTitle('JW-DDAY');

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




function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }
 
  const ChildProcess = require('child_process');
  const path = require('path');
 
  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);
 
  const spawn = function(command, args) {
    let spawnedProcess, error;
 
    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}
 
    return spawnedProcess;
  };
 
  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };
 
  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as: 
      // - Add your .exe to the PATH 
      // - Write to the registry for things like file associations and 
      //   explorer context menus 
 
      // Install desktop and start menu shortcuts 
      spawnUpdate(['--createShortcut', exeName]);
 
      setTimeout(app.quit, 1000);
      return true;
 
    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and 
      // --squirrel-updated handlers 
 
      // Remove desktop and start menu shortcuts 
      spawnUpdate(['--removeShortcut', exeName]);
 
      setTimeout(app.quit, 1000);
      return true;
 
    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before 
      // we update to the new version - it's the opposite of 
      // --squirrel-updated 
 
      app.quit();
      return true;
  }
};

if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else 
  return;
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

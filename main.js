const {app, BrowserWindow, ipcMain, Menu, Tray} = require('electron');
let AutoLaunch = require('auto-launch');

if (require('electron-squirrel-startup')) return;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let win;
let viewWin;
let tray;
let path;

if (process.platform=='win32') {
  path = process.env['LOCALAPPDATA']+"\\JW\\app-0.0.1\\JW-DDAY.exe";
}
if (process.platform=='darwin') {
  path = '/Applications/JW-DDAY.app';
}
var minecraftAutoLauncher = new AutoLaunch({
    name: 'JW-DDAY',
    path: path
});
minecraftAutoLauncher.isEnabled().then(function(isEnabled){
    if(isEnabled){
        return;
    }
    minecraftAutoLauncher.enable();
})
.catch(function(err){ // handle error 
});


function createWindow () {
  // Create the browser window.
  

  tray = new Tray(`${__dirname}/dday-tray.png`);
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Adder', type: 'radio', checked: true},
    {label: 'Viewer', type: 'radio'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  win = new BrowserWindow({
    title: 'JW-DDAY',
    width: 440,
    height: 550,
    resizable: true,
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
}


function closeApp() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  else {
    app.hide();
  }
}
function onTop(browser, setttingTop) {
  /*
  if (win.isAlwaysOnTop()) {
    win.setAlwaysOnTop(false);
  }
  else {
    win.setAlwaysOnTop(true);
  }
  */
  win.setAlwaysOnTop(setttingTop);
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
  //const exeName = path.basename(process.execPath);
  const exeName = 'JW-DDAY';
 
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

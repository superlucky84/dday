var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './packing/JW-DDAY-win32-x64',
    outputDirectory: './packing/OUT-win32-x64',
    authors: 'JW-DDAY Inc.',
    exe: 'JW-DDAY.exe',
    description: 'DDAYCOUNT'
  });
 
resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));

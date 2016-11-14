var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './packing/JW-DDAY-win32-ia32',
    outputDirectory: './packing/OUT',
    authors: 'JW-DDAY Inc.',
    exe: 'JW-DDAY.exe',
    title: 'JW-DDAY',
    setupIcon: 'dday.ico', 
    iconUrl: 'https://memo.superlucky.co.kr/dist/dday.ico',
    description: 'DDAYCOUNT'
  });
 
resultPromise.then(
  function() {
    console.log("It worked!");
  }, 
  function(e) {
    console.log(e.message);
  }
);

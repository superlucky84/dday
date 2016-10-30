var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './packing/myApp-win32-x64',
    outputDirectory: './packing/installer-win32-x64',
    author: "superlucky84",
    description: "dday count app"
});

resultPromise.then(function () {
    console.log("It worked!");
}, function (e) {
    console.log('No dice: ' + e.message);
});

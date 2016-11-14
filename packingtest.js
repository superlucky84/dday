var packager = require('electron-packager');
var options = {
    'arch': 'x64',
    'platform': 'darwin',
    'dir': './',
    'app-copyright': 'Superlucky',
    'app-version': '1.1.2',
    'asar': true,
    'icon': './dday.icns',
    'name': 'JW-DDAY',
    'ignore': ['./packing', './.git'],
    'out': './packing',
    'overwrite': true,
    'prune': true,
    'osx-sign': true,
    'version-string':{
      'CompanyName': 'JW-DDAY',
      'FileDescription': 'JW-DDAY', /*This is what display windows on task manager, shortcut and process*/
      'OriginalFilename': 'JW-DDAY',
      'ProductName': 'JW-DDAY',
      'InternalName': 'JW-DDAY'
    }
};
packager(options, function done_callback(err, appPaths) {
    console.log(err);
    console.log(appPaths);
});

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var manifest = {
    packageUrl: 'http://localhost/tutorial-hot-update/remote-assets/',
    remoteManifestUrl: 'http://localhost/tutorial-hot-update/remote-assets/project.manifest',
    remoteVersionUrl: 'http://localhost/tutorial-hot-update/remote-assets/version.manifest',
    version: '1.0.0',
    sizes:{},
    files:{},
    assets: {},
    searchPaths: []
};

var dest = './remote-assets/';
var src = './jsb/';
var oldPath = './';         //传入某一个项目的根文件夹路径，类似于 /Users/local/dating 
// (dating目录下为版本号文件夹，版本号文件夹下为对应版本的project.manifest,命名规则为
// 版本号最后一位.manifest, 如1.0.0.100版本，保存为100.manifest）

// Parse arguments
var i = 2;
while ( i < process.argv.length) {
    var arg = process.argv[i];

    switch (arg) {
    case '--url' :
    case '-u' :
        var url = process.argv[i+1];
        manifest.packageUrl = url;
        manifest.remoteManifestUrl = url + 'project.manifest';
        manifest.remoteVersionUrl = url + 'version.manifest';
        i += 2;
        break;
    case '--version' :
    case '-v' :
        manifest.version = process.argv[i+1];
        i += 2;
        break;
    case '--src' :
    case '-s' :
        src = process.argv[i+1];
        i += 2;
        break;
    case '--dest' :
    case '-d' :
        dest = process.argv[i+1];
        i += 2;
        break;
    case '--path':
    case '-p':
        oldPath = process.argv[i+1];
        i += 2;
        break;
    default :
        i++;
        break;
    }
}


function readDir (dir, obj) {
    var stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = fs.readdirSync(dir), subpath, size, md5, compressed, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = path.join(dir, subpaths[i]);
        stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            readDir(subpath, obj);
        }
        else if (stat.isFile()) {
            // Size in Bytes
            size = stat['size'];
            md5 = crypto.createHash('md5').update(fs.readFileSync(subpath, 'binary')).digest('hex');
            compressed = path.extname(subpath).toLowerCase() === '.zip';

            relative = path.relative(src, subpath);
            relative = relative.replace(/\\/g, '/');
            relative = encodeURI(relative);
            obj[relative] = {
                'size' : size,
                'md5' : md5
            };
            if (compressed) {
                obj[relative].compressed = true;
            }
        }
    }
}

function comparedWith(manifestPath, oldVersion) {
    console.log('与' + manifestPath + '比较并计算更新大小差值');
    var stat = fs.statSync(manifestPath);
    if (stat.isFile()) {
        var data = fs.readFileSync(manifestPath, 'utf-8');
        data = JSON.parse(data);
        objA = manifest.assets;
        objB = data.assets;
        size = file = 0;
        //遍历当前版本，判断在服务器版本是否存在
        for (var key in objA) {
            if (key in objB) {
                if (objA[key].md5 !== objB[key].md5) {
                    size += objA[key].size;
                    file++;
                }
            }else {
                size += objA[key].size;
                file++;
            }
        }
        manifest.sizes[oldVersion] = size;
        manifest.files[oldVersion] = file;
    }
}

function traverseDir() {
    var stat = fs.statSync(oldPath);
    if (!stat.isDirectory()) {
        return;
    }
    var subPaths = fs.readdirSync(oldPath), subPath, versionPaths, oldVersion, oldVersionPath;
    var index = manifest.version.lastIndexOf('.');
    var largeVersion = manifest.version.substring(0, index);
    var curVersion = manifest.version.substring(index + 1);
    console.log('前三位版本号：' + largeVersion + ' 当前小版本：' + curVersion);
    for (var i = 0; i < subPaths.length; ++i) {
        if (subPaths[i] == largeVersion) {
            subPath = path.join(oldPath, subPaths[i]);
            stat = fs.statSync(subPath);
            if (stat.isDirectory()) {
                versionPaths = fs.readdirSync(subPath);
                console.log(largeVersion + '文件夹下所有版本：' + versionPaths);
                for(var j = 0; j < versionPaths.length; ++j) {
                    oldVersion = versionPaths[j].substring(0, versionPaths[j].lastIndexOf('.'));
                    if (parseInt(curVersion) > parseInt(oldVersion)) {
                        oldVersionPath = path.join(subPath, versionPaths[j]);
                        comparedWith(oldVersionPath, oldVersion);
                    }
                }
            }
            break;
        }
    }
}

var mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
};

// Iterate res and src folder
readDir(path.join(src, 'src'), manifest.assets);
readDir(path.join(src, 'res'), manifest.assets);
traverseDir();

var destManifest = path.join(dest, 'project.manifest');
var destVersion = path.join(dest, 'version.manifest');

mkdirSync(dest);

fs.writeFile(destManifest, JSON.stringify(manifest), (err) => {
    if (err) throw err;
    console.log('Manifest successfully generated');
});

delete manifest.assets;
delete manifest.searchPaths;
fs.writeFile(destVersion, JSON.stringify(manifest), (err) => {
    if (err) throw err;
    console.log('Version successfully generated');
});

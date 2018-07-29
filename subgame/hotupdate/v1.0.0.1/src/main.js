(function () {
    'use strict';

    if (window.jsb) {
        /// 1.初始化资源Lib路径Root.
        var subgameSearchPath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/')+'ALLGame/subgame/';

        /// 2.subgame资源未映射，则初始化资源映射表，否则略过映射.
        if(!cc.HallAndSubGameGlobal.subgameGlobal){
            cc.HallAndSubGameGlobal.subgameGlobal = {};

            /// 加载settings.js
            require(subgameSearchPath + 'src/settings.js');
            var settings = window._CCSettings;
            window._CCSettings = undefined;

            if ( !settings.debug ) {
                var uuids = settings.uuids;

                var rawAssets = settings.rawAssets;
                var assetTypes = settings.assetTypes;
                var realRawAssets = settings.rawAssets = {};
                for (var mount in rawAssets) {
                    var entries = rawAssets[mount];
                    var realEntries = realRawAssets[mount] = {};
                    for (var id in entries) {
                        var entry = entries[id];
                        var type = entry[1];
                        // retrieve minified raw asset
                        if (typeof type === 'number') {
                            entry[1] = assetTypes[type];
                        }
                        // retrieve uuid
                        realEntries[uuids[id] || id] = entry;
                    }
                }

                var scenes = settings.scenes;
                for (var i = 0; i < scenes.length; ++i) {
                    var scene = scenes[i];

                    if (typeof scene.uuid === 'number') {
                        scene.uuid = uuids[scene.uuid];
                    }
                }

                var packedAssets = settings.packedAssets;
                for (var packId in packedAssets) {
                    var packedIds = packedAssets[packId];
                    for (var j = 0; j < packedIds.length; ++j) {
                        if (typeof packedIds[j] === 'number') {
                            packedIds[j] = uuids[packedIds[j]];
                        }
                    }
                }
            }

            /// 加载project.js
            var projectDir = 'src/project.js';
            if ( settings.debug ) {
                projectDir = 'src/project.dev.js';
            }
            require(subgameSearchPath + projectDir);

            /// 如果当前搜索路径没有subgame，则添加进去搜索路径。
            var currentSearchPaths = jsb.fileUtils.getSearchPaths();
            if(currentSearchPaths && currentSearchPaths.indexOf(subgameSearchPath) === -1){
                jsb.fileUtils.addSearchPath(subgameSearchPath, true);
                console.log('subgame main.js 之前未添加，添加下subgameSearchPath' + currentSearchPaths);
            }

            cc.AssetLibrary.init({
                libraryPath: 'res/import',
                rawAssetsBase: 'res/raw-',
                rawAssets: settings.rawAssets,
                packedAssets: settings.packedAssets,
                md5AssetsMap: settings.md5AssetsMap
            });

            cc.HallAndSubGameGlobal.subgameGlobal.launchScene = settings.launchScene;

            /// 将subgame的场景添加到cc.game中，使得cc.director.loadScene可以从cc.game._sceneInfos查找到相关场景
            for(var i = 0; i < settings.scenes.length; ++i){
                cc.game._sceneInfos.push(settings.scenes[i]);
            }
        }

        /// 3.加载初始场景
        var launchScene = cc.HallAndSubGameGlobal.subgameGlobal.launchScene;
        cc.director.loadScene(launchScene, null,
            function () {
                console.log('subgame main.js 成功加载初始场景' + launchScene);
            }
        );
    }
})();

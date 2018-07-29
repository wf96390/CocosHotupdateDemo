const SubgameManager = require('SubgameManager');

cc.Class({
    extends: cc.Component,

    properties: {
        downloadBtn: {
            default: null,
            type: cc.Node
        },

        downloadLabel: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function () {
        const name = 'subgame';
        if (SubgameManager.isSubgameDownLoad(name)) {
            SubgameManager.needUpdateSubgame(name, (success) => {
                if (success) {
                    this.downloadLabel.string = "子游戏需要更新";
                } else {
                    this.downloadLabel.string = "子游戏不需要更新";
                }
            }, () => {
                cc.log('出错了');
            });
        } else {
            this.downloadLabel.string = "子游戏未下载";
        }

        this.downloadBtn.on('click', () => {
            SubgameManager.downloadSubgame(name, (progress) => {
                if (isNaN(progress)) {
                    progress = 0;
                }
                this.downloadLabel.string = "资源下载中   " + parseInt(progress * 100) + "%";
            }, function(success) {
                if (success) {
                    SubgameManager.enterSubgame('subgame');
                } else {
                    cc.log('下载失败');
                }
            });
        }, this);
    },
});

import {app, BrowserWindow, dialog, ipcMain, Menu, webContents} from "electron";
import path from "path";
const createMainMenu = (window) => {
    const template = [
        { //文件操作
            label: '文件',
            submenu: [
                {
                    label: '保存', click() {
                        window.webContents.send('ctrlS');
                        console.log('关闭程序')
                    }, accelerator: 'ctrl+s'
                },
                {
                    label: '另存为', accelerator: 'ctrl+shift+s', click() {
                        window.webContents.send('ctrlShiftS')
                    }
                },
                {
                    label: '打开', accelerator: 'ctrl+o', click() {
                        window.webContents.send('ctrlO')
                    }
                },
                {
                    label: '新建文件', accelerator: 'ctrl+n', click() {
                        window.webContents.send('ctrlN');
                    }
                },
            ]
        },
        {//文本编辑
            label: '编辑',
            submenu: [
                {label: "回撤", role: 'undo'},
                {label: "逆回撤", role: 'redo'},
                {type: 'separator'},
                {label: "剪切", role: 'cut'},
                {label: "复制", role: 'copy'},
                {label: "粘贴", role: 'paste'},
                {type: 'separator'},
                {label: "删除", role: 'delete', accelerator: 'delete'},
                {label: "全选", role: 'selectAll'},
                {type: 'separator'},
            ]
        },
        {
            label: '其他',
            submenu: [
                {label: '关闭', role: 'close'},
                {label: '开发者工具', role: 'toggleDevTools'},
                {
                    label: '帮助', click() {
                        let helpWin = new BrowserWindow({
                            parent: BrowserWindow.getFocusedWindow(),
                            modal: true,
                            width: 618,
                            height: 314,
                            hasShadow: true,
                            autoHideMenuBar: true,
                        });
                        helpWin.loadURL("https://github.com/mucolee?tab=repositories");
                        helpWin.on('close', () => helpWin = null);
                    }
                },
                {
                    label: '关于', click() {
                        dialog.showMessageBox({
                            //icon:"note-p/public/muke.png",
                            type: 'info',
                            title: '关于note-p',
                            message: '详细说明见:https://github.com/mucolee?tab=repositories' +
                                '\n或点击帮助了解',
                            buttons: ['确定']
                        }).then(result => {
                            console.log(result.response) // 输出用户点击的按钮索引
                        }).catch(err => {
                            console.error(err)
                        });
                    }
                },
                {
                    label: 'note-p vive single', click() {
                        let browserWindow = new BrowserWindow({
                            parent: BrowserWindow.getFocusedWindow(),
                            width: 750,
                            height: 540,
                            hasShadow: true,
                            autoHideMenuBar: true,
                            id:"singleBrowserWindow",
                        });
                        console.log(browserWindow.id)
                        browserWindow.loadURL(path.join(process.cwd(),'resources/app.asar/note-pBrowser.html'));
                        browserWindow.webContents.on('new-window', (event, url) => {
                            event.preventDefault();// 阻止默认行为，即不打开新窗口
                            browserWindow.loadURL(url); // 在当前窗口中加载新的URL
                        });
                        browserWindow.on('close', () => browserWindow = null);
                    }
                },
                {
                    label: 'note-p vive multiple', click() {
                        let browserWindow = new BrowserWindow({
                            parent: BrowserWindow.getFocusedWindow(),
                            width: 750,
                            height: 540,
                            hasShadow: true,
                            autoHideMenuBar:true,
                        });
                        browserWindow.loadURL(path.join(__dirname, '../public/note-pBrowser.html'));
                        browserWindow.on('close', () => {
                            browserWindow = null;
                        });
                    }
                },
                {label: '实验功能',submenu: []}
            ]
        },
    ];
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
export {createMainMenu}
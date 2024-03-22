'use strict'

import {app, BrowserWindow, dialog, ipcMain, protocol} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
//右键菜单模块
import {creatContextMenu} from '@/script/contextMenu';
//主菜单
import {createMainMenu} from "@/script/mainMenu";
import fs from "fs";

const isDevelopment = process.env.NODE_ENV !== 'production'

const path = require('path')


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])
let win;
async function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        hasShadow: true,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, 'preload.js') // 设置预加载脚  //C:\Users\李海铭\Desktop\snoopy\note-p\dist_electron\preload.js
            //后期打包要移到src下
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()  //开发者工具
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
    //右键监听
    win.webContents.on('context-menu', () => {
        creatContextMenu(win);//创建右键菜单
    })
    createMainMenu(win);//创建主菜单
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
});

//ctrl+s 快捷键保存文件
ipcMain.handle('getEditorContent', async (event, editorContent, filePath) => {
    console.log("getEditorContent filePath",filePath)
    const fs = require('fs');
    if (filePath === 'The file is not saved'||filePath==='') {
        const showSaveDialogReturnObj = await dialog.showSaveDialog(win, {
            title: '选择打开文件',
            defaultPath: 'newNote-P.txt', // 默认文件名
            filters: [
                {name: "文本文档", extensions: ['txt']},
                {name: '其他文档', extensions: ['*']}
            ]//文件过滤
        });
        //保存窗口是否关闭或取消
        if (!showSaveDialogReturnObj.canceled) {
            fs.writeFile(showSaveDialogReturnObj.filePath, editorContent, (err) => {
                if (err) {
                    console.error('内容保存失败', err);
                } else {
                    console.log('内容保存成功！');
                }
            });
        } else {
            console.log(showSaveDialogReturnObj);
            console.log('窗口关闭');
            return 'The file is not saved';//第一保存时关闭窗口，把文件为保存信息返回去
        }
        return showSaveDialogReturnObj.filePath;
    } else {
        fs.writeFile(filePath, editorContent, (err) => {
            if (err) {
                console.error('内容保存失败', err);
            } else {
                console.log('内容保存成功！');
            }
        });
        return filePath;//再把文件路径反回去
    }
});
//ctrl+o 快捷键打开文件
ipcMain.handle('openFile', (event, filePath) => {
    const fs = require('fs');
    // 拿窗口给的文件路径
    const openFilePath = dialog.showOpenDialogSync(win, {
        title: '选择打开文件',//对话框标题
        filters: [
            {name: "文本文档", extensions: ['txt']},
            {name: '其他文档', extensions: ['*']}
        ]//文件过滤
    });
    //文件选择窗口关闭或取消
    if (openFilePath === undefined) {
        console.log('0000')
        return {path: '', content: ''};
    }
    console.log(openFilePath)
    let content = "";
    try {
        // 同步读取文件内容
        content = fs.readFileSync(openFilePath[0], 'utf8');
    } catch (err) {
        // 捕获可能的错误
        console.error('读取文件出错:', err);
    }
    //告诉菜单便签添加
    win.webContents.send('ctrlOBack', openFilePath[0], content);
    return {path: openFilePath[0], content: content};
});



ipcMain.on('saveAs', async (event, editorContent) => {
    console.log('main', editorContent)
    await saveFile(editorContent);
});
const saveFile=async (editorContent) => {
    const showSaveDialogReturnObj = await dialog.showSaveDialog(win, {
        title: '选择打开文件',
        defaultPath: 'newNote-P.txt', // 默认文件名
        filters: [
            {name: "文本文档", extensions: ['txt']},
            {name: '其他文档', extensions: ['*']}
        ]//文件过滤
    });
    //保存窗口是否关闭或取消
    if (!showSaveDialogReturnObj.canceled) {
        fs.writeFile(showSaveDialogReturnObj.filePath, editorContent, 'utf-8', (err) => {
            if (err) {
                console.error('内容保存失败', err);
            } else {
                console.log('内容保存成功！');
            }
        });
    }
}
/*
* 中转
* */
ipcMain.on('transferStation', (event, channel, ...args) => {
    console.log(channel, ...args)
    win.webContents.send(channel, ...args);
})
ipcMain.on('toolSendAsk', (event,text) => {
    const isSave=dialog.showMessageBoxSync(win, {
        type: 'question',
        buttons: ['保存', '不保存','Cancel'],
        title: '关闭前是否保存文件',
        message: '是否要保存对文件所做的更改?'
    });
    console.log(isSave)
    if (isSave===0){
        const filePath = dialog.showSaveDialogSync(win, {
            title: 'Save File',
            defaultPath: 'newNote-P.txt', // 设置默认保存路径
            filters: [
                { name: 'Text Files', extensions: ['txt'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        });
        if (filePath){
            fs.writeFile(filePath, text, 'utf-8', (err) => {
                if (err) {
                    console.error('内容保存失败', err);
                } else {
                    console.log('内容保存成功！');
                }
            });
        }
    }

});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

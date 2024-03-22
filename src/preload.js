// preload.js
// const { contextBridge, ipcRenderer } = require('electron');
//
// contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
const {contextBridge, ipcRenderer} = require('electron');


contextBridge.exposeInMainWorld(
    'MukeEditorAPI', {
        saveEditorContentToFile: async (editorContent, filePath) => {
            return await ipcRenderer.invoke('getEditorContent', editorContent, filePath);
        },
        openFile: async (filePath) => {
            return await ipcRenderer.invoke('openFile', filePath)
        },
        saveAs:(editorContent)=>{
            ipcRenderer.send('saveAs',editorContent);
        }
    }
);

/*
* 有条件地暴露ipcRenderer.on
* @channel 事件
* @func 回调函数
* */
const toolListener = (channel, func) => {//有条件地暴露ipcRenderer.on
    console.log("toolListener: "+channel)
    // 只允许监听的通道列表
    let validChannels = [
        "ctrlSBack","ctrlOBack","ctrlS","ctrlShiftS"
        ,"ctrlN","ctrlO","saveData","saveDataBack"
    ];
    if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
}
/*
* 通过伪装暴露ipcRenderer.send
* @channel 事件
* @...arg 数组
* */
const toolSend=(channel,...arg)=>ipcRenderer.send('transferStation', channel,...arg);
/*
* 单向通讯
* */
const toolOneWayRoad=(channel)=>ipcRenderer.send(channel);

/*
* 文件保存询问
* @text 文件内容
* 通过主进程transferStation转发
* */
const toolSendAsk=(text)=>ipcRenderer.send('toolSendAsk',text);
//暴露
contextBridge.exposeInMainWorld('toolAPI', {toolListener,toolSend,toolSendAsk,toolOneWayRoad});
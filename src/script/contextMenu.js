import {Menu, dialog, ipcMain} from "electron";
const creatContextMenu=(args)=>{
    const contextMenu=Menu.buildFromTemplate([
        {role:'editMenu'},
        {label:'撤销',role: 'undo'},
        {label:'回撤',role: 'redo' },
        {type: 'separator' },
        {label:'剪切',role: 'cut' },
        {label:'粘贴',role: 'paste',},
        {label:'删除',role: 'delete',},
        {type: 'separator' },
        {label:'全选',role: 'selectAll',},
        // {label:'保存',click(){
        //         console.log(args)
        //     //获取编辑器的内容
        //     // args.webContents.send('getContent',1);
        //     dialog.showSaveDialog(
        //         {
        //             filters:[{name:"文本文件",extensions:['txt']}]//文件过滤器
        //         }
        //     ).then(result=>{
        //         if(!result.canceled){
        //             const filePath = result.filePath;
        //             console.log('文件保存到:', filePath,args);
        //         }else  {
        //             console.log('保存窗口关闭');
        //         }
        //     }).catch(err => {
        //         console.error('保存失败:', err);
        //     });
        //     }
        // },
    ]);
    return contextMenu.popup();
}

export { creatContextMenu };
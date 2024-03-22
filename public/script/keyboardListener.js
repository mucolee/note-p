let filePath = 'The file is not saved';
/*
* ctrl+s保存文件
* */
const keyboardListenCtrlS = (event) => {
    // 检查是否按下了 ctrl+s
    if (event.ctrlKey && event.key === 's') {
        console.log(" keyboardListenCtrlS = (event)");
        event.preventDefault();
        //去拿导航标签里的内容
        const path = document.querySelector('.myNavbar').getAttribute('data-path');
        const content = document.querySelector('.editor').innerText;
        window.MukeEditorAPI.saveEditorContentToFile(content, path).then(result => {
            window.toolAPI.toolSend('ctrlSBack', result, content);
        });
        // window.toolAPI.toolSend('saveData');
        // window.toolAPI.toolListener('saveDataBack',async (event,path,content)=>{
        //     console.log("aveDataBck");
        //     const q=await path
        //     console.log(q,"11",path,content)
        //     if (content===undefined){
        //         content=''
        //     }
        //     window.MukeEditorAPI.saveEditorContentToFile(content, path).then(result => {
        //         window.toolAPI.toolSend('ctrlSBack',result,content);
        //     });
        // });
        //const editorContent = document.querySelector('.editor').innerText;
    }
}
/*
* ctrl+shift+s，文件另存存为
* */
const keyboardListenCtrlShiftS = (event) => {
    console.log(event.ctrlKey, event.shiftKey, event.key)
    // 检查是否按下了 ctrl+shift+s
    if (event.ctrlKey && event.shiftKey && event.key === 'S') {
        console.log('keyboardListenCtrlShiftS')
        // 阻止默认行为
        event.preventDefault();
        const editorContent = document.querySelector('.editor').innerText;
        window.MukeEditorAPI.saveAs(editorContent);
    }
}

/*
* ctrl+o，打开文件
* */
const keyboardListenCtrlO = (event) => {
    // 检查是否按下了 ctrl+0
    if (event.ctrlKey && event.key === 'o') {
        // 阻止默认行为
        event.preventDefault();
        window.MukeEditorAPI.openFile(filePath).then(result => {
            const {path, content} = result;
            if (path === '') {
                return;
            }
            document.querySelector('.editor').innerText = content;
        });
    }
}
/*
* 新建文件
* */
const keyboardListenCtrlN = (event) => {
    // 检查是否按下了 ctrl+n
    if (event.ctrlKey && event.key === 'n') {
        // 阻止默认行为
        event.preventDefault();
        window.toolAPI.toolSend("ctrlN");
    }
}

/*
*主菜单触发事件
* */
//保存
window.toolAPI.toolListener("ctrlS", () => {
    const path = document.querySelector('.myNavbar').getAttribute('data-path');
    const content = document.querySelector('.editor').innerText;
    window.MukeEditorAPI.saveEditorContentToFile(content, path).then(result => {
        window.toolAPI.toolSend('ctrlSBack', result, content);
    });
});
//另存为
window.toolAPI.toolListener("ctrlShiftS", () => {
    const editorContent = document.querySelector('.editor').innerText;
    window.MukeEditorAPI.saveAs(editorContent);
});
//打开文件
window.toolAPI.toolListener("ctrlO", () => {
    window.MukeEditorAPI.openFile(filePath).then(result => {
        const {path, content} = result;
        if (path === '') {
            return;
        }
        document.querySelector('.editor').innerText = content;
    });
});



//ctrl+s保存文件
// const keyboardListenCtrlS=(event) => {
//     // 检查是否按下了 ctrl+s
//     if (event.ctrlKey && event.key === 's') {
//         // 阻止默认行为（保存网页）electron程序内可以不用
//         event.preventDefault();
//         // 调用自定义事件
//         const editorContent = document.querySelector('.editor').innerText;
//         window.MukeEditorAPI.saveEditorContentToFile(editorContent, filePath).then(result=>{
//             filePath=result;
//         })
//         console.log(document.querySelector('.editor'));
//     }
// }
//监听ctrl+s，保存文件
window.addEventListener('keydown', keyboardListenCtrlS);
//监听ctrl+shift+s，文件另存存为
window.addEventListener('keydown', keyboardListenCtrlShiftS);
//监听ctrl+o，打开文件
window.addEventListener('keydown', keyboardListenCtrlO);
//监听ctrl+n，新建文件
window.addEventListener('keydown', keyboardListenCtrlN);
//监听卸载
window.onbeforeunload=()=>{
    window.removeEventListener('keydown', keyboardListenCtrlS);//卸载
    window.removeEventListener('keydown', keyboardListenCtrlO);
    window.removeEventListener('keydown', keyboardListenCtrlN);
}
window.onload=()=>{
    // console.log("keyboardListenCtrlS({ctrlKey: true, key: 's'})")
    // keyboardListenCtrlS({ctrlKey: true, key: 's'});
}
//编辑区聚焦获取光标
// const MukeEditorGainFocus=()=>{
//     document.querySelector('.editor').focus();
// }
//监听页面是否被点击，点击即编辑区聚焦获取光标
// window.addEventListener('mousedown', events=>{
//     //阻止鼠标的默认行为，避免默认行为干扰
//     events.preventDefault();
//     MukeEditorGainFocus();
// });//还没卸载，存在内存泄露风险  #TODO

import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useFileMenuStore = defineStore('fileMenuStore', () => {
    // const tagObj=ref({path:'',content:''})
    // let filePath=ref(window.FilePathAPI.filePath);
    let tags = reactive([{path: 'The file is not saved', name: '未保存', content: ''}]);
    const dataObj = ref('');
    let currentTagIdRef = ref(0);
    /*
    * preTagIdRef可以为null，即已经销毁
    * */
    let preTagIdRef = ref('0');
    //let currentTagId = currentTagIdRef.value;
    let content = ref('');
    const dataPath = ref(tags[currentTagIdRef.value].path);

    /*
    * 关闭标签，如果是第一个标签就设置下一个当前标签，其他的都是前一个为前一个标签
    * @index 标签的（int）id
    * */
    const close = (index) => {
        console.log(index)
        console.log(currentTagIdRef.value)
        const lenTemp = tags.length
        if (lenTemp === 1) return;
        let temp=document.querySelector('.editor');
        console.log(temp.innerText)
        //未保存要提示保存
        if (tags[index].path==='The file is not saved'){
            //提示保存
            window.toolAPI.toolSendAsk(temp.innerText);
        }
        if (index === lenTemp - 1) {//最后一个
            console.log(index)
            tags.splice(index, 1);
            temp.innerText=tags[lenTemp - 2].content;
            content.value = tags[lenTemp - 2].content;
            currentTagIdRef.value = lenTemp - 2;
            preTagIdRef.value = null;
            return;
        }
        tags.splice(index, 1);
        currentTagIdRef.value = index;
        preTagIdRef.value = null;
    }
    /*
    * 添加标签，并把新标签设置为当前标签，保存前一个活跃标签的数据，编辑器内容设置为当前内容
    * @index 标签的（int）id
    * */
    const add = () => {
        const temp = {path: 'The file is not saved', name: '未保存', content: ''}
        tags.push(temp);
        //保存前一个活跃标签的数据
        let editor=document.querySelector('.editor');
        tags[currentTagIdRef.value].content=editor.innerText;
        //编辑器内容设置为当前内容
        editor.innerText=tags[tags.length-1].content;
        currentTagIdRef.value = tags.length - 1;
    }
    /*
    * 当前的标签，让被点击的标签加载
    * @index 标签的（int）id
    * */
    const currentTag = (index) => {
        console.log(currentTagIdRef.value)
        console.log(index)
        let editor = document.querySelector('.editor');
        console.log('editor.innerText:',editor.innerText)
        console.log(content.value)
        tags[currentTagIdRef.value].content = editor.innerText; //编辑器的内容等于标签的内容
        console.log(content.value)
        editor.innerText = tags[index].content;
        console.log('editorContent:',editor.innerText)
        currentTagIdRef.value = index;
        console.log(...tags)
    }
    const widthListener = (event) => {
        // 重新设置窗口大小
        const width = event.target.innerWidth;
        document.querySelector('.box').style.Width = `${width}px`;
    }

    /*
    * 保存文件的同时给导航栏设置
    * */
    window.toolAPI.toolListener('ctrlSBack', (...args) => {
        const [result, editorContent] = args;
        console.log(result, editorContent)
        const arr = result.split('\\');
        let name;
        if (result==='The file is not saved'){
            name='未保存';
        }else {
            name = arr[arr.length - 1];
        }
        tags[currentTagIdRef.value] = {path: result, name: name, content: editorContent};
    });
    /*
    * 打开文件的同时给导航栏设置
    * */
    window.toolAPI.toolListener('ctrlOBack', (...args) => {
        console.log(...args)
        const [result, editorContent] = args;
        const arr = result.split('\\');
        const name = arr[arr.length - 1];
        const temp = {path: result, name: name, content: editorContent};
        tags.push(temp);
        console.log(tags.length - 1)
        const index = tags.length - 1;
        currentTagIdRef.value = index;
        content.value = tags[index].content; //编辑器的内容等于标签的内容
    });
    /*
    * 快捷键ctrl+o,新建文件
    * */
    window.toolAPI.toolListener('ctrlN',()=>{
        add();
    });

    window.toolAPI.toolListener('saveData',()=>{
        const content=tags[currentTagIdRef.value].content
        const path=tags[currentTagIdRef.value].path
        console.log('saveData收到')
        console.log(content,path)
        window.toolAPI.toolSend('saveDataBack',path,content);
    })

    return {tags, dataPath, content, dataObj, close, add, currentTag, currentTagIdRef, widthListener}
})
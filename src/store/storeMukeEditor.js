import {defineStore} from "pinia";
import {ref} from "vue";

export const useMukeEditorStore
    = defineStore('mukeEditorStore',()=>{
    const screenHeight=ref(document.body.clientHeight);
    const heightListener=(event) => {
        // 重新设置窗口大小
        const height=event.target.innerHeight-30;
        document.querySelector('.editor').style.height = `${height}px`;
    }

    return {screenHeight,heightListener};
})
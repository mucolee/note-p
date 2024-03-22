<script setup>
import {useMukeEditorStore} from "@/store/storeMukeEditor";
import {storeToRefs} from "pinia";
import { onBeforeUnmount, onMounted} from "vue";
import {useFileMenuStore} from "@/store/storeFileMenu";
// import FileMenu from "@/components/FileMenu.vue";


const {heightListener} = useMukeEditorStore();
const {dataPath, content} = storeToRefs(useFileMenuStore());//响应性属性需要用storeToRefs解构

onMounted(() => {
  document.querySelector('.editor').style.height=`${window.innerHeight-30}px`;
  window.addEventListener('resize', heightListener);
});

onBeforeUnmount(() => {
  //销毁window.addEventListener('resize', heightListener);
  window.removeEventListener('resize', heightListener);
});

</script>

<template>
  <div class="box">
    <div id="editor" :data-path="dataPath" class="editor"
         contenteditable="true" v-text="content">
    </div>
  </div>
  <div>
  </div>
</template>

<style lang="css">
.editor {
  padding: 0 5px 0 0;
  flex: 1;
  position: relative;
  outline: none;
  overflow-y: auto;
  text-align: left;
}

.box {
  margin: 0 1px 0 10px;
}

</style>

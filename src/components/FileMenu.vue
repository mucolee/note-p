<template>
  <ul class="myNavbar tag" :data-path="tags[currentTagIdRef].path">
    <!-- 导航标签 -->
    <li v-for="(tag,index) in tags" :id="index" :key="tag.path"
        :data-obj="dataObj"
        class="myNavbarItem"
        @click="currentTag(index)"
        :class="{'active':currentTagIdRef===index||(tags.length===1&&index===0)}">
      <span class="myNavbarItemText">
        <span class="closeBtn" @click.stop="close(index)" >&times;</span>
        {{ tag.name }}
      </span>
    </li>
    <li class="addTabBtn" @click="add">+</li>
  </ul>
</template>
<script setup>
import {useFileMenuStore} from "@/store/storeFileMenu";
import {storeToRefs} from "pinia";
import {onMounted,} from "vue";
const {tags, dataObj, currentTagIdRef} = storeToRefs(useFileMenuStore());
const {add,close, currentTag} = useFileMenuStore();
onMounted(() => {
  console.log(currentTagIdRef.value)
});
</script>
<style>
/* 导航栏样式 */
.myNavbar {
  display: flex;
  align-items: center;
  padding: 0 2px 0 2px;
  border-radius: 5px;
  margin: 0 5px 0 5px;
  list-style-type: none;
  position: relative;
}
/* 导航标签样式 */
.myNavbarItem {
  display: flex;
  align-items: flex-start;
  border-radius: 4px;
  background-color: rgba(183, 255, 0, 0.81);
  cursor: pointer; /* 鼠标悬停时显示手型 */
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏超出容器的文本 */
  text-overflow: ellipsis; /* 在文本溢出时显示省略号 */
  transition: transform 0.4s ease;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.5);
}
.myNavbarItem:hover{
  background: white;
  transform: scale(1.05);
}
/* 导航标签文本样式 */
.myNavbarItemText {
  user-select: none;
  //position: relative;
  //padding-left: 1px; /* 为关闭按钮留出空间 */
  min-width: 50px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.myNavbarItem :hover .closeBtn{
  display: block;
}
/* 关闭按钮样式 */
.closeBtn{
  display: none;
  position: absolute;
  border-radius: 50%;
  padding: 1px 4px;
  top: 50%;
  right: 2px;
  transform: translateY(-50%); /* 垂直居中 */
  font-size: 16px;
  font-weight: bold;
  background: radial-gradient(circle, rgb(234, 185, 185) 40%,transparent 80%);
  cursor: pointer; /* 鼠标悬停时显示手型 */
  box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.5);
}
  /* 添加标签按钮样式 */
.addTabBtn {
  position: absolute;
  user-select: none;
  top: -100%;
  left: 5px;
  padding: 0 4px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: rgba(164, 197, 78, 0.81);
  cursor: pointer; /* 鼠标悬停时显示手型 */
  transition: transform 0.5s ease;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.5);
}
.addTabBtn:hover{
  transform: scale(1.4);
}
.active {
  border-top: 0;
  border-radius: 0 0 4px 4px;
  background-color: white; /* 设置激活时的样式 */
}
</style>


<!--<style lang="css">-->
<!--.box{
  background: #b9a542;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}-->
<!--.tag {-->
<!--  display: inline-block;-->
<!--}-->

<!--.tagText {-->
<!--  overflow: hidden;-->
<!--  text-overflow: ellipsis;-->
<!--  white-space: nowrap;-->
<!--  display: inline-block;-->
<!--}-->

<!--.closeBtn {-->
<!--  display: inline-block;-->
<!--}-->

<!--.add {-->
<!--  display: inline-block;-->
<!--  border: 1px solid pink;-->
<!--}-->
<!--</style>-->
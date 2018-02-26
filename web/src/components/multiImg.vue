<template>
<div class="content">
  <ul>
    <li v-show="imgList.length!==0" v-for="(item,index) in imgList" :key="index">
      <img id="imgContent" :src="item.imgUrl"/>
    </li>
    <li>
      <input type="file" name="file" id="imgFile2" @change="imgShow" accept="image/png,image/gif,image/jpeg" style="display: none">
      <el-button type="primary" plain size="mini" @click="loadImg">添加图片</el-button>
    </li>
  </ul>
</div>
</template>

<script>
  import $ from 'jquery'
    export default {
      name: 'multi-img',
      methods: {
        imgShow () {
          var that = this
          var files = $('input[name="file"]').prop('files')
          console.log(files)
          var reader = new FileReader()
          reader.readAsDataURL(files[0])
          var imgFile
          let obj
          // 为文件读取成功设置事件
          reader.onload = function (e) {
            imgFile = e.target.result
            obj = {
              name: files[0].name,
              imgUrl: imgFile
            }
            console.log(obj)
            that.imgList.push(obj)
            console.log(that.imgList)
          }
        },
        loadImg () {
          $('#imgFile2').click()
        }
      },
      data () {
        return {
          imgList: []
        }
      }
    }
</script>

<style scoped>
.content{
  width: 680px;
  min-height: 350px;
  margin: 20px auto;
  padding: 20px;
  background-color: whitesmoke;
}
.content>ul{
  list-style: none;
  padding: 0 0 0 0;
}
.content>ul>li{
  display: inline-block;
  width: 200px;
  height: 150px;
  padding: 10px 10px 0 10px;
  vertical-align: top;
  /*border: dodgerblue solid 2px;*/
}
  img{
    width: 200px;
    height: 150px;
  }
</style>

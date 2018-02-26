<template>
  <div>
    <div style="text-align: center">
      <!--<el-upload-->
      <!--class="avatar-uploader"-->
      <!--action=""-->
      <!--:show-file-list="false"-->
      <!--:on-success="handleAvatarSuccess"-->
      <!--:before-upload="beforeAvatarUpload">-->
      <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
      <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <!--</el-upload>-->
      <div style="display: inline-block;margin: 0 auto;width: 500px">
        <input type="file" name="file" class="upload_input" id="imgFile" accept="image/png,image/gif,image/jpeg" @change="loadImg">
        <img id="imgContent"/>
        <i :class="{'text':imageShow}" class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </div>

    <div style="margin: 50px auto;width: 310px">
      <i :class="{'text':imageShow}" class="el-icon-plus avatar"></i>
      <img id="imgContent3"/>
      <div style="margin: 10px auto;width: 305px;text-align: center">
        <input type="file" name="file" id="imgFile2" accept="image/png,image/gif,image/jpeg" style="display: none">
        <el-button type="primary" plain size="mini" @click="loadImg2">更换头像</el-button>
      </div>
    </div>

    <div style="margin: 50px auto;width: 152px">
      <img id="imgContent2"/>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
    export default {
      name: 'img-upload',
      data () {
        return {
          imageShow: false
        }
      },
      created () {
        this.$reqs.get('/users/getImg').then(function (res) {
          console.log(res.data)
          let a = res.data
          $('#imgContent2').attr('src', a)
        }).catch(function (res) {
        })
      },
      methods: {
        loadImg2 () {
          var that = this
          $('#imgFile2').click()
          $('#imgFile2').change(function () {
            var file = $('#imgFile2').get(0).files[0]
            console.log(file)
            console.log(file.name)
            if (file.size > 50 * 1024) {
              that.$message({
                showClose: true,
                message: '图片过大',
                type: 'warning'
              })
            } else {
              console.log('123132123')
              // 创建读取文件的对象
              var reader = new FileReader()
              reader.readAsDataURL(file)

              // 创建文件读取相关的变量
              var imgFile

              // 为文件读取成功设置事件
              reader.onload = function (e) {
                // alert('文件读取完成')
                imgFile = e.target.result
                // this.url = imgFile
                console.log('123132123')
                that.$reqs.post('/users/imgUpload', {
                  data: imgFile
                }).then(function (res) {
                }).catch(function (res) {
                  console.log(res.toString())
                })
                $('#imgContent3').attr('src', imgFile)
              }
              that.imageShow = true
              console.log(that.imageShow)
            }
          })
        },
        loadImg () {
          var that = this
          console.log('123132123')
          // 获取文件
          var file = $('#imgFile').get(0).files[0]

          // var files = $('#imgFile').get(0).files

          console.log(file.size)
          console.log(file.name)

          if (file.size > 50 * 1024) {
            this.$message({
              showClose: true,
              message: '图片过大',
              type: 'warning'
            })
          } else {
            console.log('123132123')
            // 创建读取文件的对象
            var reader = new FileReader()
            reader.readAsDataURL(file)

            // 创建文件读取相关的变量
            var imgFile

            // 为文件读取成功设置事件
            reader.onload = function (e) {
              // alert('文件读取完成')
              imgFile = e.target.result
              // this.url = imgFile
              console.log('123132123')
              that.$reqs.post('/users/imgUpload', {
                data: imgFile
              }).then(function (res) {
              }).catch(function (res) {
                console.log(res.toString())
              })
              $('#imgContent').attr('src', imgFile)
            }
            that.imageShow = true
            console.log(that.imageShow)
          }
          // console.log(this.url)
          // this.$reqs.post('/users/imgUpload', {
          //   url: this.url
          // }).then(function (res) {
          // }).catch(function (res) {
          //   console.log(res.toString())
          // })
          // console.log(imgFile)
          // this.$reqs.post('/users/insert', {
          //   pic: imgFile
          // }).then(function (res) {
          // }).catch(function (res) {
          //   console.log(res.toString())
          // })
           // 正式读取文件
        },
        handleAvatarSuccess (res, file) {
          this.imageUrl = URL.createObjectURL(file.raw)
          console.log(file.raw)
          console.log(this.imageUrl)
        },
        beforeAvatarUpload (file) {
          const isJPG = file.type === 'image/jpeg'
          const isLt2M = file.size / 1024 / 1024 < 2

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
          }
          return isJPG && isLt2M
        }
      }
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    z-index: 10;
    /*border:  dashed antiquewhite 3px;*/
    border-radius: 2px;
    display: inline-block;
    vertical-align: top;
    /*float: left;*/
    position: relative;
    left: -155px;
  }
  .avatar {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    z-index: 10;
    /*border:  dashed antiquewhite 3px;*/
    border-radius: 2px;
    display: inline-block;
    vertical-align: top;
    /*float: left;*/
    position: relative;
    left: 79px;
  }
  .upload_input {
    /*visibility: hidden;*/
    /*float: left;*/
    width: 150px;
    height: 150px;
    z-index: 30;
    display: inline-block;
    vertical-align: top;
    opacity: 0;
    position: relative;
    left: 155px;
    cursor: pointer;
  }
  img{
    /*width: 200px;*/
    /*height: 200px;*/
    display: inline-block;
    width: 150px;
    height: 150px;
    z-index: 20;
    vertical-align: top;
  }
  .text{
    opacity: 0;
  }
  #imgContent3{
    position: relative;
    left: -75px;
  }
</style>

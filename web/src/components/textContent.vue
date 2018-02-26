<template>
<div class="textContent">
  <el-input type="textarea" v-model="content" :rows="5"></el-input>
  <div style="text-align: center;margin: 20px auto">
    <el-button type="primary" size="mini" @click="onSubmit">主要按钮</el-button>
  </div>
</div>
</template>

<script>
    export default {
      name: 'text-content',
      data () {
        return {
          content: '131231231'
        }
      },
      created () {
        this.$reqs.get('/users/getText').then(function (res) {
          console.log(res.data)
          let data = res.data[0].textContent
          let arr = data.split('\n')
          // console.log(this.content)
          console.log(arr)
        }).catch(function (res) {
        })
      },
      methods: {
        onSubmit () {
          this.$reqs.post('/users/content', {
            data: this.content
          }).then(function (res) {
          }).catch(function (res) {
            console.log(res.toString())
          })
          let data = this.content
          let arr = data.split('\n')
          console.log(this.content)
          console.log(arr)
        }
      }
    }
</script>

<style scoped>
.textContent{
  width: 400px;
  text-align: center;
  margin: 0 auto;
}
</style>

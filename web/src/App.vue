<template>
  <div id="app">
    <!--<router-view/>-->
    <el-container>
      <el-header height="80px">
        <h3 class="title">图书管理平台</h3>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <el-menu
            class="el-menu-vertical-demo"
            :router="true"
            default-active="/all"
            >
            <el-submenu index="/all">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>图书分类</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/all">全部</el-menu-item>
                <el-menu-item  v-for="item in book_items"
                               :key="item.key"
                               :index="item.path">{{item.book_item}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/zaiku">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>图书信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/zaiku">在库图书</el-menu-item>
                <el-menu-item index="/chuzu">租借图书</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/reader">
              <i class="el-icon-edit"></i>
              <span slot="title">读者信息</span>
            </el-menu-item>
            <el-menu-item index="/imgUpload">
              <i class="el-icon-edit"></i>
              <span slot="title">图片上传</span>
            </el-menu-item>
            <el-menu-item index="/textContent">
              <i class="el-icon-edit"></i>
              <span slot="title">提交</span>
            </el-menu-item>
            <el-menu-item index="/multiImg">
              <i class="el-icon-edit"></i>
              <span slot="title">多图片上传</span>
            </el-menu-item>
            <el-menu-item index="/carouselImg">
              <i class="el-icon-edit"></i>
              <span slot="title">轮播图</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        book_items: [
          {
            book_item: '文学',
            path: '/wenxue',
            key: 0
          },
          {
            book_item: '自然',
            path: '/ziyan',
            key: 1
          },
          {
            book_item: '小说',
            path: '/xiaoshuo',
            key: 2
          },
          {
            book_item: '科学',
            path: '/kexue',
            key: 3
          }
        ]
      }
    },
    created: function () {
      this.$router.push('/all')
    }
  }
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
  .el-header{
    background-color: powderblue;
  }

  .title{
    color: dimgray;
    letter-spacing: 3px;
    font-size: x-large;
    margin-bottom: 0;
  }
  .el-aside{
    height:700px;
  }

/*.el-aside {*/
  /*background-color: #D3DCE6;*/
  /*height: 500px;*/

/*}*/

/*.el-main {*/
  /*background-color: #E9EEF3;*/
  /*height: 500px;*/
/*}*/

</style>

<template>
  <!--<table-science :data=this.tableData></table-science>-->
  <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="书名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="state"
      label="标签"
      width="150"
      :filters="[{ text: '在库', value: '在库' }, { text: '外借', value: '外借' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.state === '在库' ? 'primary' : 'warning'"
          close-transition>{{scope.row.state}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click.native.prevent="deleteRow(scope.$index, tableData)"
        >删除</el-button>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
    // import science from './bookItem.vue'
    // import store from 'src/store'
    import { Message } from 'element-ui'
    export default {
      name: 'kexue',
      created () {
        var _this = this
        // var data = []
        this.$reqs.get('/users/book_science').then(function (res) {
          _this.tableData = res.data
          _this.temp_data = res.data
          console.log(_this.tableData)
        }).catch(function (res) {
          Message.error(res.toString())
        })
      },
      data () {
        return {
          tableData: []
        }
      },
      methods: {
        filterTag (value, row) {
          return row.state === value
        }
      }
    }
</script>

<style scoped>

</style>

<template>
  <div>
    <!--<table-store :data=this.tableData tag_type="primary" tag_name="在库"></table-store>-->
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
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.state === '在库' ? 'primary' : 'warning'"
            close-transition>{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="item"
        label="类别"
        width="180">
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
  </div>
</template>

<script>
    import { Message } from 'element-ui'
    export default {
      name: 'zaiku',
      created () {
        var _this = this
        // var data = []
        this.$reqs.get('/users/in').then(function (res) {
          _this.tableData = res.data
        }).catch(function (res) {
          Message.error(res.toString())
        })
      },
      data () {
        return {
          tableData: []
        }
      }
    }
</script>

<style scoped>

</style>

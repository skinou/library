<template>
  <div>
    <div class="top">
      <el-input prefix-icon="el-icon-search" v-model="search_name" placeholder="请输入书名" style="width:240px" @change="dofilter"></el-input>
      <el-button type="primary" plain>搜索</el-button>
      <book-info-add :tag_type=this.tag_type :tag_name=this.tag_name></book-info-add>
    </div>
    <el-table
      :data="table_results"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="book"
        label="书名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="tag_type"
            close-transition>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click.native.prevent="deleteRow(scope.$index, table_results)"
          >删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
    import add from './bookInfoAdd.vue'
    export default {
      name: 'bookInfo',
      components: {
        'book-info-add': add
      },
      props: [
        'data',
        'tag_type',
        'tag_name'
      ],
      created () {
        this.table_results = this.data
      },
      methods: {
        deleteRow (index, rows) {
          rows.splice(index, 1)
        },
        dofilter () {
          if (this.search_name === '') {
            this.table_results = this.data
          } else {
            this.temp_data = []
            this.data.forEach((value, index) => {
              if (value.book) {
                if (value.book.indexOf(this.search_name) > -1) {
                  this.temp_data.push(value)
                }
              }
            })
            console.log(this.temp_data)
            this.table_results = this.temp_data
          }
          return this.table_results
        }
      },
      data () {
        return {
          search_name: '',
          table_results: [],
          temp_data: []
        }
      }
    }
</script>

<style scoped>
.top{
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>

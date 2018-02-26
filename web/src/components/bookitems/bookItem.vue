<template>
  <div>
    <div class="top">
      <el-input prefix-icon="el-icon-search" v-model="search_name" placeholder="请输入书名" style="width:240px" @change="dofilter"></el-input>
      <el-button type="primary" plain>搜索</el-button>
      <book-item-add></book-item-add>
    </div>
    <el-table
      :data="table_results"
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
        width="100"
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
    import add from './bookItemAdd.vue'
    export default {
      name: 'bookItem',
      props: [
        'data'
      ],
      components: {
        'book-item-add': add
      },
      data () {
        return {
          search_name: '',
          table_results: [],
          temp_data: []
        }
      },
      created () {
        this.table_results = this.data
        console.log(this.data)
        console.log(this.table_results)
        console.log(this.table_results.length)
      },
      methods: {
        deleteRow (index, rows) {
          rows.splice(index, 1)
        },
        filterTag (value, row) {
          return row.tag === value
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
      }
    }
</script>

<style scoped>
  .top{
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>

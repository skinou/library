<template>
  <div>
    <!--<table-all :data=this.tableData></table-all>-->
    <div class="top">
      <el-input prefix-icon="el-icon-search" v-model="search_name" placeholder="请输入书名" style="width:240px" @change="dofilter"></el-input>
      <el-button type="primary" plain>搜索</el-button>
      <!--<book-item-add url="/users/login"></book-item-add>-->
      <div class="add_content">
        <el-button class="add" type="success" plain  @click="dialogFormVisible = true" icon="el-icon-circle-plus">添加</el-button>

        <el-dialog title="添加新书" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="书名" :label-width="formLabelWidth" prop="bookName">
              <el-input v-model="form.bookName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
              <el-input v-model="form.author" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth" prop="value">
              <el-select v-model="form.value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类别" :label-width="formLabelWidth" prop="value">
              <el-select v-model="form.itemv" placeholder="请选择">
                <el-option
                  v-for="item in item_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <div class="dialog-footer">
                <el-button @click="resetForm('form')">重置</el-button>
                <el-button type="primary" @click="onSubmit('form') ">确 定</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>

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
      name: 'all',
      mounted () {
        console.log('1123456748911111111111111111111111111111')
        this.getData()
        console.log('11234567422222222222222222222222222222222222222222222222222289')
      },
      data () {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('不能为空'))
          } else {
            callback()
          }
        }
        return {
          tableData: [],
          search_name: '',
          temp_data: [],
          temp: [],
          add: true,
          dialogFormVisible: false,
          updateDialogFormVisible: false,
          form: {
            bookName: '123',
            author: '12356',
            value: '',
            itemv: ''
          },
          // form_up: {
          //   bookName: '',
          //   author: '',
          //   value: ''
          // },
          formLabelWidth: '80px',
          options: [{
            label: '在库',
            value: '在库'
          }, {
            label: '外借',
            value: '外借'
          }],
          item_options: [{
            label: '文学',
            value: 'book_literature'
          }, {
            label: '自然',
            value: 'book_nature'
          }, {
            label: '小说',
            value: 'book_novel'
          }, {
            label: '科学',
            value: 'book_science'
          }],
          rules: {
            bookName: [
              { validator: validatePass, trigger: 'blur' }
            ],
            author: [
              { validator: validatePass, trigger: 'blur' }
            ],
            value: [
              { validator: validatePass, trigger: 'blur' }
            ],
            itemv: [
              { validator: validatePass, trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        getData () {
          var _this = this
          // var data = []
          this.$reqs.get('/users/').then(function (res) {
            _this.tableData = res.data
            _this.temp_data = res.data
            console.log(res.data.length)
            console.log('11234567489')
          }).catch(function (res) {
            Message.error(res.toString())
          })
        },
        deleteRow (index, rows) {
          var _this = this
          console.log(JSON.parse(JSON.stringify(rows[index].name)))
          this.$reqs.post('/users/delete',
            {
              name: rows[index].name
            }
          ).then(function (res) {
            console.log(res)
          }).catch(function (res) {
            Message.error(res.toString())
          })
          _this.$message({
            message: '成功',
            type: 'success'
          })
          rows.splice(index, 1)
        },
        filterTag (value, row) {
          return row.state === value
        },
        dofilter () {
          if (this.search_name === '') {
            this.tableData = this.temp_data
          } else {
            this.temp = []
            this.tableData.forEach((value, index) => {
              if (value.name) {
                if (value.name.indexOf(this.search_name) > -1) {
                  this.temp.push(value)
                }
              }
            })
            console.log(this.temp)
            this.tableData = this.temp
          }
          return this.tableData
        },
        onSubmit (formName) {
          var _this = this
          // var add_item = true
          var newData = {}
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$reqs.post('/users/insert', {
                name: _this.form.bookName,
                author: _this.form.author,
                value: _this.form.value,
                item: _this.form.itemv
              }).then(function (res) {
                console.log(res.data)
                _this.add = res.data
                if (_this.add !== false) {
                  newData.name = _this.form.bookName
                  newData.author = _this.form.author
                  newData.state = _this.form.value
                  _this.tableData.reverse()
                  _this.tableData.push(newData)
                  _this.tableData.reverse()
                  _this.$message({
                    message: '成功',
                    type: 'success'
                  })
                } else {
                  Message.error('书籍已存在')
                }
              }).catch(function (res) {
                console.log(res.toString())
              })
            } else {
              return false
            }
          })
          _this.dialogFormVisible = false
        },
        resetForm (formName) {
          this.$refs[formName].resetFields()
        }
      }
    }
</script>

<style scoped>
  .top{
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .add{
    float: right;
  }
  .add_content{
    width: 120px;
    float: right;
  }
  .el-input{
    width: 320px;
  }
  .dialog-footer{
    text-align: center;
  }
</style>

<template>
  <div>
    <div class="top">
      <el-input prefix-icon="el-icon-search" v-model="search_name" placeholder="请输入姓名" style="width:240px" @change="dofilter"></el-input>
      <el-button type="primary" plain>搜索</el-button>
      <div class="add_content">
        <el-button class="add" type="success" plain  @click="dialogFormVisible = true" icon="el-icon-circle-plus">添加</el-button>

        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="550px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="reader">
              <el-input v-model="form.reader" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="书名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="借阅时间" :label-width="formLabelWidth" prop="time">
              <el-date-picker
                v-model="form.time"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
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
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('form')">重 置</el-button>
            <el-button type="primary" @click="onSubmit('form') ">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <el-table
      :data="table_results"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="reader"
        label="读者"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="书名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="借阅时间"
        width="180"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            type= primary
            close-transition>{{scope.row.time}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="returned"
        label=""
        width="110"
        :filters="[{ text: '已归还', value: '已归还' }, { text: '未归还', value: '未归还' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.returned === '已归还' ? 'success' : 'warning'"
            close-transition>{{scope.row.returned}}</el-tag>
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
    // import add from './addReader.vue'
    import { Message } from 'element-ui'
    export default {
      name: 'reader',
      created () {
        var _this = this
        // var data = []
        this.$reqs.get('/users/borrow').then(function (res) {
          _this.tableData = res.data
          _this.table_results = res.data
        }).catch(function (res) {
          Message.error(res.toString())
        })
      },
      methods: {
        deleteRow (index, rows) {
          rows.splice(index, 1)
        },
        filterTag (value, row) {
          return row.returned === value
        },
        dofilter () {
          if (this.search_name === '') {
            this.table_results = this.tableData
          } else {
            this.temp_data = []
            this.tableData.forEach((value, index) => {
              if (value.reader) {
                if (value.reader.indexOf(this.search_name) > -1) {
                  this.temp_data.push(value)
                }
              }
            })
            console.log(this.temp_data)
            this.table_results = this.temp_data
          }
          return this.table_results
        },
        onSubmit (formName) {
          var _this = this
          var newData = {}
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!')
              this.$reqs.post('/users/insert_borrow', {
                name: _this.form.name,
                reader: _this.form.reader,
                time: _this.form.time,
                value: _this.form.value
              }).then(function (res) {
                console.log(res.data)
                _this.add = res.data
                if (_this.add !== false) {
                  newData.name = _this.form.name
                  newData.reader = _this.form.reader
                  newData.time = _this.form.time
                  newData.value = _this.form.value
                  _this.tableData.reverse()
                  _this.tableData.push(newData)
                  _this.tableData.reverse()
                  _this.$message({
                    message: '成功',
                    type: 'success'
                  })
                } else {
                  Message.error('错误')
                }
              }).catch(function (res) {
                console.log(res.toString())
              })
            } else {
              Message.error('错误')
              return false
            }
          })
          _this.dialogFormVisible = false
        },
        resetForm (formName) {
          this.$refs[formName].resetFields()
        }
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
          search_name: '',
          table_results: [],
          temp_data: [],
          tableData: [],
          add: true,
          dialogFormVisible: false,
          form: {
            name: '',
            reader: '',
            time: '',
            value: ''
          },
          formLabelWidth: '90px',
          options: [{
            value: '未归还',
            label: '未归还'
          }, {
            value: '已归还',
            label: '已归还'
          }],
          rules: {
            name: [
              { validator: validatePass, trigger: 'blur' }
            ],
            reader: [
              { validator: validatePass, trigger: 'blur' }
            ],
            value: [
              { validator: validatePass, trigger: 'blur' }
            ],
            time: [
              { validator: validatePass, trigger: 'blur' }
            ]
          }
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

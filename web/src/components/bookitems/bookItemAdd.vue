<template>
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
        <el-form-item>
          <div class="dialog-footer">
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button type="primary" @click="onSubmit('form') ">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
    import { Message } from 'element-ui'
    export default {
      name: 'book-item-add',
      props: [
        'url'
      ],
      data () {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('不能为空'))
          } else {
            callback()
          }
        }
        return {
          dialogFormVisible: false,
          form: {
            bookName: '123',
            author: '12356',
            value: ''
          },
          formLabelWidth: '80px',
          options: [{
            label: '在库',
            value: '在库'
          }, {
            label: '外借',
            value: '外借'
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
            ]
          }
        }
      },
      methods: {
        onSubmit (formName) {
          var _this = this
          console.log('13213132132')
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!')
              this.$reqs.post(_this.url, {
                name: _this.form.bookName,
                author: _this.form.author,
                value: _this.form.value
              }).then(function (res) {
                console.log(res)
                Message.success('添加成功')
              }).catch(function (res) {
                console.log(res.toString())
              })
              console.log(_this.form.bookName)
            } else {
              console.log('error submit!!')
              return false
            }
          })
          // this.$emit('ievent', this.form)
        },
        resetForm (formName) {
          this.$refs[formName].resetFields()
        }
      }
    }
</script>

<style scoped>
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

<template>
  <div class="add_content">
    <el-button class="add" type="success" plain  @click="dialogFormVisible = true" icon="el-icon-circle-plus">添加</el-button>

    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.reader" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input v-model="form.bookName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="借阅时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: 'add-reader',
      data () {
        return {
          dialogFormVisible: false,
          form: {
            bookName: '',
            reader: '',
            time: ''
          },
          formLabelWidth: '90px',
          options: [{
            value: '选项1',
            label: '未归还'
          }, {
            value: '选项2',
            label: '已归还'
          }]
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
</style>

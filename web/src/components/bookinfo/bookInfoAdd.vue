<template>
 <div class="add_content">
   <el-button class="add" type="success" plain  @click="dialogFormVisible = true" icon="el-icon-circle-plus">添加</el-button>

   <el-dialog title="添加新书" :visible.sync="dialogFormVisible">
     <el-form :model="form">
       <el-form-item label="书名" :label-width="formLabelWidth">
         <el-input v-model="form.bookName" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item label="作者" :label-width="formLabelWidth">
         <el-input v-model="form.author" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item label="状态" :label-width="formLabelWidth">
         <el-tag
           :type="tag_type"
           close-transition>{{tag_name}}</el-tag>
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
      name: 'book-info-add',
      props: [
        'tag_type',
        'tag_name'
      ],
      data () {
        return {
          dialogFormVisible: false,
          form: {
            bookName: '',
            author: ''
          },
          formLabelWidth: '80px'
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

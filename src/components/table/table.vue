<template>
<div>
    <el-form :model="formInline" class="demo-form-inline">
        <el-row>
            <el-col :span="5">
                <el-form-item label="姓名" prop="user.name">
                    <el-input v-model="formInline.user.name" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="年份" prop="user.date">
                    <el-date-picker v-model="formInline.user.date" type="year" placeholder="选择年份"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="地址" prop="user.address">
                    <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        v-model="formInline.user.address">
                    </el-cascader>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="籍贯">
                    <el-select v-model="formInline.user.place" placeholder="请选择">
                        <el-option
                            v-for="item in places"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item>
                    <el-button type="primary" size="medium">查询</el-button>
                    <el-button type="primary" size="medium">导出数据</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <el-table
        ref="infoTable"
        :data="tableData"
        style="width:100%"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="date"
            label="出生日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        <el-table-column
            label="操作"
            width="280">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination style="text-align:center;margin-top:20px;"
      :background="true"  
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="200">
    </el-pagination>
    <el-dialog title="修改个人信息" :visible="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;" ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</div>
    
</template>
<script>
    const ERR_OK = "000";
    export default{
        data(){
            return{
                formInline: {
                    user: {
                        name: '',
                        date: '',
                        address: [],
                        place: ''
                    }
                },
                places:[],
                options:[],
                tableData:[],
                dialogFormVisible: false,
                editLoading: false,
                form: {
                    name: '',
                    address: '',
                    date: '',
                },
                table_index: 999,
                selectedItems:[],
                currentPage:1,
                pageSize:10
            }
        },
        components:{
            
        },
        methods:{
            handleSelectionChange(selection){
                this.selectedItems=selection;
            },
            handleEdit(index, row){
                this.dialogFormVisible = true;
                this.form = Object.assign({}, row);
                this.table_index = index;
            },
            handleDelete(index, row){
                this.tableData.splice(index, 1);
                this.$message({
                    message: "操作成功！",
                    type: 'success' 
                });
            },
            handleSave(){
                this.$set(this.tableData,this.table_index,this.form);
                this.dialogFormVisible=false;
            },
            handleSizeChange(val){
                this.pageSize=val;
                this.getTableData();
            },
            handleCurrentChange(val){
                this.currentPage=val;
                this.getTableData();
            },
            getTableData(){
                this.$http.post('/api/getTableData',{pageSize:this.pageSize}).then((response)=>{
                    response = response.data;
                    if (response.code === ERR_OK) {
                        this.tableData = response.datas;
                    }
                })
                /*this.$http.get('/api/getTable').then((response) => {
                    response = response.data;
                    if (response.code === ERR_OK) {
                        this.tableData = response.datas;
                    }
                });*/
            },
            getOptions(){
                this.$http.get('/api/getOptions').then((response) => {
                    response = response.data;
                    if (response.code === ERR_OK) {
                        this.options = response.datas;
                        this.places = response.places;
                    }
                });
            }
        },
        mounted(){
            
        },
        created(){
            this.getTableData();
            this.getOptions();
        }
    }
</script>
<style lang="less" scoped>
    .demo-form-inline{
        .el-input,.el-cascader,.el-select{
            width: 76%;
        }
    }
</style>
<template>
    <div style="margin:20px 20px;">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" style="width:500px">
            <el-form-item label="待办事项" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="事项类型" prop="type">
                <el-radio-group v-model="formData.type">
                    <el-radio label="1">常规</el-radio>
                    <el-radio label="2">紧急</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="提醒方式" prop="warningType">
                <el-checkbox-group v-model="formData.warningType">
                    <el-checkbox label="短信"></el-checkbox>
                    <el-checkbox label="电话"></el-checkbox>
                    <el-checkbox label="邮件"></el-checkbox>
                    <el-checkbox label="微信"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="提醒时间" prop="time">
                <el-time-picker v-model="formData.time" placeholder="请选择提醒时间" style="width: 100%;"></el-time-picker>
            </el-form-item>
            <el-form-item label="重复提醒" prop="oncemore">
                <el-switch v-model="formData.oncemore" @change="onOff"></el-switch>
            </el-form-item>
            <el-form-item label="重复时间" :required="formData.oncemore">
                <el-col :span="11">
                    <el-form-item prop="startDate">
                        <el-date-picker :disabled="!formData.oncemore" v-model="formData.startDate" style="width:100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    &nbsp;-
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="endDate">
                        <el-date-picker :disabled="!formData.oncemore" v-model="formData.endDate" style="width:100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="重复周期" prop="repeatCircle">
                <el-select v-model="formData.repeatCircle">
                    <el-option label="每日提醒" value="1"></el-option>
                    <el-option label="每周提醒" value="2"></el-option>
                    <el-option label="每月提醒" value="3"></el-option>
                    <el-option label="工作日提醒" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="其它信息" prop="others">
                <el-input type="textarea" :rows="5" v-model="formData.others"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">立即创建</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                formData:{
                    name:'',
                    type:'',
                    warningType:[],
                    time:'',
                    oncemore:false,
                    startDate:'',
                    endDate:'',
                    repeatCircle:'',
                    others:''
                },
                rules:{
                    name: [
                        {required: true, message: '请输入待办事项名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择待办事项类型', trigger: 'change'}
                    ],
                    warningType: [
                        {type: 'array', required: true, message: '请至少选择一个提醒方式', trigger: 'change'}
                    ],
                    time: [
                        {type: 'date', required: true, message: '请选择提醒时间', trigger: 'change'}
                    ],
                    repeatCircle: [
                        {required: false, message: '请选择重复周期', trigger: 'change'}
                    ],
                    startDate: [
                        {}
                    ],
                    endDate: [
                        {}
                    ],
                    other: [
                        {required: true, message: '请填写其他信息', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            submit(){
                this.$refs['formData'].validate((valid)=>{
                    if(valid){
                        this.$message({
                            message: "提交成功！",
                            type: 'success'
                        });
                    }else{
                        return false
                    }
                })
            },
            reset(){
                this.$refs.formData.resetFields();
            },
            onOff(){
                if(this.formData.oncemore){
                    this.$set(this.rules,'startDate',[{type: 'date', required: true, message: '请选择开始日期', trigger: 'change'}]);
                    this.$set(this.rules,'endDate',[{type: 'date', required: true, message: '请选择结束日期', trigger: 'change'}])
                }else{
                    this.$set(this.rules,'startDate',[{}]);
                    this.$set(this.rules,'endDate',[{}])
                }
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
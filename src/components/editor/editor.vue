<template>
    <div>
        <el-button-group style="margin-bottom:20px">
            <el-button type="primary" @click="getContentText">获取纯文本内容</el-button>
            <el-button type="primary" @click="getContent">获取HTML内容</el-button>
        </el-button-group>
        <UE :container-name="containerName" :default-msg="defaultMsg" :config="config" ref="ueditor"></UE>
    </div>
</template>
<script>
    import UE from "@/components/ueditor/UE"
    export default{
        components:{
            UE
        },
        data(){
            return{
                containerName:"ueContainer",
                defaultMsg: this.$store.state.defaultMsg,
                config:{
                    initialFrameWidth: null,
                    initialFrameHeight: 650
                },
                content:'',
                contentText:''
            }
        },
        computed:{
            fullName(){
                return this.$store.getters.fullName
            }
        },
        methods:{
            getContent(){
                this.content=this.$refs.ueditor.getContent();
                this.$notify({
                    title: `${this.fullName}获取成功！`,
                    message: this.content,
                    type: 'success'
                });

                this.$store.commit('changeMsg',this.content);
                this.$store.dispatch('countTimes').then((resolve)=>{
                    console.log(this.$store.state.editorTimes);
                })
            },
            getContentText(){
                this.contentText=this.$refs.ueditor.getContentTxt();
                this.$notify({
                    title: '获取成功！',
                    message: this.contentText,
                    type: 'success'
                });
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
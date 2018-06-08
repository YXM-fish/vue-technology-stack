<template>
    <div>
        <script :id=containerName name="content" type="text/plain">
            
        </script> 
    </div>
</template>
<script>
    import "../../../static/UE/ueditor.config.js"
    import "../../../static/UE/ueditor.all.js"
    import '../../../static/UE/lang/zh-cn/zh-cn.js'
    import '../../../static/UE/ueditor.parse.min.js'

    export default{
        data(){
            return{
                ue:null
            }
        },
        props:{
            containerName:{
                type:String
            },
            defaultMsg:{
                type:String
            },
            config:{
                type:Object
            }
        },
        mounted(){
            const _this = this;
            this.ue=UE.getEditor(this.containerName,this.config);
            this.ue.addListener("ready", function () {
                _this.ue.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
            });
        },
        methods:{
            getContent() { 
                return this.ue.getContent()
            },
            getContentTxt() { 
                return this.ue.getContentTxt()
            }
        },
        destroyed() {
            this.ue.destroy();
        }
    }
</script>
<style lang="less" scoped>

</style>
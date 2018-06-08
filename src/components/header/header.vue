<template>
    <el-row type="flex" justify="space-between" align="middle" class="header-row">
        <el-col :span="6">
            <div class="grid-content logo">
                <img src="./logo.svg" alt="element-ui" @click="alertSomething">
                <!--<input type="text" v-model="computedName">-->
            </div>
        </el-col>
        <el-col :span="5">
            <div class="grid-content user">
                <span @click="changeSize">{{msg}}</span>
            </div>
        </el-col>
        <a href="https://router.vuejs.org/zh/guide/#javascript">
            <img src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="">
        </a>
    </el-row>
</template>
<script>

    export default{
        props:{
            headName:{
                type:String
            },
            linkTo:{
                type:Function
            }
        },
        data(){
            return{
                msg:'方娜（湖南省/超级管理员）',
                nameArray:['Yu ','xiao','ming'],
                obj:{
                    name: 'Xiao'
                }
            }
        },
        computed:{
            //computedName:function(){
                //return this.nameArray.join('');
            //}
            computedName:{
                get:function(){
                    return this.nameArray.join('');
                },
                set:function(newVal){
                    console.log(newVal);
                }
            }
        },
        methods:{
            alertSomething(){
                //window.alert('成功');
                this.linkTo(this.$router.options.routes[0].children[2])
            },
            changeSize(e){
                console.log(e);
                this.$emit('change-size',30);
            }
        },
        mounted(){
            console.log(this.$attrs);
            
            console.log(this.linkTo);
            console.log(this.computedName);
            console.log('变异方法\n');

            this.nameArray.push('gg');
            console.log(this.nameArray);
            
            this.nameArray.pop();
            console.log(this.nameArray);

            this.nameArray.shift();
            console.log(this.nameArray);

            this.nameArray.unshift('gg');
            console.log(this.nameArray);

            this.nameArray.splice(0,1,'Yu');
            console.log(this.nameArray);

            this.nameArray.sort();
            console.log(this.nameArray);

            this.nameArray.reverse();
            console.log(this.nameArray);

            console.log('变异方法\n');
            var newArr1=this.nameArray.filter(
                function(item){
                    return item.length==4;
                }
            );
            console.log(this.nameArray,newArr1);

            var newArr2=this.nameArray.concat(['是大佬','今年28岁']);
            console.log(this.nameArray,newArr2);

            var newArr3=this.nameArray.slice(this.nameArray.length-2);
            console.log(this.nameArray,newArr3);

            this.$set(this.nameArray,0,'Xiao');
            console.log(this.nameArray);

            this.obj=Object.assign({},this.obj,{lastName:'ming',firstName:'Yu'});
            console.log(this.obj);
        }
    }
</script>
<style lang="less" scoped>
    .header-row{
        height: 100%;
    }
    a{
        position: fixed;
        right: 0;
        top: 0;
        z-index: 999;
    }
    
</style>

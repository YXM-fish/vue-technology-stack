<template>
  <el-container class="top-container">
    <el-header>
      <v-header :head-name="'elementUI'" name="yxm" :link-to="linkTo" @change-size="changeSize"></v-header>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu :default-active="$route.path">
          <el-menu-item @click="linkTo(route)" v-for="route in $router.options.routes[0].children" :index="route.path" :key="route.path">
            <i class="fa" :class="route.class"></i>
            <span :style="{fontSize:fSize+'px'}">{{route.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    import header from './components/header/header.vue'

    export default {
      name: 'App',
      components:{
        'v-header':header
      },
      data(){
        return{
          fSize: 16
        }
      },
      methods:{
        linkTo(route){
          this.$router.push({name:route.name})
        },
        changeSize(size){
          console.log('from parent');
          this.fSize++;
        }
      },
      mounted(){
          console.log(this.$options.name)
      }
    }
</script>

<style lang="less" scoped>
  .top-container{
      width: 100%;
      height: 100%;
  }
  .el-header{
      background-color: rgb(32, 160, 255);
      height: 80px !important;
  }
  .el-aside{
      width: 13% !important;
      min-width: 140px;
      background-color: #E6E6E6;
  }
  .el-menu{
      height: 100%;
      background-color: #E6E6E6;
    
    .el-menu-item{
        font-size: 100%;

      .fa{
          margin-right: 10px;
      }
    }
  }
  .el-main{
      background-color: #F2F2F2;
  }

  .fade-leave-active{
      transform: translate(20px);
      opacity: 0.2;
      transition: all .5s ease-in;
  }
  .fade-enter-active{
      animation: move-to .5s;
  }
  @keyframes move-to{
      from{
        transform: translate(20px);
      }to{
        transform: translate(0);
      }
  }
</style>

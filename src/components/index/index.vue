<template>
    <div class="chart-page">
        <div ref="index" class="top-info">
            <span>今日系统安全指数：</span>
            <el-rate
                v-model="rateValue"
                disabled
                :show-text=true
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
           <!--<span style="float:right;">Vue之filter的使用：{{testFilter | transform('lower')}}</span>-->
        </div>
        <div class="chart-info">
            <div id="chartPlace" class="chart-place" style="height:450px"></div>
            <div id="chartUser" class="chart-user"></div>
        </div>
        <!--<input type="text" name="t" id="t" v-model="testFilter">-->
    </div>
</template>
<script>
    import Highcharts from 'highcharts/highstock'
    import app from '@/main.js'

    export default{
        components:{
            
        },
        data(){
            return{
                rateValue:1.8,
                chartPlace:null,
                chartUser:null,
                testFilter:'testFilter'
            }
        },
        methods:{
            initChartPlace(){
                var palceOptions={
                    chart: {
                        zoomType: 'xy'
                    },
                    title:{
                        text:'东京月平均天气数据'
                    },
                    subtitle:{
                        text:'数据来源WORLDCLIMATE.COM'
                    },
                    tooltip: {
                        shared: true
                    },
                    xAxis:[{
                        categories: ['一月', '二月', '三月', '四月','五月', '六月', '七月', '八月','九月', '十月', '十一月', '十二月'],
                        gridLineDashStyle:'Dash',
                        gridLineColor:'#19000',
                        crosshair: true,
                        labels:{
                            staggerLines:2
                        }
                    }],
                    yAxis:[{
                        title:{
                            text:'降雨量',
                            style:{
                                color:Highcharts.getOptions().colors[0]
                            }
                        },
                        labels:{
                            format:'{value} mm',
                            style:{
                                color:Highcharts.getOptions().colors[0]
                            }
                        }
                    },{
                        title:{
                            text:'温度',
                            style:{
                                color:Highcharts.getOptions().colors[1]
                            }
                        },
                        labels:{
                            format:'{value} °C',
                            style:{
                                color:Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite:true
                    },{
                        title:{
                            text:'海平面气压',
                            style:{
                                color:Highcharts.getOptions().colors[5]
                            }
                        },
                        labels:{
                            format:'{value} mb',
                            style:{
                                color:Highcharts.getOptions().colors[5]
                            }
                        },
                        opposite:true
                    }],
                    series:[{
                        name:'降雨量',
                        type:'column',
                        yAxis: 0,
                        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                        tooltip: {
                            valueSuffix: ' mm'
                        }
                    },{
                        name:'温度',
                        type:'spline',
                        yAxis: 1,
                        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                        dashStyle:'shortdot',
                        tooltip: {
                            valueSuffix: ' °C'
                        }
                    },{
                        name:'海平面气压',
                        type:'spline',
                        yAxis: 2,
                        data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
                        tooltip: {
                            valueSuffix: ' mb'
                        },
                        //marker: {
                            //fillColor: Highcharts.getOptions().colors[5]
                        //},
                        //lineColor:Highcharts.getOptions().colors[5]
                        color:Highcharts.getOptions().colors[5]
                    }],
                    legend:{
                        align:'left',
                        verticalAlign:'top',
                        x:80,
                        y:50,
                        labelFormat:'{name}(click to toggle show)',
                        layout:'vertical',
                        floating:true,
                        backgroundColor: 'rgba(0,0,0,.6)',
                        itemStyle: { cursor: 'pointer', color: '#ffffff' },
                        itemHoverStyle: { color: 'rgb(255, 153, 0)' }
                    }
                };

                this.chartPlace=new Highcharts.chart(document.getElementById('chartPlace'),palceOptions);
            },
            initChartUser(){
                var userOptions={
                    title: {
                        text: '2014 某网站各浏览器浏览量占比'
                    },
                    tooltip: {
                        headerFormat: '{series.name}<br>',
                        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,  // 可以被选择
                            cursor: 'pointer',       // 鼠标样式
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '浏览器访问量占比',
                        data: [
                            ['Firefox',   45.0],
                            ['IE',       26.8],
                            {
                                name: 'Chrome',
                                y: 12.8,
                                sliced: true,  // 默认突出
                                selected: true // 默认选中 
                            },
                            ['Safari',    8.5],
                            ['Opera',     6.2],
                            ['其他',   0.7]
                        ]
                    }]
                };
            
                this.chartUser=new Highcharts.chart(document.getElementById('chartUser'),userOptions);
            }
        },
        filters:{
            transform(value,type){
                if(!type) return value;
                if(Object.prototype.toString.call(type)!=="[object String]"){
                    return value;
                } 
                else{
                    switch(type){
                        case 'upper':return value.toUpperCase();break;
                        case 'lower': return value.toLowerCase();break;
                        default: return value;break;
                    }
                }
            }
        },
        mounted(){
            this.$nextTick(function () {
                this.initChartPlace();
                this.initChartUser();
                //console.log(app.$el);
                //console.log(this.$parent,this.$children,this.$root,this.$parent==this.$children);
                console.log(this.$router,this.$router.options.routes,'\n',this.$route);
                console.log(this.$refs.index.getAttribute('class'));

            })
        },
        watch:{
            testFilter:function(val,oldVal){
                this.rateValue++
            }
        }
    }
</script>
<style lang="less">
    .top-info{
        padding: 10px;
        border-radius: 4px;
        background-color: white;
    }
    .el-rate{
        display: inline;
    }
    .top-info span{
        font-size: 18px;
        font-weight: bold;
        vertical-align: top;
    }
    
    .chart-info{
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        background-color: #F2F2F2;
    }
    .chart-place,.chart-user{
        flex: 1;
        height: 650px;
        background-color: white;
        border-radius: 4px;
    }
    .chart-place{
        margin-right: 10px;
    }
</style>


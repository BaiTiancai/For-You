<template>
    <div class="qa" id='qa'>
        <div class="container">
            <div class="qa-slogan">
                愿你有好好生活的热情和勇气，人生实苦，但请你足够相信！下面的Q＆A测试会给你答案。
            </div>
            <h2 class="qa-title">问答<span>Q&A</span></h2>
            <div class="qa-questions">
                <div v-for="(item, itemIndex) in qaOptionsData" :class="['accrodion', item.active !== null ? 'active' : '']" data-wow-duration="1500ms" data-wow-delay="0ms" :key="itemIndex">
                    <div class="accrodion-inner">
                        <div class="">
                            <h4>{{item.quesName}}</h4>
                            <ul>
                                <li v-for="(option, optionIndex) in item.options" :class="[item.active === optionIndex ? 'active' : '']" @click="onOptionClick(optionIndex, itemIndex)" :key="optionIndex">
                                    <span>{{option.name}}</span>
                                    <i v-if="item.active === optionIndex" class="fa fa-check"></i>
                                </li>
                            </ul>
                        </div>
                        <div v-if="item.active !== null" class="accrodion-content qa-content">
                            <div class="qa-content-echarts">
                                <div :id="`qa-content-echarts__echart-${itemIndex}`" class="qa-content-echarts__echart"></div>
                            </div>
                            <div class="qa-content-text">{{ item.options[item.active].ans.content }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qaOptionsData from '../mock/qaOptionsData.json';
export default {
    data () {
        return {
            qaOptionsData
        }
    },
    methods: {
        /**
         * 选项点击回调
         * 
         */
        onOptionClick (optionIndex, itemIndex) {
            this.qaOptionsData[itemIndex].active = optionIndex;
            this.$nextTick(() => {
                // DOM 现在更新了
                // `this` 绑定到当前实例
                this.chartInstance && this.chartInstance.resize()
                this.initEChart(itemIndex)
            })
        },
        initEChart (itemIndex) {
            const refName = `qa-content-echarts__echart-${itemIndex}`;
            this.chartInstance = this.$echarts.init(document.getElementById(refName), 'qa');
            
            const activeOptionsData = this.qaOptionsData[itemIndex];
            // 图表名称
            let name = activeOptionsData.quesName
            // 选中项名称
            let activeName = activeOptionsData.options[activeOptionsData.active].name
            // 选中项百分比
            let activePercent = activeOptionsData.options[activeOptionsData.active].ans.persent

            // 配置项目
            let option = {
                grid: {
                    top: "10%",
                    containLabel: true
                },
                legend: {
                    orient: 'vertical',
                    bottom: 'left',
                },
                // tooltip: {
                //     trigger: 'item',
                //     position: 'right',
                //     formatter (item) {
                //         console.log(101001, item)
                //         return (
                //             item.data.name ? `${item.data.name}&nbsp;&nbsp;&nbsp;&nbsp;${item.data.value}%` : ''
                //         )
                //     }
                // },
                series: [
                    {
                        name,
                        type: 'pie',
                        
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        label: {
                            show: true,
                            position: 'inside',
                            formatter (item) {
                                console.log(19991, item)
                                return (
                                    item.name ? `${item.data.value}%` : ''
                                )
                            }
                        },
                        data: [
                            {value: activePercent, name: activeName},
                            {
                                value: 100 - activePercent, 
                                name: '', 
                                itemStyle: {
                                    normal: {
                                        color: "#cacaca50"
                                    }
                                },
                            },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            }
                        }
                    }
                ]
            };
            this.chartInstance.setOption(option)
        },
    }
}
</script>

<style lang="css" scoped>
ul {
    margin: 0;
    padding: 0;
}
li {
    list-style: none;
}
.qa {
    background-color: #fefbf4;
    padding: 70px 0;
}
.qa-title {
    font-size: 30px;
    color: #2a2833;
    margin: 60px 0 30px;
}
.qa-slogan {
    color: rgba(0,0,0, .6);
    font-size: 24px;
    text-align: center;
}

.qa .accrodion-inner {
    background-color: #fff;
    padding: 30px;
    border: 1px solid #efefef;
    border-radius: 7px;
    position: relative;
    margin: 0 2px;
}
.qa .accrodion-inner h4 {
    font-size: 20px;
    margin-bottom: 15px;
    color: #2a2833;
}
.qa .accrodion-inner ul {
    padding-left: 10px;
}
.qa .accrodion-inner li {
    font-size: 16px;
    line-height: 30px;
}
.qa .accrodion-inner li .fa-check {
    color: #ff4eb5;
    margin-left: 10px;
}
.qa .accrodion-inner li span{
    transition: all .2s;
    cursor: pointer;
}
.qa .accrodion-inner li span:hover {
    color: #ff4eb590;
}
.qa .accrodion-inner li.active span {
    color: #ff4eb5;
}
.qa .qa-content {
    display: flex;
    border-top: 1px solid #cdcdcd;
    padding-top: 15px;
    margin-top: 15px;
}
.qa-content-echarts {
    width: 30%!important;
}
.qa-content-text {
    width: 70%!important;
    min-height: 200px;
    font-size: 16px;
    line-height: 30px;
}
.qa-content-echarts__echart {
    width: 100%;
    height: 100%;
}

.qa-content-echarts__echart canvas {
    width: 100%;
    height: 100%;
}
.accrodion {
    position: relative;
    margin-bottom: 20px;
}
.accrodion::before {
  content: '';
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: 0px;
  right: 0px;
  border-radius: 7px;
  -webkit-transform: scaleX(0);
          transform: scaleX(0);
  background-image: -webkit-gradient(linear, left bottom, left top, from(#ff4eb5), to(#ffa065));
  background-image: linear-gradient(0deg, #ff4eb5 0%, #ffa065 100%);
  -webkit-transition: -webkit-transform .4s ease;
  transition: -webkit-transform .4s ease;
  transition: transform .4s ease;
  transition: transform .4s ease, -webkit-transform .4s ease;
}

.accrodion.active::before {
 transform: scaleX(1);
}
</style>
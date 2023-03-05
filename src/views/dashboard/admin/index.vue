<template>
  <div class="dashboard-editor-container">
    <!--    <github-corner class="github-corner"/>-->

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="card-panel-text">系统占用情况</span>
            </div>
            <div>
              <el-descriptions class="margin-top" :column="1" :size="size" border :labelStyle='labelStyle'>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    内存消耗
                  </template>
                  <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    操作系统
                  </template>
                  Linux
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    JDK版本
                  </template>
                  1.8.0_212
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </div>
        <div class="chart-wrapper">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="card-panel-text">缓存</span>
            </div>
            <div>
              <el-button type="primary">刷新系统变量</el-button>
              <el-button type="success">重建索引</el-button>
              <el-dropdown style="margin-left: 10px;">
                <el-button type="warning">爬取数据<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item>双皮奶</el-dropdown-item>
                  <el-dropdown-item>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="card-panel-text">最新评论</span>
            </div>
            <div>
              <div class="item">
                <img src="http://java668.com/storage/avatars/000/000/001_240.jpg" alt="user image" class="offline">
                <p class="message">
                  <a href="/users/13" class="name">
                    <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 2022-08-14</small>
                    mztBang
                  </a>
                  源码地址：https://github.com/mouzt/mzt-biz-log
                </p>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup
  },
  data() {
    return {
      size: 'medium',
      labelStyle: {'width': '120px', 'text-align': 'center'},
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    //padding: 16px 16px 0;
    margin-bottom: 15px;
    .item {
      margin-bottom: 10px;
      .offline {
        border: 2px solid #dd4b39;
      }
      img {
        width: 40px;
        height: 40px;
        border: 2px solid transparent;
        border-radius: 50%;
        vertical-align: middle;
        overflow-clip-margin: content-box;
        overflow: clip;
      }
      .message {
        margin-left: 55px;
        margin-top: -40px;
        a {
          color: #3c8dbc;
        }
        .name {
          display: block;
          font-weight: 600;
          .pull-right {
            float: right!important;
          }
          .text-muted {
            color: #777;
          }
          .small, small {
            font-size: 85%;
          }
        }
      }
      p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
      }
    }
  }

  .card-panel-text {
    font-weight: bold;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

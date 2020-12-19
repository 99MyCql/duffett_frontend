<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">监听记录</h4>
            <p class="category">实时更新~~</p>
          </md-card-header>
          <md-card-content>
            <md-table v-model="stocks" table-header-color="green">
              <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                <md-table-cell md-label="#">{{ index }}</md-table-cell>
                <md-table-cell md-label="股票代码">
                  {{ item.ts_code }}
                </md-table-cell>
                <md-table-cell md-label="股票名">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="状态">{{ item.state }}</md-table-cell>
                <md-table-cell md-label="当前份额(份)">
                  {{ item.share }}
                </md-table-cell>
                <md-table-cell md-label="收益(元)">
                  {{ item.profit }}
                </md-table-cell>
                <md-table-cell md-label="监听策略名">
                  {{ item.strategyName }}
                </md-table-cell>
                <md-table-cell md-label="监听频率(s)">
                  {{ item.monitor_freq }}
                </md-table-cell>
                <md-table-cell md-label="监听开始时间">
                  {{ new Date(item.created_at).format("yyyy-MM-dd hh:mm:ss") }}
                </md-table-cell>
                <md-table-cell md-label="上次更新时间">
                  {{ new Date(item.updated_at).format("yyyy-MM-dd hh:mm:ss") }}
                </md-table-cell>
                <md-table-cell md-label="">
                  <md-button class="md-info">查看对应订单</md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getStocks as getS } from "@/api/stock";

export default {
  data() {
    return {
      stocks: []
    };
  },
  methods: {
    getStocks() {
      let that = this;
      getS()
        .then(function(response) {
          let stocks = response.data.data;
          console.log(stocks);
          that.stocks = stocks;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  activated() {
    this.getStocks();
  }
};
</script>

<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          v-if="SHStockIndex.load"
          :chart-data="SHStockIndex.data"
          :chart-options="SHStockIndex.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">上证指数</h4>
            <p class="category">
              <span v-if="SHStockIndex.change > 0" class="text-danger">
                <i class="fas fa-long-arrow-alt-up"></i>
                {{ SHStockIndex.change }}%
              </span>
              <span v-else class="text-success">
                <i class="fas fa-long-arrow-alt-down"></i>
                {{ SHStockIndex.change }}%
              </span>
              当日涨幅
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 3 minutes ago
            </div>
          </template>
        </chart-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          v-if="SZStockIndex.load"
          :chart-data="SZStockIndex.data"
          :chart-options="SZStockIndex.options"
          :chart-responsive-options="SZStockIndex.responsiveOptions"
          :chart-type="'Line'"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">深证指数</h4>
            <p class="category">
              <span v-if="SZStockIndex.change > 0" class="text-danger">
                <i class="fas fa-long-arrow-alt-up"></i>
                {{ SZStockIndex.change }}%
              </span>
              <span v-else class="text-success">
                <i class="fas fa-long-arrow-alt-down"></i>
                {{ SHStockIndex.change }}%
              </span>
              当日涨幅
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 3 minutes ago
            </div>
          </template>
        </chart-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          v-if="GEMStockIndex.load"
          :chart-data="GEMStockIndex.data"
          :chart-options="GEMStockIndex.options"
          :chart-type="'Line'"
          data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">创业指数</h4>
            <p class="category">
              <span v-if="GEMStockIndex.change > 0" class="text-danger">
                <i class="fas fa-long-arrow-alt-up"></i>
                {{ GEMStockIndex.change }}%
              </span>
              <span v-else class="text-success">
                <i class="fas fa-long-arrow-alt-down"></i>
                {{ GEMStockIndex.change }}%
              </span>
              当日涨幅
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              update 3 minutes ago
            </div>
          </template>
        </chart-card>
      </div>

      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>account_balance_wallet</md-icon>
          </template>

          <template slot="content">
            <p class="category">总资产</p>
            <h3 class="title">$34,245</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last 24 Hours
            </div>
          </template>
        </stats-card>
      </div>

      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>assessment</md-icon>
          </template>

          <template slot="content">
            <p class="category">监听股票数</p>
            <h3 class="title">5</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_offer</md-icon>
              Tracked from Github
            </div>
          </template>
        </stats-card>
      </div>

      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>attach_money</md-icon>
          </template>

          <template slot="content">
            <p class="category">累计收益</p>
            <h3 class="title">$245</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon class="text-danger">warning</md-icon>
              Get More Space...
            </div>
          </template>
        </stats-card>
      </div>

      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>create</md-icon>
          </template>

          <template slot="content">
            <p class="category">自定义策略数</p>
            <h3 class="title">0</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">交易中订单</h4>
            <p class="category">实时更新</p>
          </md-card-header>
          <md-card-content>
            <md-table
              v-model="orders"
              table-header-color="orange"
              class="md-scrollbar"
              style="max-height: 400px;overflow: auto;"
            >
              <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                <md-table-cell md-label="#">
                  {{ index }}
                </md-table-cell>
                <md-table-cell md-label="股票名">
                  {{ item.StockName }}
                </md-table-cell>
                <md-table-cell md-label="交易单价">
                  {{ item.Price }}
                </md-table-cell>
                <md-table-cell md-label="交易金额">
                  {{ item.Money }}
                </md-table-cell>
                <md-table-cell md-label="策略名">
                  {{ item.StrategyName.replace(/.*?_/, "") }}
                </md-table-cell>
                <md-table-cell md-label="创建时间">
                  {{ item.CreatedAt }}
                </md-table-cell>
                <md-table-cell md-label="更新时间">
                  {{ item.UpdatedAt }}
                </md-table-cell>
                <md-table-cell md-label="状态">
                  {{ item.State }}
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>

      <md-dialog :md-active.sync="startMonitorData.dialog">
        <md-dialog-title>参数设置</md-dialog-title>
        <div style="width: 80%;margin: 0px 10% 10px;">
          <md-field>
            <label>策略</label>
            <md-select
              v-if="strategiesLoad"
              v-model="startMonitorData.strategy_name"
            >
              <md-option
                v-for="(item, index) in strategies"
                :key="index"
                :value="item.Name"
              >
                {{ item.Name.replace(/.*?_/, "") }}
              </md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>监听频率</label>
            <md-select v-model="startMonitorData.monitor_freq">
              <md-option :value="1">1s</md-option>
              <md-option :value="5">5s</md-option>
              <md-option :value="10">10s</md-option>
              <md-option :value="30">30s</md-option>
              <md-option :value="60">1min</md-option>
              <md-option :value="5 * 60">5min</md-option>
              <md-option :value="10 * 60">10min</md-option>
              <md-option :value="30 * 60">30min</md-option>
              <md-option :value="60 * 60">1h</md-option>
              <md-option :value="2 * 60 * 60">2h</md-option>
              <md-option :value="5 * 60 * 60">5h</md-option>
              <md-option :value="10 * 60 * 60">10h</md-option>
              <md-option :value="24 * 60 * 60">1day</md-option>
              <md-option :value="7 * 24 * 60 * 60">7day</md-option>
            </md-select>
          </md-field>
        </div>
        <md-dialog-actions>
          <md-button class="md-raised" @click="startMonitorData.dialog = false">
            取消
          </md-button>
          <md-button class="md-primary" @click="startMonitor">
            确定
          </md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="finishMonitorData.dialog">
        <md-dialog-title>确定要停止监听吗？</md-dialog-title>
        <md-dialog-actions>
          <md-button
            class="md-raised"
            @click="finishMonitorData.dialog = false"
          >
            取消
          </md-button>
          <md-button class="md-primary" @click="finishMonitor">
            确定
          </md-button>
        </md-dialog-actions>
      </md-dialog>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title">股票:</span>
            <md-tabs class="md-success" md-alignment="left">
              <md-tab id="tab-home" md-label="全部" md-icon="account_balance">
                <md-table
                  v-model="stocks"
                  class="md-scrollbar"
                  style="max-height: 400px;overflow: auto;"
                >
                  <md-table-row
                    slot="md-table-row"
                    slot-scope="{ item, index }"
                  >
                    <md-table-cell>{{ item[0] }}</md-table-cell>
                    <md-table-cell>{{ item[1] }}</md-table-cell>
                    <md-table-cell>{{ item[2] }}</md-table-cell>
                    <md-table-cell>{{ item[3] }}</md-table-cell>
                    <md-table-cell>{{ item[4] }}</md-table-cell>
                    <md-table-cell>
                      <md-button
                        class="md-just-icon md-simple md-primary"
                        @click="
                          startMonitorData.stocksId = index;
                          startMonitorData.ts_code = item[0];
                          startMonitorData.dialog = true;
                          getStrategies();
                        "
                      >
                        <md-icon>add</md-icon>
                        <md-tooltip md-direction="top">添加监听</md-tooltip>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </md-tab>

              <md-tab id="tab-pages" md-label="已监听" md-icon="alarm_on">
                <md-table
                  v-model="monitoringStocks"
                  class="md-scrollbar"
                  style="max-height: 400px;overflow: auto;"
                >
                  <md-table-row
                    slot="md-table-row"
                    slot-scope="{ item, index }"
                  >
                    <md-table-cell>{{ item[0] }}</md-table-cell>
                    <md-table-cell>{{ item[1] }}</md-table-cell>
                    <md-table-cell>{{ item[2] }}</md-table-cell>
                    <md-table-cell>{{ item[3] }}</md-table-cell>
                    <md-table-cell>{{ item[4] }}</md-table-cell>
                    <md-table-cell>
                      <md-button
                        class="md-just-icon md-simple md-danger"
                        @click="
                          finishMonitorData.monitoringStocksId = index;
                          finishMonitorData.ts_code = item[0];
                          finishMonitorData.dialog = true;
                        "
                      >
                        <md-icon>close</md-icon>
                        <md-tooltip md-direction="top">取消监听</md-tooltip>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard, ChartCard, NavTabsCard } from "@/components";
import tushareApi from "@/api/tushare";
import newMonitorWS from "@/api/monitor";
import rspDataFilter from "@/api/rspDataFilter";
import { getMonitoringStocks as getMS } from "@/api/stock";
import { getStrategies as getStra } from "@/api/strategy";

export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard
  },
  data() {
    return {
      today: new Date().format("yyyyMMdd"),
      preDay: new Date(new Date().getTime() - 28 * 24 * 3600 * 1000).format(
        "yyyyMMdd"
      ),
      SHStockIndex: {
        load: false,
        change: 0,
        data: {
          labels: [],
          series: [[]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 2,
            right: 0,
            bottom: 0,
            left: 2
          }
        }
      },
      SZStockIndex: {
        load: false,
        change: 0,
        data: {
          labels: [],
          series: [[]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50,
          chartPadding: {
            top: 2,
            right: 0,
            bottom: 0,
            left: 2
          }
        }
      },
      GEMStockIndex: {
        load: false,
        change: 0,
        data: {
          labels: [],
          series: [[]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50,
          chartPadding: {
            top: 2,
            right: 2,
            bottom: 0,
            left: 2
          }
        }
      },
      orders: [],
      stocks: [],
      monitoringStocks: [],
      monitorWS: null,
      startMonitorData: {
        dialog: false,
        stocksId: 0,
        ts_code: "",
        strategy_name: "",
        monitor_freq: 0
      },
      finishMonitorData: {
        dialog: false,
        monitoringStocksId: 0,
        ts_code: ""
      },
      strategies: [],
      strategiesLoad: false
    };
  },
  methods: {
    handleStockItems(items, targetStockIndex) {
      let high = 0;
      let low = 100000;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (i == 0) targetStockIndex.change = item[8];
        if (item[5] < low) low = item[5];
        if (item[4] > high) high = item[4];
        if (i % 3 === 0) targetStockIndex.data.labels.push(item[1].slice(-2));
        else targetStockIndex.data.labels.push("");
        targetStockIndex.data.series[0].push(item[2]);
      }
      targetStockIndex.options.low = low - 50;
      targetStockIndex.options.high = high + 50;
      targetStockIndex.data.labels.reverse();
      targetStockIndex.data.series[0].reverse();
      targetStockIndex.load = true;
    },
    getSHSTockIndex() {
      let that = this;
      tushareApi("index_daily", {
        ts_code: "000001.SH",
        start_date: that.preDay,
        end_date: that.today
      })
        .then(function(response) {
          console.log(response.data.data);
          that.handleStockItems(response.data.data.items, that.SHStockIndex);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getSZSTockIndex() {
      let that = this;
      tushareApi("index_daily", {
        ts_code: "399001.SZ",
        start_date: that.preDay,
        end_date: that.today
      })
        .then(function(response) {
          console.log(response.data.data);
          that.handleStockItems(response.data.data.items, that.SZStockIndex);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getGEMSTockIndex() {
      let that = this;
      tushareApi("index_daily", {
        ts_code: "399006.SZ",
        start_date: that.preDay,
        end_date: that.today
      })
        .then(function(response) {
          console.log(response.data.data);
          that.handleStockItems(response.data.data.items, that.GEMStockIndex);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getStocks() {
      let that = this;
      tushareApi(
        "stock_basic",
        { list_status: "L" },
        "ts_code,name,area,industry,list_date"
      )
        .then(function(response) {
          console.log(response.data.data);
          that.stocks = response.data.data.items.slice(0, 100);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getMonitoringStocks() {
      let that = this;
      getMS()
        .then(function(response) {
          let stocks = response.data.data;
          console.log(stocks);
          for (let i = 0; i < stocks.length; i++) {
            tushareApi(
              "stock_basic",
              { ts_code: stocks[i].TsCode },
              "ts_code,name,area,industry,list_date"
            )
              .then(function(response) {
                that.monitoringStocks.push(response.data.data.items[0]);
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    initMonitorWS() {
      this.monitorWS = newMonitorWS(this.monitorWS_onmsg);
    },
    monitorWS_onmsg(rsp) {
      let data = JSON.parse(rsp.data);
      console.log("monitorWS response data:", data);
      if (rspDataFilter(data)) {
        if (data.data != null) this.orders.push(data.data);
      }
    },
    startMonitor() {
      console.log(this.startMonitorData);
      this.monitorWS.send(
        JSON.stringify({
          op: "startMonitor",
          ts_code: this.startMonitorData.ts_code,
          strategy_name: this.startMonitorData.strategy_name,
          monitor_freq: this.startMonitorData.monitor_freq
        })
      );
      this.startMonitorData.dialog = false;
      this.monitoringStocks.push(this.stocks[this.startMonitorData.stocksId]);
    },
    finishMonitor() {
      console.log(this.finishMonitorData);
      this.monitorWS.send(
        JSON.stringify({
          op: "finishMonitor",
          ts_code: this.finishMonitorData.ts_code
        })
      );
      this.finishMonitorData.dialog = false;
      this.monitoringStocks.splice(
        this.finishMonitorData.monitoringStocksId,
        1
      );
      console.log(this.monitoringStocks);
    },
    getStrategies() {
      let that = this;
      getStra()
        .then(function(resp) {
          that.strategies = resp.data.data;
          that.strategiesLoad = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getSHSTockIndex();
    this.getSZSTockIndex();
    this.getGEMSTockIndex();
    this.getStocks();
    this.getMonitoringStocks();
    this.initMonitorWS();
  }
};
</script>

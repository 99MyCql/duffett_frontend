<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-button class="md-success" @click="$router.push('/strategyEdit')">
          创建策略
        </md-button>
      </div>
    </div>
    <div class="md-layout">
      <md-dialog :md-active.sync="deleteDialog">
        <md-dialog-title>确定要删除吗？</md-dialog-title>
        <md-dialog-actions>
          <md-button class="md-raised" @click="deleteDialog = false">
            取消
          </md-button>
          <md-button
            class="md-primary"
            @click="
              deleteStrategy(item.ID);
              deleteDialog = false;
            "
          >
            确定
          </md-button>
        </md-dialog-actions>
      </md-dialog>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">策略列表</h4>
            <p class="category">非实时更新，如数据有误，请尝试手动刷新~~</p>
          </md-card-header>

          <md-card-content>
            <md-table
              v-model="strategies"
              table-header-color="orange"
              style="max-height: 600px;overflow: auto;"
            >
              <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                <md-table-cell md-label="#">{{ index }}</md-table-cell>
                <md-table-cell md-label="策略名">
                  {{ item.Name.replace(/.*?_/, "") }}
                </md-table-cell>
                <md-table-cell md-label="概述">{{ item.Desc }}</md-table-cell>
                <md-table-cell md-label="创建时间">
                  {{ new Date(item.CreatedAt).format("yyyy-MM-dd hh:mm:ss") }}
                </md-table-cell>
                <md-table-cell md-label="上次更新时间">
                  {{ new Date(item.UpdatedAt).format("yyyy-MM-dd hh:mm:ss") }}
                </md-table-cell>
                <md-table-cell md-label="操作">
                  <md-button class="md-info" @click="toStrategyEdit(item)">
                    查看/修改
                  </md-button>
                  <md-button class="md-danger" @click="deleteDialog = true">
                    删除
                  </md-button>
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
import { getStrategies as getS, delet } from "@/api/strategy";

export default {
  data() {
    return {
      strategies: [],
      deleteDialog: false
    };
  },
  methods: {
    getStrategies() {
      let that = this;
      getS()
        .then(function(response) {
          let strategies = response.data.data;
          console.log(strategies);
          that.strategies = strategies;
        })
        .catch(function(error) {});
    },
    toStrategyEdit(strategy) {
      this.$router.push({
        path: "StrategyEdit/",
        query: {
          strategy
        }
      });
    },
    deleteStrategy(strategyId) {
      let that = this;
      delet(strategyId)
        .then(function(resp) {
          that.getStrategies();
        })
        .catch();
    }
  },
  activated() {
    this.getStrategies();
  }
};
</script>

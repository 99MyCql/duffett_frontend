<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">交易记录</h4>
            <p class="category">非实时更新，如数据有误，请尝试手动刷新~~</p>
          </md-card-header>
          <md-card-content>
            <md-table
              v-model="orders"
              table-header-color="orange"
              style="max-height: 600px;overflow: auto;"
            >
              <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                <md-table-cell md-label="#">{{ index }}</md-table-cell>
                <md-table-cell md-label="交易金额(元)">
                  {{ item.money }}
                </md-table-cell>
                <!-- <md-table-cell md-label="单价(元)">{{ item.price }}</md-table-cell> -->
                <md-table-cell md-label="交易时间">
                  {{ new Date(item.created_at).format("yyyy-MM-dd hh:mm:ss") }}
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
import { getOrders as getO } from "@/api/order";

export default {
  props: ["stockId"],
  data() {
    return {
      orders: []
    };
  },
  methods: {
    getOrders() {
      let that = this;
      getO(that.stockId)
        .then(function(response) {
          let orders = response.data.data;
          console.log(orders);
          that.orders = orders;
        })
        .catch(function(error) {});
    }
  },
  activated() {
    this.getOrders();
  }
};
</script>

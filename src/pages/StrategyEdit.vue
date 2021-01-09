<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">策略编辑</h4>
            <p class="category">
              注：1.策略名和内容不能为空；2.策略名不能重复
            </p>
          </md-card-header>

          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>策略名</label>
                  <md-input
                    v-if="strategy.ID != null"
                    v-model="strategy.Name"
                    type="text"
                    disabled
                  ></md-input>
                  <md-input
                    v-else
                    v-model="strategy.Name"
                    type="text"
                  ></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>策略描述</label>
                  <md-input v-model="strategy.Desc" type="text"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-100">
                <label>策略内容</label>
                <span @click="tipDialog = true" style="cursor:pointer;">
                  <md-icon>error</md-icon>
                </span>
                <md-dialog-alert
                  :md-active.sync="tipDialog"
                  :md-content="tip"
                  md-confirm-text="明白了"
                />
                <codemirror
                  ref="goEditor"
                  :value="strategy.Content"
                  :options="editorOptions"
                  @input="onCodeChange"
                  style="height: 320px;"
                />
              </div>

              <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-raised md-info" @click="submit()">
                  提交测试
                </md-button>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>测试输入</label>
                  <md-input v-model="input" type="text" disabled></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>测试输出</label>
                  <md-textarea v-model="output" disabled></md-textarea>
                </md-field>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/go/go";
import "codemirror/addon/selection/active-line";
import "codemirror/keymap/sublime";
import "codemirror/mode/css/css";
import "codemirror/theme/idea.css";
import { create, update, testExec as testExecS } from "@/api/strategy";

export default {
  components: {
    codemirror
  },
  data() {
    return {
      strategy: {
        ID: null,
        Name: null,
        Desc: null,
        Content: ""
      },
      editorOptions: {
        tabSize: 4,
        mode: "text/x-go",
        theme: "idea",
        lineNumbers: true,
        line: true,
        styleActiveLine: true,
        matchBrackets: true
      },
      tipDialog: false,
      tip:
        '<h4><strong>描述：</strong></h4>\
        <p>输入股票代码 <code>tsCode</code>（字符串），进行策略计算后，需输出交易金额 <code>money</code>（<strong>不要携带换行符</strong>）。输出正浮点数表示买入，负浮点数表示卖出，<code>0</code>表示不交易。</p>\
        <p>无需导入库。已默认导入 <code>time</code>、<code>fmt</code>、<code>math/rand</code> 系统库，可直接使用。\
        <p>同时默认提供 <code>data</code> 库，包含如下函数：</p>\
        <p><code>func GetStockName(tsCode string) (string, error)</code> 通过 tsCode 获取股票名</p>\
        <p><code>func GetDailyData(tsCode string, tradeDate time.Time) (*DailyData, error)</code> 获取日线数据</p>\
        <p><code>func GetRealTimeData(tsCode string) (*RealTimeData, error)</code> 获取股票实时数据</p>\
        <h4><strong>输入输出示例：</strong></h4>\
        <pre><strong>输入：</strong>000001.SZ\n<strong>输出：</strong>47.10178409519226\n<strong>解释：</strong>买入 47.10178409519226 元</pre>\
        <h4><strong>代码示例：</strong></h4>\
        <pre><code>func main() {\n\tvar tsCode string\n\tvar ans float64\n\n\tfmt.Scanf("%s", &tsCode)\n\n\trealTime, err := data.GetRealTimeData(tsCode)\n\tif err != nil {\n\t\tfmt.Print(err)\n\t\treturn\n\t}\n\n\ttoday := time.Now()\n\tpreday := today.AddDate(0, 0, -4)\n\tyesterdayData, err := data.GetDailyData(tsCode, preday)\n\tif err != nil {\n\t\tfmt.Print(err)\n\t\treturn\n\t}\n\n\tif (realTime.CurPrice-yesterdayData.Close)/yesterdayData.Close >= 0.005 {\n\t\tans = -100\n\t} else if (realTime.CurPrice-yesterdayData.Close)/yesterdayData.Close <= -0.005 {\n\t\tans = 100\n\t} else {\n\t\tans = 0\n\t}\n\tfmt.Print(ans)\n}</code></pre>',
      input: "000001.SZ",
      output: ""
    };
  },
  methods: {
    onCodeChange(newCode) {
      this.strategy.Content = newCode;
    },
    submit() {
      let that = this;
      if (that.strategy.ID == null) {
        create(that.strategy.Name, that.strategy.Desc, that.strategy.Content)
          .then(function(rsp) {
            that.strategy = rsp.data.data;
            that.testExec();
          })
          .catch(function(error) {});
      } else {
        update(that.strategy.ID, that.strategy.Desc, that.strategy.Content)
          .then(function(rsp) {
            that.testExec();
          })
          .catch(function(error) {});
      }
    },
    testExec() {
      let that = this;
      testExecS(that.strategy.Name)
        .then(function(rsp) {
          that.output = rsp.data.data;
        })
        .catch(function(rsp) {
          if (rsp.data != undefined && rsp.data.msg != undefined)
            that.output = rsp.data.msg;
        });
    }
  },
  activated() {
    this.output = "";
    console.log("Strategy:", this.$route.query.strategy);
    if (this.$route.query.strategy == undefined)
      this.strategy = {
        ID: null,
        Name: null,
        Desc: null,
        Content: ""
      };
    else {
      this.strategy = this.$route.query.strategy;
      this.strategy.Name = this.strategy.Name.replace(/.*?_/, "");
    }
  }
};
</script>

(function () {

  var Graph = {

    /**
     * 初期処理
     * @method init
     */
    init: function () {
      this.setParams();
      this.bindEvent();
    },

    /**
     * パラメータ
     * @method setParams
     */
    setParams: function () {
      this.$plot = $('#plot');
      this.$server = $('#server');
      this.$chart_area = $('#chart-area');
    },

    /**
     * イベント
     * @method bintEvent
     */
    bindEvent: function () {
      this.$plot.on('click', $.proxy(this.clickPlotBtn, this));
    },

    /**
     * クリック
     * @method clickPlotBtn
     */
    clickPlotBtn: function () {
      var server = this.$server.val();

      this.getVoteData()
      .done($.proxy(function (d) {
        var votes = d.VOTES,
            series;

        series = this.createSeries(server, votes);

        this.drawChart(server, series);
      }, this));
    },
    /**
     * グラフ描画
     * @method drawChart
     * @param {String} server
     * @param {Array} series
     */
    drawChart: function (server, series) {
      var server_name;

      // サーバ名略称からサーバ名取得
      server_name = {
        ALL: '全サーバ',
        ZERN: 'ゼルナ',
        ELPH: 'エルフィンタ',
        MOEN: 'モエン',
        MIST: 'ミストラル',
        ROZE: 'ローゼンバーグ'
      }[server];

      this.$chart_area.highcharts({
        chart: {
          type: 'column',
          marginRight: 70
        },
        title: {
          text: 'オシャレ眼鏡決定戦投票数(' + server_name + ')'
        },
        tooltip: {
          valueSuffix: 'votes'
        },
        xAxis: {
          categories: ['Entry']
        },
        yAxis: {
          title: {
            text: 'Votes'
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          },
          point: {
            pointPadding: 0.25
          }
        },
        legend: {
          enabled: true,
          verticalAlign: 'top',
          layout: 'vertical',
          x: 500,
          y: 30,
          floating: true,
          borderWidth: 1,
          shadow: true
        },
        series: series
      });
    },

    /**
     * データ生成
     * @method createSeries
     * @param {string} server
     * @param {Array} votes
     */
    createSeries: function (server, votes) {
      var i = 0,
          len = votes.length,
          series = [],
          vote;

      for (; i < len; i += 1) {
        vote = votes[i];

        if (vote.Server === server) {
          series.push({
            name: vote.Name,
            data: [parseInt(vote.Vote, 10)]
          });
        } else if (server === 'ALL') {
          series.push({
            name: vote.Name,
            data: [parseInt(vote.Vote, 10)]
          });
        }
      }

      return series;
    },

    /**
     * 投票データの取得
     * @method getVoteData
     * @return {Array}
     */
    getVoteData: function () {
      return $.ajax({
        url: 'maxi_con20150607.json',
        type: 'GET',
        dataType: 'JSON'
      });
    },
  };

  $(function () {
    var g = Graph;

    g.init();

  });
}());

$(function () {

  getExpData()
  .done(function (data) {
    // データ整形
    var series = createSeriesData(data);

    $('#chart').highcharts({
      title: 'Count Stop Chart',
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'EXP'
        }
      },
      plotOptions: {
        line: {
          lineWidth: 1.3
        }
      },
      series: [{
        type: 'line',
        name: 'Exp Plan',
        data: series
      }]
    });
  })
  .fail(function () {
    alert('Error!');
  });


  /**
   * グラフデータ整形
   */
  function createSeriesData(data) {
    var i,
        ary = data.PLAN,
        tmp,
        exps = [],
        len = ary.length;

    for (i = 0; i < len; i += 1) {
      tmp = ary[i];

      exps.push([changeDateToUnixTime(tmp.DATE), parseInt(tmp.EXP)]);
    }

    return exps;
  }

  /**
   * データ取得
   */
  function getExpData() {
    return $.ajax({
      dataType: 'JSON',
      url: 'exp.json',
      type: 'GET'
    });
  }

  /**
   * ミリ秒を取得
   */
  function changeDateToUnixTime(date) {
    var d = new Date(date);

    return d.getTime();
  }
});

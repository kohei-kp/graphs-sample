$(function () {

  getExpData()
  .done(function (data) {
    // データ整形
    var series = createSeriesData(data);

    $('#chart').highcharts({
      title: {
        text:'Exp Chart'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        min: 0,
        title: {
          text: 'EXP'
        }
      },
      plotOptions: {
        line: {
          lineWidth: 1.3,
          marker: {
            radius: 3
          }
        }
      },
      series: [{
        type: 'line',
        name: 'Exp Plan',
        data: series.PLAN
      }, {
        type: 'line',
        name: 'Exp Reality',
        data: series.EXP
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
        tmp,
        obj = {},
        len,
        ary = [];

    $.each(data, function (key , val) {
      ary = [];
      len = val.length;

      for (i = 0; i < len; i += 1) {
        tmp = val[i];
        ary.push([changeDateToUnixTime(tmp.DATE), parseInt(tmp.EXP)]);
      }

      if (key === 'EXP_COUNT') {
        obj.EXP = ary;
      } else {
        obj.PLAN = ary;
      }
    });

    return obj;
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

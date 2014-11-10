$(function () {

  getExpData()
  .done(function (data) {
    // データ整形
    var series = createSeriesData(data);

    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });

    $('#chart').highcharts({
      chart: {
        zoomType: 'xy'
      },
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
        data: series.PLAN,
        zIndex: 1
      }, {
        type: 'line',
        name: 'Exp Reality',
        data: series.EXP,
        zIndex: 1
      }, {
        type: 'column',
        name: 'Daily EXP',
        data: series.BAR,
        color: '#7798BF',
        zIndex: 0
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
        ary = [],
        ary2 = [];

    $.each(data, function (key , val) {
      ary = [];
      ary2 = [];
      len = val.length,
      value = 0;

      for (i = 0; i < len; i += 1) {
        tmp = val[i];

        if (key === 'EXP_COUNT') {
          value += parseInt(tmp.EXP);
        } else {
          value = parseInt(tmp.EXP);
        }
        ary.push([changeDateToUnixTime(tmp.DATE), value]);
        ary2.push([changeDateToUnixTime(tmp.DATE), parseInt(tmp.EXP)]);
      }

      if (key === 'EXP_COUNT') {
        obj.EXP = ary;
        obj.BAR = ary2;

        setAvgAndRestExp(value, len);

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

  function setAvgAndRestExp(exp, days) {
    var max = 2039127154,
        avg,
        sub;

    sub = max - exp;
    avg = exp / days;
    rate = sub / avg;
    

    $('#rest').text(sub);
    $('#togo').text(Math.ceil(rate));
    $('#avg').text(Math.ceil(avg));
  }
});

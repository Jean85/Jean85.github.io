function loadChartPerformance() {
    var chart = AmCharts.makeChart("chart-performance", {
        "type": "serial",
        "startDuration": 1,
        "fontSize": 20,
        "fontFamily": 'Lato, sans-serif',
        "color": "#000000",
        "thousandsSeparator": ".",
        "creditsPosition": "top-right",
        "dataProvider": [{
            "category": "PHPUnit<br>(memory exausted)",
            "time": 331,
            "completed": 12,
            "remaining": 2428
        }, {
            "category": "Paraunit",
            "time": 366,
            "completed": 100
        }],
        "valueAxes": [{
            "axisColor": "#000000",
            "stackType": "regular",
            "axisThickness": 2,
            "axisAlpha": 0.7,
            "gridAlpha": 0,
            "maximum": 3000,
            "duration": "ss"
        }],
        "graphs": [{
            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'><b>[[value]]</b> secondi</span>",
            "fillAlphas": 0.8,
            "labelText": "[[value]] ([[completed]]%)",
            "lineAlpha": 0.3,
            "title": "Durata misurata",
            "type": "column",
            "valueField": "time",
            "lineColor": "#FF6600"
        }, {
            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'><b>[[value]]</b> secondi</span>",
            "labelText": "[[value]]",
            "lineAlpha": 0.3,
            "fillAlphas": 0.3,
            "title": "Durata rimanente stimata",
            "type": "column",
            "valueField": "remaining",
            "lineColor": "#FF6600"
        }],
        "categoryField": "category",
        "categoryAxis": {
            "color": "#000000",
            "gridPosition": "start",
            "axisAlpha": 0,
            "gridAlpha": 0,
            "position": "left"
        }
    });
}

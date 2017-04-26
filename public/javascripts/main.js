$(document).ready(function() {
    var chart1;
var jsonData = {

        "positive": ["p", "p", "p", "p", "p", "p", "p"],
        "negative": ["n", "n"]

        };
        var pos = jsonData.positive.length;
        
        var neg = jsonData.negative.length;

var url = "http://content.guardianapis.com/search?api-key=test";



    document.getElementById("clickMe").onclick = function draw() {
    //     $.ajax({
    //     url: url,
    //     dataType: 'json',
    //     type: 'get',
    //     cache: false,
    //     success: function(data) {
    //         $(data).each(function(index, value) {
    //             console.log(value.response.pages);
    //             // console.log(pos);
    //         });
    //     }
    // });
    $.getJSON(url, function(object) {
        data1.datasets[0].data[0] = object.response.total;
        // data2 = data1.datasets[0].data;
        data1.datasets[0].data[1] = object.response.pages;
        // data3 = data1.datasets[0].data = object.response.pages;
        // data1.datasets[0].labels = object.labels;
    chart1.update();
        console.log(data1.datasets[0].data[0], data1.datasets[0].data[1]);
        // document.getElementById("random").innerHTML = data2;

    });
    };


       $.ajax({
        url: url,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data) {
            $(data).each(function(index, value) {
                console.log(value.response);
                pos = value.response;
            });
            return pos;
        }
    });
// $("button").click(function() {
//   $.getJSON('http://localhost:3000/data.json', function(obj) {
//     $.each(obj, function(key, value) {
//         $('ul').append("<li>" + value + "</li>");
//     });
//     });
// });

    var ctx1 = $("#pie-chartcanvas-1");
    var ctx2 = $("#pie-chartcanvas-2"); 

    var data1 = {
        labels: ["Positive", "Negative"],
        datasets: [
            {
                label: "Positive and Negative",
                data: [pos, neg],
                backgroundColor: [
                    "#DEB887",
                    "#A9A9A9",
                    "#DC143C",
                    "#F4A460",
                    "#2E8B57"
                ],
                borderColor: [
                    "#CDA776",
                    "#989898",
                    "#CB252B",
                    "#E39371",
                    "#1D7A46"
                ],
                borderWidth: [1, 1, 1, 1, 1]
            }
        ]
    };  

   
    var options = {
        title: {
            display: true,
            position: "top",
            text: "Positive and Negative Pie Chart",
            fontSize: 18,
            fontColor: "#111"
        },
        legend: {
            display: true,
            position: "bottom"
        }
    };

    chart1 = new Chart(ctx1, {
        type: "pie",
        data: data1,
        options: options
    });
});

// const CHART = document.getElementById("lineChart");
// let lineChart = new Chart(CHART, {
//     type: 'line',
//     data: {
//     labels: ["Positive", "Negative"],
//     datasets: [
//         {
//             label: "My Second First dataset",
//             fill: true,
//             backgroundColor: "rgba(75,75,192,0.4)",
//             borderColor: "rgba(75,72,192,1)",
//             borderCapStyle: 'butt',
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: 'miter',
//             pointBorderColor: "rgba(75,72,192,1)",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "rgba(75,72,192,1)",
//             pointHoverBorderColor: "rgba(220,220,220,1)",
//             pointHoverBorderWidth: 2,
//             pointRadius: 1,
//             pointHitRadius: 10,
//             data: [100, 20],
//             spanGaps: false,
//         }
//     ]
//     }
// });

// $.ajax({
//    url: 'http://localhost:3000/data.json',
//    success: function (response) {
//         alert(response); //showing response is working
//         var datachart = JSON.parse(response);
//         var ctx2 = document.getElementById("chart-area2").getContext("2d");
//         window.myPie = new Chart(ctx2).Pie(datachart);
//    }
// });




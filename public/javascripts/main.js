$(document).ready(function() {

    var ctx1 = $("#pie-chartcanvas-1");
    var ctx2 = $("#pie-chartcanvas-2"); 

    var data1 = {
        labels: ["Positive", "Negative", "match3", "match4", "match5"],
        datasets: [
            {
                label: "Positive score",
                data: [1,10, 50, 25, 70, 40],
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

   var data2 = {
        labels: ["Positive", "Negative", "match3", "match4", "match5"],
        datasets: [
            {
                label: "Negative score",
                data: [-1, 35, 40, 60, 50],
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

    var chart1 = new Chart(ctx1, {
        type: "pie",
        data: data1,
        options: options
    });

    var chart2 = new Chart(ctx2, {
    type: "pie",
    data: data2,
    options: options
    });
});

const CHART = document.getElementById("lineChart");
let lineChart = new Chart(CHART, {
    type: 'line',
    data: {
    labels: ["Positive", "Negative"],
    datasets: [
        {
            label: "My Second First dataset",
            fill: true,
            backgroundColor: "rgba(75,75,192,0.4)",
            borderColor: "rgba(75,72,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,72,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,72,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [100, 20, 60, 20, 80, 55, 90],
            spanGaps: false,
        }
    ]
    }
});

$("button").click(function() {
    $.getJSON("data.json", function(obj) {
        $.each(obj, function(key, value) {
            $("ul").append("<li>"+value+"</li>");
        });
    });
});

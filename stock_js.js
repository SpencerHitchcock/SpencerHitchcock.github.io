
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}


function handleSubmit() {
  d3.event.preventDefault();
  var stock = d3.select("#stockInput").node().value;
  console.log(stock);
  d3.select("#stockInput").node().value = "";
  buildPlot(stock);
}

function buildPlot(stock) {
  var apiKey = "ise-Y7sc9_Xjpo2wM_j7"; //Please don't steal but it's cool because it's not connected to a credit card
  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

  d3.json(url).then(function(data) {
    var name = data.dataset.name;
    var stock = data.dataset.dataset_code;
    var startDate = data.dataset.start_date;
    var endDate = data.dataset.end_date;
    var dates = unpack(data.dataset.data, 0);
    var closingPrices = unpack(data.dataset.data, 1);
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];
    var layout = {
      title: `${stock} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
}

d3.select("#submit").on("click", handleSubmit);

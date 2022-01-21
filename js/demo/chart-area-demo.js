window.onload = function () { 
  verAccessToken(); 
};

let contar;  

function verAccessToken() {
  fetch('https://testeiaie.herokuapp.com/accessToken', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
  })
      .then(res => res.json())
      .then((out) => {
          console.log(out);
          let access_token = out.access_token;
          console.log(access_token);
          verRefreshToken();

          criarGrafico();
      })

      .catch(error => {
          console.log(error);
      });

};

function verRefreshToken() {
  fetch('https://testeiaie.herokuapp.com/refreshToken', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
  })
      .then(res => res.json())
      .then((out) => {
          console.log(out);
          let refresh_token = out.refresh_token;
      })
      .catch(error => {
          console.log(error);
      });
};

function criarGrafico() {
  
  fetch('https://testeiaie.herokuapp.com/countInvoices', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            contar = out.count;
            
        })

        .catch(error => {
            console.log(error);
        });

  let mes = ["December", "January", "February", "March", "April"];
  let chartdate = [];

  fetch('https://testeiaie.herokuapp.com/getAllInvoices', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
  })
      .then(res => res.json())
      .then((out) => {
          console.log(out);
          let allInvoices = out;


          let dateInvoice;
          let monthInvoice;
          let yearInvoice;

          let janeiro = 0;
          let fevereiro = 0;
          let março = 0;
          let abril = 0;
          let dezembro = 0;

          for (let i = 0; i < contar; i++) {

              dateInvoice = out[i].date;
              
              yearInvoice = dateInvoice.substring(0, 4);
              monthInvoice = dateInvoice.substring(5, 7);
              console.log("allInvoices " + allInvoices);
              console.log("dateInvoice " + dateInvoice);
              console.log("yearInvoice " + yearInvoice);
              console.log("monthInvoice " + monthInvoice);

              switch (monthInvoice) {
                  case "01": janeiro++;
                  break;
                  case "02": fevereiro++;
                  break;
                  case "03": março++;
                  break;
                  case "04": abril++;
                  break;
                  case "12": dezembro++;
                  break;
              }
          };
          console.log("dezembro" + dezembro);
          console.log("janeiro" + janeiro);

          chartdate.push(dezembro);
          chartdate.push(janeiro);
          chartdate.push(fevereiro);
          chartdate.push(março);
          chartdate.push(abril);

          // Set new default font family and font color to mimic Bootstrap's default styling
      Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
      Chart.defaults.global.defaultFontColor = '#a4a9ad';

      function number_format(number, decimals, dec_point, thousands_sep) {
         number = (number + '').replace(',', '').replace(' ', '');
        var n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
          dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
          s = '',
          toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
          };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
          s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
          s[1] = s[1] || '';
          s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
      }

      // Area Chart Example
      var ctx = document.getElementById("myAreaChart");
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: mes,
          datasets: [{
            label: "Invoices",
            lineTension: 0.3,
            backgroundColor: "#F4EBFF",
            borderColor: "#C799FF",
            pointRadius: 3,
            pointBackgroundColor: "#F4EBFF",
            pointBorderColor: "#C799FF",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "#F4EBFF",
            pointHoverBorderColor: "#C799FF",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: chartdate,
          }],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0
            }
          },
          scales: {
            xAxes: [{
              time: {
                unit: 'date'
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                maxTicksLimit: 4,
               
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }],
          },
          legend: {
            display: false
          },
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#a4a9ad",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
              label: function (tooltipItem, chart) {
                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ':' + number_format(tooltipItem.yLabel);
              }
            }
          }
        }
      });

      })


      .catch(error => {
          console.log(error);
      });
};

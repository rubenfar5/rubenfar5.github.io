window.onload = function () {
    verAccessToken();
}

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

function countProductsStocks() {
    verAccessToken();
    fetch('https://testeiaie.herokuapp.com/getAllProductsStocks', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let productStocks = out;
            let count = out.length;
            let totalstocks = 0;
            for( let i = 0; i < count; i++) {
                let quant = out[i].qty;
                totalstocks+=quant;
            }
            console.log(totalstocks);
            document.getElementById("countProductsStock").innerHTML = totalstocks;
        })
    };

    function countInvoices() {
        verAccessToken();
        fetch('https://testeiaie.herokuapp.com/countInvoices', {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
        })
            .then(res => res.json())
            .then((out) => {
                console.log(out);
               let contar = out.count;
                console.log("count " + contar);
                //document.getElementById("count").value = contar;
    
                document.getElementById("countInvoicesDashboard").innerHTML = contar;
    
            })
            
            .catch(error => {
                console.log(error);
            });
    
    };

    $('#Dashboard').click(function () {
        countProductsStocks();
        countInvoices();
    });
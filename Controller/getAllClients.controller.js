
window.onload = function () {
    verAccessToken();
    
}

let vat = 99;
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

function totalClients() {
    verAccessToken();
    fetch('https://testeiaie.herokuapp.com/totalClients', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let contar = out.count;
            console.log("count " + contar);
            document.getElementById("count").innerHTML = contar;

        })

        .catch(error => {
            console.log(error);
        });

};




function getAllClients() {
    verAccessToken();
    fetch('https://testeiaie.herokuapp.com/getAllClients', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let allClients = out;
            let i = 0;

            console.log(allClients);

            $('#dataTableAllClients').DataTable({
                language: {
                    "sEmptyTable": "Não foi encontrado nenhum registo",
                    "sLoadingRecords": "A carregar...",
                    "sProcessing": "A processar...",
                    "sLengthMenu": "Mostrar _MENU_ registos",
                    "sZeroRecords": "Não foram encontrados resultados",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                    "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                    "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                    "sInfoPostFix": "",
                    "sSearch": "Procurar:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "Primeiro",
                        "sPrevious": "Anterior",
                        "sNext": "Seguinte",
                        "sLast": "Último"
                    },
                    oAria: {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },

                data: out,
                columns: [
                    { data: 'customer_id', title: 'ID Customer' },
                    { data: 'name', title: 'Name' },
                    { data: 'vat', title: 'Vat' },
                    { data: 'address', title: 'Adress' },
                    { data: 'city', title: 'City' },
                    { data: 'zip_code', title: 'Zip-Code' },
                   
                    { data: 'email', title: 'Email' },

                ],
                columnDefs: [
                    { "className": "dt-center", "targets": "_all" }
                ],
            });
            $('#dataTableAllClients').DataTable().ajax.reload;
            var table = $('#dataTableAllClients').DataTable();


            //selecionar linha e marcar a mesma
            $('#dataTableAllClients').on('click', 'tr', function () {
                let index = table.row(this).index();
                vat = allClients[index].vat;

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        })

        .catch(error => {
            console.log(error);
        });
};

let city;


function getClientByVat() {
    verAccessToken();

    fetch('https://testeiaie.herokuapp.com/getClientByVat/ '+ vat, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    })
        .then(res => res.json())
    .then((out) => {
        console.log(out);
        let country = out[0].country.name;
        city = out[0].city;
        console.log(country);
        console.log(city);
        let rua = out[0].address;
        let codigoPostal = out[0].zip_code;
        verTempo();
        //criarPersonalMapa();
        localStorage.setItem("rua", rua);
        localStorage.setItem("zip", codigoPostal);
        localStorage.setItem("city", city);

        window.open
            ("./mapa.html");
    })
    .catch(error => {
        console.log(error);
    });
};

function verTempo() {
    let texto = '';
    let temperatura;
    let condicaoTempo;

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c26d596289b14907960cc61080070773&units=metric')
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            temperatura = out.main.temp;
            console.log(temperatura);
            condicaoTempo = out.weather[0].main;
            console.log(condicaoTempo);
            if (condicaoTempo == "Cloud") {
                texto = `<div class="card-body" style ="color: #ffff" >
            <i class="fas fa-cloud-sun"></i>
            <h3> Meteorology ${city} </h3>
            <p> Temperature : ${temperatura} °C </p>
            <p> Sky: ${condicaoTempo} </p>
            </div>`;
            } else if (condicaoTempo == "Clear") {

                texto = `<div class="card-body" style ="color: #ffff" >
                <i class="fas fa-cloud-sun"></i>
                <h3> Meteorology ${city} </h3>
                <p> Temperature : ${temperatura} °C </p>
                <p> Sky: ${condicaoTempo} </p>
                </div>`;

            } else {
                texto = `<div class="card-body" style ="color: #ffff" >
        
            <h3> Meteorology ${city} </h3>
            <p> Temperature : ${temperatura} °C </p>
            <p> Sky: ${condicaoTempo} </p>
            </div>`;

            }

            document.getElementById("meteorologia").innerHTML = texto;
        })
        .catch(error => {
            console.log(error);
        });


}

let arrayCidades = [];

function gerarDadosMapa() {
    verAccessToken();
    fetch('https://testeiaie.herokuapp.com/getAllClients', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            
            let allClients = out;

            for (let i = 0; i < allClients.length; i++) {
                arrayCidades.push(allClients[i].city);
            }

            console.log(arrayCidades);

            criarMapa();
        })
        .catch(error => {
            console.log(error);
        });
}

function criarMapa() {

    L.mapquest.key = 'GRs8Re7cuPxO3mMjN7uVZD7bK7epCcdQ';

     

    L.mapquest.geocoding().geocode(arrayCidades, createMap);

    function createMap(error, response) {
        // Initialize the Map
        var map = L.mapquest.map('map', {
            layers: L.mapquest.tileLayer('map'),
            center: [0, 0],
            zoom: 12
        });

        // Generate the feature group containing markers from the geocoded locations
        var featureGroup = generateMarkersFeatureGroup(response);

        // Add markers to the map and zoom to the features
        featureGroup.addTo(map);
        map.fitBounds(featureGroup.getBounds());
    }

    function generateMarkersFeatureGroup(response) {
        var group = [];
        for (var i = 0; i < response.results.length; i++) {
            var location = response.results[i].locations[0];
            var locationLatLng = location.latLng;

            // Create a marker for each location
            var marker = L.marker(locationLatLng, { icon: L.mapquest.icons.marker() })
                .bindPopup(location.adminArea5 + ', ' + location.adminArea3);

            group.push(marker);
        }
        return L.featureGroup(group);
    }

};

$('#btngetAll').click(function () {
    getAllClients();
    totalClients();
    gerarDadosMapa();
    
});

$('#btnMoreInformation').click(function () {
    if (vat == 99) {

        swal.fire({
            icon: "error",
            title: "Erro",
            text: "Selecione uma fatura"
        })
            .then(function () {
                window.location.href = "./getAllClients.html";
            })
    } else {

        getClientByVat();
        verTempo();
    }
});


import { verAccessToken } from './tokens.js';

window.onload = function () {
    verAccessToken();
}


let doc_id = 99;
let cust_id = 99;
let contar;
let pdfLink;


export function countInvoices() {
    verAccessToken();
    fetch('https://testeiaie.herokuapp.com/countInvoices', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            contar = out.count;
            console.log("count " + contar);
            document.getElementById("count").innerHTML = contar;


        })

        .catch(error => {
            console.log(error);
        });

};


let id_doc;
function getAllInvoices() {
    verAccessToken();
    fetch('https://testeiaie.herokuapp.com/getAllInvoices', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let allInvoices = out;
            console.log("allInvoices " + allInvoices);
            $('#dataTableAllInvoices').DataTable({
                language: {
                    "sEmptyTable": "Não foi encontrado nenhum registo",
                    "sLoadingRecords": "A carregar...",
                    "sProcessing": "A processar...",
                    "sLengthMenu": "Mostrar MENU registos",
                    "sZeroRecords": "Não foram encontrados resultados",

                    "sInfoFiltered": "(filtrado de MAX registos no total)",
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

                data: allInvoices,
                columns: [
                    { data: 'document_id', title: 'ID Document' },
                    { data: 'customer_id', title: 'ID Customer' },
                    { data: 'date', title: 'Date' },
                    { data: 'expiration_date', title: 'Expiration Date' },
                    { data: 'entity_number', title: 'Client Number' },
                    { data: 'entity_name', title: 'Client Name' },
                    { data: 'entity_vat', title: 'Client Vat' },
                    { data: 'entity_country', title: 'Client Country' },
                    { data: 'financial_discount', title: 'Financial Discount Vat' },
                    { data: 'gross_value', title: 'Gross Value' },
                    { data: 'net_value', title: 'Net Value' },
                    { data: 'status', title: 'Status' },
                ],
                columnDefs: [
                    { "className": "dt-center", "targets": "_all" }
                ],
            });

            var table = $('#dataTableAllInvoices').DataTable();


            //selecionar linha e marcar a mesma
            $('#dataTableAllInvoices').on('click', 'tr', function () {

                let index = table.row(this).index();
                doc_id = allInvoices[index].document_id;
                cust_id = allInvoices[index].customer_id;
                id_doc = allInvoices[index].document_id;

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




function getOneInvoice() {
    verAccessToken();
    const renderInvoice = document.getElementById("result");

    fetch('https://testeiaie.herokuapp.com/getOneInvoice/' + doc_id, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let OneInvoice = out;
            console.log("OneInvoice " + OneInvoice);

            let txt = "";
            txt += "<table class='table-responsive' style='width:100%'>";
            txt += "<thead style='color:grey'>";
            txt += "<tr><th>Document ID</th><th>Customer ID</th><th>Date</th><th>Expiration Date</th><th>Entity Number</th><th>Entity Name</th><th>Entity Vat</th><th>Entity Address</th><th>Entity City</th><th>Entity Country</th><th>Entity Zip Code</th><th>Financial Discount</th><th>Gross Value</th><th>Net Value</th><th>Status</th><th>Delivery Method Name</th><th>Delivery Date Time</th><th>Salesman Comission</th></tr></thead><tbody>";
            txt += "<tr><td style='text-align:right'>" + out.document_id + "</td><td>" + out.customer_id + "</td><td>" + out.date + out.expiration_date + "</td><td>" + out.entity_number + "</td><td>" + out.entity_name + "</td><td>" + out.entity_vat + "</td><td>" + out.entity_address + "</td><td>" + out.entity_city + "</td><td>" + out.entity_country + "</td><td>" + out.entity_zip_code + "</td><td>" + out.financial_discount + "</td><td>" + out.gross_value + "</td><td>" + out.net_value + "</td><td>" + out.status + "</td><td>" + out.delivery_method_name + "</td><td>" + out.delivery_datetime + "</td><td>" + out.salesman_commission + "</td></tr>";

            renderInvoice.innerHTML = txt;


        })

        .catch(error => {
            console.log(error);
        });
};




function getPDF() {
    verAccessToken();
    let texto = '';
    

    fetch('https://testeiaie.herokuapp.com/getPDF/' + id_doc, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            pdfLink = out.url;
            console.log(pdfLink);


            texto = `<a href=${pdfLink} target="_blank">Download your invoice here.</a>`;


            document.getElementById("tentativa").innerHTML = texto;
        })

        .catch(error => {
            console.log(error);
        });
};

function sendEmail() {
    verAccessToken();
    let texto = '';
    let mail;
    fetch('https://testeiaie.herokuapp.com/getAllClients', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {

            let conta = out.length;
            for (let i = 0; i < conta; i++) {

                let cust_email_id = out[i].customer_id;

                if (cust_id === cust_email_id) {
                    mail = out[i].email;

                }
            }
            
            Email.send({
                Host: "smtp.gmail.com",
                Username : "IAIE.G101.2022@gmail.com",
                Password : "Zebra123iaie",
                To : mail,
                From : "IAIE.G101.2022@gmail.com",
                Subject : "Invoice - IAIE",
                Body : "Hello!! " +' \n\ ' + "Here you can see your invoice:" +' \n\ ' + pdfLink  + ' \n\ ' + " Enjoy :)",
                }).then(
                    message => alert("mail sent successfully")
                );

                })

        .catch(error => {
            console.log(error);
        });
};



$('#btngetAllInvoices').click(function () {
    getAllInvoices();
    countInvoices();
    //getMonthInvoices();

});



$('#btnMoreInformation').click(function () {
    console.log(doc_id);
    if (doc_id == 99) {

        swal.fire({
            icon: "error",
            title: "Erro",
            text: "Selecione uma fatura"
        })
            .then(function () {
                window.location.href = "./getAllInvoices.html";
            })
    } else {

        getOneInvoice();
        getPDF();

    }
});

$('#btnSendEmail').click(function () {
    sendEmail();

});
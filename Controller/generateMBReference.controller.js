

import {verAccessToken} from './tokens.js';

window.onload = function () {
    verAccessToken();

}

let doc_id = "";
let net_value = "";


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
            console.log(allInvoices);
            $('#dataTableAllInvoices').DataTable({
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
                net_value = allInvoices[index].net_value;

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

$('#btngetAllInvoices').click(function () {
    getAllInvoices();
});

$('#btnGenerateMBReference').click(function () {

    verAccessToken();
    fetch('https://testeiaie.herokuapp.com/generateMBReference/' + doc_id + '/' + net_value, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let MBReference = out;
            console.log("MBReference " + MBReference);
           
            swal.fire({
                icon: "error",
                title: "Erro 422",
                text: "Option to generate MB reference is set but no payment provider is configurated."

                // text: out.message.pt
            }).then(function () {
                window.location.href = "./generateMBReference.html";
            })
        })

        .catch(error => {
            console.log(error);
        });
});

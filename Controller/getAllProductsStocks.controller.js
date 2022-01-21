import {verAccessToken} from './tokens.js';

window.onload = function () {
    verAccessToken();
}


function getAllProductsStocks() {
    verAccessToken();
    fetch('https://testeiaie.herokuapp.com/getAllProductsStocks', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let productStocks = out;
            console.log(productStocks);
            $('#dataTableAllProductsStocks').DataTable({            
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
                
                data: productStocks,
                columns: [
                    { data: 'product_stock_id', title: 'Product Stock ID ' },
                    { data: 'product_id', title: 'Product ID' },
                    { data: 'product.name', title: 'Name' },
                    { data: 'product.reference', title: 'Reference' },
                    { data: 'warehouse_id', title: 'Warehouse ID' },
                    { data: 'movement_date', title: 'Movement Date' },
                    { data: 'document_id', title: 'document ID' },
                    { data: 'qty', title: 'Quantity' },
                    { data: 'accumulated', title: 'Accumulated' },
                    { data: 'notes', title: 'Notes' },

                ],
                columnDefs: [
                    { "className": "dt-center", "targets": "_all" }
                ],
            });


        })

        .catch(error => {
            console.log(error);
        });
};




$('#getAllProductsStocks').click(function () {
    getAllProductsStocks();
});


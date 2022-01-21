
import {verAccessToken} from './tokens.js';

window.onload = function () {
    verAccessToken();
  
}

let id = 99;

function countProducts() {
    fetch('https://testeiaie.herokuapp.com/countProducts', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let contar = out.count;
            console.log(contar);
            document.getElementById("countProducts").innerHTML = contar;

        })

        .catch(error => {
            console.log(error);
        });

};

function getAll() {
    verAccessToken();
    fetch('https://testeiaie.herokuapp.com/getAll', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let allProducts = out;
            console.log(allProducts);
            $('#dataTableAllProducts').DataTable({            
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
                
                data: allProducts,
                columns: [
                    { data: 'product_id', title: 'ID Product' },
                    { data: 'stock', title: 'Stock' },
                    { data: 'created', title: 'Created' },
                    { data: 'category_id', title: 'Category_id' },
                    { data: 'type', title: 'Type' },
                    { data: 'name', title: 'Name' },
                    { data: 'summary', title: 'Summary' },
                    { data: 'price', title: 'Price' },

                ],
                columnDefs: [
                    { "className": "dt-center", "targets": "_all" }
                ],
            });

            console.log("helooooo")
            var table = $('#dataTableAllProducts').DataTable();
            

            //selecionar linha e marcar a mesma
            $('#dataTableAllProducts').on('click', 'tr', function () {
                let index = table.row(this).index();
                id = allProducts[index].product_id;

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


function getOneProduct() {
    verAccessToken();
    const renderInvoice = document.getElementById("result"); 
 
     fetch('https://testeiaie.herokuapp.com/getOneProduct/' + id , {
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
     })
         .then(res => res.json())
         .then((out) => {
             console.log(out);
             let OneProduct = out;
             console.log("OneProduct " + OneProduct);
 
             let txt = "";
            out.suppliers[1]
             txt += "<table class='table-responsive' style='width:100%'>";
             txt += "<thead style='color:grey'>";
             txt += "<tr><th>Reference</th><th>Unit ID</th><th>Minimum Stock</th><th>Category ID</th><th>Category Name</th><th>Supplier ID</th><th>Supplier Cost Price</th><th>Supplier Comercial Discount</th><th>Supplier Financial Discount</th><th>Supplier Cost Price Discounted</th></tr></thead><tbody>";
             txt += "<tr><td style='text-align:right'>" + out.reference + "</td><td>" + out.unit_id + "</td><td>" + out.has_stock + out.minimum_stock + "</td><td>" + out.category.category_id + "</td><td>" +  out.category.name  + "</td><td>" +   out.suppliers[0].supplier_id + "</td><td>" + out.suppliers[0].cost_price + "</td><td>" + out.suppliers[0].comercial_discount   + "</td><td>" +  out.suppliers[0].financial_discount  + "</td><td>" +  out.suppliers[0].cost_price_discounted+ "</td></tr>"; 
 
             renderInvoice.innerHTML = txt; 
 
            
             superHeroes['members'][1]['powers'][2]
 
         })
 
         .catch(error => {
             console.log(error);
         });
 };


$('#btngetAll').click(function () {
    getAll();
    countProducts();

});

$('#btnMoreInformation').click(function () {
    if (id == 99) {

        swal.fire({
            icon: "error",
            title: "Erro",
            text: "Selecione uma fatura"
        })
            .then(function () {
                window.location.href = "./getAll.html";
            })
    } else {

    getOneProduct();

    }
       
});
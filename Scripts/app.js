var Operadora = [];
var ServicosPorOperadora = [];
var Cliente = [];
var Contas = [];

$(document).ready(function () {			 
    $('.sidenav').sidenav();
    $('.modal').modal();
    $('.tooltipped').tooltip();
    $('select').formSelect();
    $('.collapsible').collapsible();

    GetTabelaOperadoras();
    GetTabelaServicos();
    GetTabelaCliente();
    GetTabelaContas();

    $('#select-operadora-cliente').change(function () {
        $('#select-servico-cliente').html("");

        var value = $(this).val();
        const result = ServicosPorOperadora.filter((op) => op.Operadora == value);

        for(var i = 0; i < result.length; i++){           
            $('#select-servico-cliente').append($('<option>', {
                value: result[i].Nome,
                text: result[i].Nome
            }));
        }

        $('#select-servico-cliente').formSelect();
    });
});


function SalvarOperadora(){
    const valor = $("#text-operadora").val();    

    $('#select-operadora').append($('<option>', {
        value: valor,
        text: valor
    }));
    $('#select-operadora-cliente').append($('<option>', {
        value: valor,
        text: valor
    }));

    $('#select-operadora').formSelect();
    $('#select-operadora-cliente').formSelect();

    alert('Operadora incluida com sucesso!\nVisualize-a em Cadastro de Serviço.');
    $("#text-operadora").val("");

    //Save LocalStorage
    Operadora.push(valor);
    localStorage.setItem("TblOperadora", JSON.stringify(Operadora));
}

function SalvarServico(){

    var servico = {
        Nome: $("#text-servico").val(),
        Operadora: $("#select-operadora").val()
    }

    alert('Serviço incluido com sucesso!\nVisualize-a em Vínculo Operadora e Cliente.');
    $("#text-servico").val("");

    //Save LocalStorage
    ServicosPorOperadora.push(servico);
    localStorage.setItem("TblServicos", JSON.stringify(ServicosPorOperadora));

}

function SalvarCliente(){
    const valor = ($("#text-cnpj").val() + " - " + $("#text-fantasia").val());
    $('#select-cliente').append($('<option>', {
        value: valor,
        text: valor
    }));
    $('#select-cliente').formSelect();

    alert('Cliente incluido com sucesso!\nVisualize-a em Vínculo Operadora e Cliente.');
    $(".cliente").val("");

    //Save LocalStorage
    Cliente.push(valor);
    localStorage.setItem("TblClientes", JSON.stringify(Cliente));
}

function SalvarConta(){
    var conta = {   
        operadora: $("#select-operadora-cliente").val(),
        servico: $("#select-servico-cliente").val(),
        cliente: $("#select-cliente").val(), 

        url: $("#input-url").val(),
        login: $("#input-login").val(), 
        senha: $("#input-senha").val(), 
        conta: $("#input-conta").val() 
    }

    $("#input-url").val("");
    $("#input-login").val("");
    $("#input-senha").val("");
    $("#input-conta").val("");

    $("#table-contas-salvas").append(
        '<tr>' +
            '<td>' + conta.cliente + '</td>' +
            '<td>' + conta.conta + '</td>' +
            '<td>' + conta.operadora + '</td>' +
            '<td>' + conta.servico + '</td>' +
            '<td>' + conta.url + '</td>' +
            '<td>' + conta.login + '</td>' +
            '<td>' + '*********' + '</td>' +
        '</tr>'                                                            
    );

    //Save LocalStorage
    Contas.push(conta);
    localStorage.setItem("TblContas", JSON.stringify(Contas));
}

function GetTabelaOperadoras(){
    //Recupera os dados armazenados
    var tbOperadoras = localStorage.getItem("TblOperadora");
    
    // Caso não haja conteúdo, iniciamos um vetor vazio
    if(tbOperadoras == null) 
        Operadora = [];
    else
    {
         // Converte string para objeto
        tbOperadoras = JSON.parse(tbOperadoras); 

        for(var i = 0; i < tbOperadoras.length; i++){           
            $('#select-operadora').append($('<option>', {
                value: tbOperadoras[i],
                text: tbOperadoras[i]
            }));

            $('#select-operadora-cliente').append($('<option>', {
                value: tbOperadoras[i],
                text: tbOperadoras[i]
            }));

            $('#select-operadora').formSelect();
            $('#select-operadora-cliente').formSelect();
        }
    }
}

function GetTabelaServicos(){
    //Recupera os dados armazenados
    var tbServicos = localStorage.getItem("TblServicos");
    
    // Caso não haja conteúdo, iniciamos um vetor vazio
    if(tbServicos == null) 
        ServicosPorOperadora = [];
    else
    {
        // Converte string para objeto
        tbServicos = JSON.parse(tbServicos); 
        ServicosPorOperadora = tbServicos;
    }
}

function GetTabelaCliente(){
    //Recupera os dados armazenados
    var tbClientes = localStorage.getItem("TblClientes");
    
    // Caso não haja conteúdo, iniciamos um vetor vazio
    if(tbClientes == null) 
        Cliente = [];   
    else
    {
        // Converte string para objeto
        tbClientes = JSON.parse(tbClientes); 

        for(var i = 0; i < tbClientes.length; i++){           
            $('#select-cliente').append($('<option>', {
                value: tbClientes[i],
                text: tbClientes[i]
            }));

            $('#select-cliente').formSelect();
        }
    }
}

function GetTabelaContas(){
    //Recupera os dados armazenados
    var tbContas = localStorage.getItem("TblContas");
    
    // Caso não haja conteúdo, iniciamos um vetor vazio
    if(tbContas == null) 
        Contas = [];   
    else
    {
        // Converte string para objeto
        tbContas = JSON.parse(tbContas); 
        
        if(tbContas.length > 10){
            //Limpar a mémoria
            localStorage.clear(); 
        }
        else{
            for(var i = 0; i < tbContas.length; i++){           
                $("#table-contas-salvas").append(
                    '<tr>' +
                        '<td>' + tbContas[i].cliente + '</td>' +
                        '<td>' + tbContas[i].conta + '</td>' +
                        '<td>' + tbContas[i].operadora + '</td>' +
                        '<td>' + tbContas[i].servico + '</td>' +
                        '<td>' + tbContas[i].url + '</td>' +
                        '<td>' + tbContas[i].login + '</td>' +
                        '<td>' + '*********' + '</td>' +
                    '</tr>'                                                            
                );
            } 
        }
    }            
}
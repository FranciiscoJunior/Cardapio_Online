$(document).ready(function(){
    cardapio.eventos.init();
});

var cardapio = {};

cardapio.eventos = {
    init: () =>{

        cardapio.metodos.obterItensCardapio();
    }
}


cardapio.metodos = {

    // obtem a lista do cardapio

    obterItensCardapio: () =>{
        var filtro - MENU ['burgers'];
        console.log(filtro);

        $.each(filtro, (i, e) =>{
            let - cardapio.templates.item;

            $("#itensCardapio").append(temp)
        })
    },
}

cardapio.templates = {

    item: 

                        <div class="col-3 mb-5">
                            <div class="card card-item">
                                <div class="img-produto">
                                    <img src="/img/cardapio/burguers/burger-au-poivre-kit-4-pack.3ca0e39b02db753304cd185638dad518.jpg">
                                </div>
                                <p class="title-produto text-center mt-4">
                                    <b>Nome do produto muito grande</b>
                                </p>
                                <p class="price-produto text-center">
                                    <b>154,90</b>
                                </p>

                                <div class="add-carrinho">
                                    <span class="btn btn-menos"><i class="fas fa-minus"></i></span>
                                    <span class="btn btn-numero-itens">0</span>
                                    <span class="btn btn-mais"><i class="fas fa-plus"></i></span>
                                    <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>
                                </div>
                            </div>
                        </div>
}
$(document).ready(function(){
    cardapio.eventos.init();
})

var cardapio = {};

var MEU_CARRINHO = [];

cardapio.eventos = {
    init: () =>{
        cardapio.metodos.obterItensCardapio();
    }
}

cardapio.metodos = {
    // obtem a lista do cardapio
    obterItensCardapio: (categoria = 'burgers', vermais = false) =>{
        var filtro = MENU [categoria];
        console.log(filtro);

        if(!vermais){
            $("#itensCardapio").html('');
            $("#btnVerMais").removeClass('hidden');
        }

        $.each(filtro, (i, e) =>{

            let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
            .replace(/\${nome}/g, e.name)
            .replace(/\${preco}/g, e.price.toFixed(2).replace('.',','))
            .replace(/\${id}/g, e.id)

            //Botão ver mais acionado (12 itens).
            if(vermais && i== 8 && i < 12){
                $("#itensCardapio").append(temp)
            }
            //Paginação inicial, carregando (8 itens).
            if(!vermais && i < 8){
                $("#itensCardapio").append(temp)
            }
        })

        //Remove o ativo
        $(".container-menu a").removeClass('active');

        // Seta o menu para ativo

        $("#menu-" + categoria).addClass('active')
    },

    //Clicando no botão vermais
    vermais: () =>{
        var ativo = $(".container-menu a.active").attr('id').split('menu-')[1]; //[menu-][burguers]
        cardapio.metodos.obterItensCardapio(ativo, true)

        $("#btnVerMais").addClass('hidden');
    },

    //Botão diminuir quantidade de itens do cardapio
    diminuirQuantidade: (id) => {
        let qntdAtual = parseInt($("#qntd-" + id).txt());

        if (qntdAtual > 0){
            ($("#qntd-" + id).txt(qntdAtual - 1))
        }
    },

    //Botão aumentar quantidade de itens do cardapio
    aumentarQuantidade: (id) => {
        let qntdAtual = parseInt($("#qntd-" + id).txt());
        ($("#qntd-" + id).txt(qntdAtual + 1))
    },

    //Pegar item do cardápio e adicionar ao carrinho
    adiconarAoCarrinho: (id) =>{
        let qntdAtual = parseInt($("#qntd-" + id).txt());

        if (qntdAtual > 0){

            //Obtendo a categoria ativa
            var categoria = $(".container-menu a.active").attr('id').split('menu-')[1];

            //Obtendo a lista do menu com itens

            let filtro = MENU [categoria];

            //Obtendo item
            let item = $.grep (filtro, (e, i) => {return e.id == id});

            if (item.lenght > 0){

                //Validação caso já haja item no carrinho
                let existe = $.grep (MEU_CARRINHO, (elem, index) => {return elem.id == id});

                //Quando existir itens no carrinho, epnas altera a quantidade.
                if (existe.lenght > 0){
                    let objIndex = MEU_CARRINHO.findIndex ((obj => obj.id == id))
                    MEU_CARRINHO[objIndex].qntd = MEU_CARRINHO[objIndex].qntd + qntdAtual;
                }

                //Quando não existir nehum item no carrinho apenas adicione.
                else {
                    item[0].qntd = qntdAtual;
                    MEU_CARRINHO.push(item[0])
                }
            }
        }
    },
}

cardapio.templates = {
    item: `
                        <div class="col-3 mb-5">
                            <div class="card card-item" id="\${id}">
                                <div class="img-produto">
                                    <img src="\${img}">
                                </div>
                                <p class="title-produto text-center mt-4">
                                    <b>\${nome}</b>
                                </p>
                                <p class="price-produto text-center">
                                    <b>R$ \${preco}</b>
                                </p>

                                <div class="add-carrinho">
                                    <span class="btn btn-menos" onclick="cardapio.metodos.diminuirQuantidade('\${id}')"><i class="fas fa-minus"></i></span>
                                    <span class="btn btn-numero-itens" id="qntd-\${id}">0</span>
                                    <span class="btn btn-mais" onclick="cardapio.metodos.aumentarQuantidade('\${id}')"><i class="fas fa-plus"></i></span>
                                    <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>
                                </div>
                            </div>
                        </div>
        `
}

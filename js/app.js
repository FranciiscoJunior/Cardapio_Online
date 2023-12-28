    $(document).ready(function(){
    cardapio.eventos.init();
})

var cardapio = {};

var MEU_CARRINHO = [];

// Inicializando itens do cardapio
cardapio.eventos = {
    init: () =>{
        cardapio.metodos.obterItensCardapio();
    }
}

cardapio.metodos = {
    // obtem a lista de itens do cardapio
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
            if(vermais && i>= 8 && i < 12){
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

    //Clicando no botão vermais, para aparecer outros quatro itens do menu
    vermais: () => {
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
    adiconarAoCarrinho: (id) => {
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

                //Quando existir itens no carrinho, apenas altera a quantidade.
                if (existe.lenght > 0){
                    let objIndex = MEU_CARRINHO.findIndex ((obj => obj.id == id))
                    MEU_CARRINHO[objIndex].qntd = MEU_CARRINHO[objIndex].qntd + qntdAtual;
                }

                //Quando não existir nehum item no carrinho apenas adicione.
                else {
                    item[0].qntd = qntdAtual;
                    MEU_CARRINHO.push(item[0])
                }

                cardapio.metodos.mensagem('Item adicionado ao carrinho', 'green');
                $("#qntd-" + id).txt(0);

                cardapio.metodos.atualizarBadgeTotal();
            }
        }
    },

    //Atualizar o badge total dos botões do carrinho: "Meu carrinho"
    atualizaBadgeTotal: () => {

        var total = 0;

        $.each(MEU_CARRINHO, (i, e) => {
            total += e.qntd
        })

        //Caso exista algum item no carrinho remova a classe hidden
        if (total > 0){
            $("botao-carrinho").removeClass('hidden')
            $("container-total-carrinho").removeClass('hidden')
        }

        else {
            $("botao-carrinho").addClass('hidden')
            $("container-total-carrinho").addClass('hidden')
        }

        $(".badge-total-carrinho").html('total');

    },

    //Abrindo a modal de adicionar itens ao carrinho.
    abrirCarrinho: (abrir) =>{

        if(abrir){
            $("#modalCarrinho").removeClass('hidden');
            cardapio.metodos.carregarCarrinho();
        }

        else {
            $("#modalCarrinho").addClass('hidden');
        }
    },

    //Alterando os textos e exibindo botões das etapas
    carregarEtapa: (etapa) =>{
        if (etapa == 1) {
            $("#lblTituloEntrega").text('seu carrinho:');
            $("#itensCarrinho").removeClass('hidden');
            $("#localEntrega").addClass('hidden');
            $("#resumoCarrinho").addClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa1").addClass('active');

            $("#btnEtapaPedido").removeClass('hidden');
            $("#btnEtapaEndereco").addClass('hidden');
            $("#btnEtapaResumo").addClass('hidden');
            $("#btnVoltar").addClass('hidden');
        }

        if (etapa == 2) {
            $("#lblTituloEntrega").text('Endereco de entrega:');
            $("#itensCarrinho").addClass('hidden');
            $("#localEntrega").removeClass('hidden');
            $("#resumoCarrinho").addClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa1").addClass('active');
            $(".etapa2").addClass('active');

            $("#btnEtapaPedido").addClass('hidden');
            $("#btnEtapaEndereco").removeClass('hidden');
            $("#btnEtapaResumo").addClass('hidden');
            $("#btnVoltar").removeClass('hidden');
        }

        if (etapa == 3) {
            $("#lblTituloEntrega").text('Resumo do pedido:');
            $("#itensCarrinho").addClass('hidden');
            $("#localEntrega").addClass('hidden');
            $("#resumoCarrinho").removeClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa1").addClass('active');
            $(".etapa2").addClass('active');
            $(".etapa3").addClass('active');

            $("#btnEtapaPedido").addClass('hidden');
            $("#btnEtapaEndereco").addClass('hidden');
            $("#btnEtapaResumo").removeClass('hidden');
            $("#btnVoltar").removeClass('hidden');
        }
    },

    //Acionando o botão voltar etapa
    voltarEtapa: () => {
        let etapa = $(".etapa.active").lenght;
        cardapio.metodos.carregarEtapa(etapa - 1);
    },


    //Carregar lista de itens adicionado no carrinho
    carregarCarrinho: () =>{

    cardapio.metodos.carregarEtapa(1);

    if (MEU_CARRINHO.length > 0){

        $("#itensCarrinho").html('');

        $.each(MEU_CARRINHO, (i, e) => {
            let temp = cardapio.templates.itemCarrinho.replace(/\${img}/g, e.img)
            .replace(/\${img}/g, e.name)
            .replace(/\${preco}/g, e.price.toFixed(2).replace('.', ','))
            .replace(/\${id}/g, e.id)
            .replace(/\${qntd}/g, e.qntd)

            $("#itensCarrinho").append(temp);
        })
    }

    else{
        $("#itensCarrinho").html('<p class"carrinho-vazio"><i class="fa fa-shopping-bag></i>Seu carrinho está vazio</p>');
    }

    },

    //Diminuindo quantidade total de itens no carrinho
    diminuirQuantidadeCarrinho: (id) =>{

        let qntdAtual = parseInt($("#qntd-carrinho-" + id).txt());

        if (qntdAtual > 1){
            ($("#qntd-carrinho-" + id).txt(qntdAtual - 1))
            cardapio.metodos.atualizarCarrinho(id, qntdAtual - 1);
        }

        else{
            cardapio.metodos.removerItemCarrinho(id)
        }
    },

    //Aumentando a quantidade total de itens no carrinho
    aumentarQuantidadeCarrinho: (id) => {
        let qntdAtual = parseInt($("#qntd-carrinho-" + id).txt());
        ($("#qntd-carrinho-" + id).txt(qntdAtual + 1))
        cardapio.metodos.atualizarCarrinho(id, qntdAtual + 1);
    },

    //Botão de remoção de itens do carrinho
    removerItemCarrinho: (id) => {
        MEU_CARRINHO = $.grep(MEU_CARRINHO, (e, i) => { return e.id != id});
        cardapio.metodos.carregarCarrinho();

        //Atualizando a quantidade total de itens adicionado
        cardapio.metodos.atualizaBadgeTotal();
    },

    //Atualizando carrinho com a quantidade atual de itens
    atualizarCarrinho: (id, qntd) =>{

        let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id));
        MEU_CARRINHO[objIndex].qntd = qntd;

        //Atualizando a quantidade total de itens adicionado
        cardapio.metodos.atualizaBadgeTotal();
    },

    //Botão que cria o metódo de alerta de mensagem, que imprime o alerta ao adicionar um item no carrinho.
    mensagem: (texto, cor = 'red', tempo = 3500) => {

        let id = math.floor (Date.now() * Math.random()).toString();

        let msg = `<div id="msg-${id}" class="animated fadeInDown toast $ {cor}">${texto}</div>`

        $("#container-mensagem").append(msg);

        setTimeout(() =>{
            $("#msg-" + id).removeClass('fadeInDown');
            $("#msg-" + id).addClass('fadeOutUp');
            setTimeout(() => {
                $("#msg-" + id).remove();
            }, 800);
        }, tempo)
    }
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
                                    <span class="btn btn-add" onclick="cardapio.metodos.adicionarAoCarrinho('\${id}')"><i class="fa fa-shopping-bag"></i></span>
                                </div>
                            </div>
                        </div>
        `,

        itemCarrinho: `
                <div class="col-12 item-carrinho">
                <div class="img-produto">
                    <img src="\${img}"/>
                </div>
                <div class="dados-produto">
                    <p class="title-produto"><b>\${nome}</b></p>
                    <p class="price-produto"><b>\${preco}</b></p>
                </div>
                <div class="add-carrinho">
                <span class="btn btn-menos" onclick="cardapio.metodos.diminuirQuantidadeCarrinho('\${id}')"><i class="fas fa-minus"></i></span>
                <span class="btn btn-numero-itens" id="qntd-carrinho\${id}">\${qntd}</span>
                <span class="btn btn-mais" onclick="cardapio.metodos.aumentarQuantidadeCarrinho('\${id}')"><i class="fas fa-plus"></i></span>
                    <span class="btn btn-remove" onclick="cardapio.metodos.removerItemCarrinho('\${id}')"><i class="fa fa-times"></i></span>
                </div>
            </div>
        `
}
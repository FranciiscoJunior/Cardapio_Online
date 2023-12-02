$(document).ready(function(){
    cardapio.eventos.init();
})

var cardapio = {};

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

            //Botão ver mais acionado (12 itens).
            if(vermais && i >= 8 && i < 12){
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

}

cardapio.templates = {
    item: '
                        <div class="col-3 mb-5">
                            <div class="card card-item">
                                <div class="img-produto">
                                    <img src="\${img}/">
                                </div>
                                <p class="title-produto text-center mt-4">
                                    <b>\${nome}</b>
                                </p>
                                <p class="price-produto text-center">
                                    <b>R$ \${preco}</b>
                                </p>

                                <div class="add-carrinho">
                                    <span class="btn btn-menos"><i class="fas fa-minus"></i></span>
                                    <span class="btn btn-numero-itens">0</span>
                                    <span class="btn btn-mais"><i class="fas fa-plus"></i></span>
                                    <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>
                                </div>
                            </div>
                        </div>
        '
}
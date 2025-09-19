let dadosEstados = [];

// Carregando os dados do JSON de forma assíncrona
async function carregarEstados() {
    try {
        const resposta = await fetch('estados.json');
        dadosEstados = await resposta.json();

        const selectEstado = document.getElementById('estado');

    // Preenche o select de estados
        dadosEstados.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.estado;
            option.textContent = estado.nome;
            selectEstado.appendChild(option);
        });

    // Adiciona evento para quando o estado for alterado
        selectEstado.addEventListener('change', function () {
            const estadoSelecionado = this.value;
            atualizarCidades(estadoSelecionado);
        });

    } catch (erro) {
        console.error('Erro ao carregar os estados:', erro);
    }
}

// Atualiza o select de cidades conforme o estado selecionado
function atualizarCidades(estadoSelecionado) {
    const selectCidade = document.getElementById('cidade');
    selectCidade.innerHTML = '<option value="">Selecione uma cidade</option>';

const estado = dadosEstados.find(e => e.estado === estadoSelecionado);
        if (estado) {
            estado.cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade;
            option.textContent = cidade;
            selectCidade.appendChild(option);
        });
    }
}

// Inicia o carregamento ao abrir a página
carregarEstados();
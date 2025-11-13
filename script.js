document.addEventListener('DOMContentLoaded', () => {
    const botaoGerar = document.getElementById('btn-gerar');
    const areaResultado = document.getElementById('resultado');

    // 👇 NOVOS SELETORES DE ELEMENTO
    const jogoCards = document.querySelectorAll('.jogo-card'); 
    const botaoLimpar = document.getElementById('btn-limpar');
    const botaoTemaBlack = document.getElementById('tema-black');
    const body = document.body;

    // Variável para rastrear o jogo selecionado
    // Inicializa com o valor 'data-jogo' do botão que tem a classe 'active' no HTML (Mega-Sena)
    // O operador '?.dataset.jogo || 'mega-sena' garante um valor padrão seguro
    let jogoAtual = document.querySelector('.jogo-card.active')?.dataset.jogo || 'mega-sena';
    
    // 👆 LINHA REMOVIDA: const seletorJogo = document.getElementById('tipo-jogo');

    const regras = {
        'mega-sena': { quantidade: 6, maximo: 60 },
        'quina': { quantidade: 5, maximo: 80 },
        'lotofacil': { quantidade: 15, maximo: 25 },
        'lotomania': { quantidade: 50, maximo: 100 }
    };

    // 💡 NOVO: Lógica para selecionar o cartão (atualiza a variável e o visual)
    jogoCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // 1. Remove 'active' de todos os cartões
            jogoCards.forEach(c => c.classList.remove('active'));
            
            // 2. Adiciona 'active' ao cartão clicado (currentTarget é o botão)
            event.currentTarget.classList.add('active');
            
            // 3. Atualiza a variável de controle com o valor do atributo data-jogo
            jogoAtual = event.currentTarget.dataset.jogo;
            
            // Opcional: Limpa resultados antigos ao mudar de jogo
            // areaResultado.innerHTML = `<p>Seus números aparecerão aqui!</p>`;
        });
    });

    botaoGerar.addEventListener('click', () => {
        // CORRIGIDO: Usa a variável de controle 'jogoAtual'
        const tipo = jogoAtual; 

        // Adiciona uma verificação de segurança, caso a variável não esteja definida
        if (!regras[tipo]) {
            areaResultado.innerHTML = `<p style="color: red;">Erro: Jogo não selecionado.</p>`;
            return;
        }

        const { quantidade, maximo } = regras[tipo];
        const numeros = gerarNumerosUnicos(quantidade, maximo);
        const numerosFormatados = numeros.join(', ');
        
        // Exibe os números na tela
        areaResultado.innerHTML = `<p class="numeros-gerados">${numerosFormatados}</p>`;

        // 👇 NOVO: Mostra o botão de limpar após gerar o resultado
        botaoLimpar.classList.remove('oculto');
    });

    // 💡 NOVO: Funcionalidade do botão Limpar
    botaoLimpar.addEventListener('click', () => {
        // Redefine a área de resultado
        areaResultado.innerHTML = `<p>Seus números aparecerão aqui!</p>`;
        
        // Esconde o botão novamente
        botaoLimpar.classList.add('oculto'); 
    });

    // 💡 NOVO: Funcionalidade de Tema Escuro
    botaoTemaBlack.addEventListener('click', () => {
        // Alterna a classe 'tema-black' no elemento body
        body.classList.toggle('tema-black');
        
        // Opcional: Altera o texto do botão
        if (body.classList.contains('tema-black')) {
            botaoTemaBlack.textContent = 'Tema Claro';
        } else {
            botaoTemaBlack.textContent = 'Tema Black';
        }
    });
        
    /**
     * @param {number} quantidade 
     * @param {number} maximo 
     * @returns {number[]} 
     */
    function gerarNumerosUnicos(quantidade, maximo) {
        const numerosUnicos = new Set();

        while (numerosUnicos.size < quantidade) {
            const numero = Math.floor(Math.random() * maximo) + 1;
            numerosUnicos.add(numero);
        }
        const numerosOrdenados = Array.from(numerosUnicos).sort((a, b) => a - b);

        return numerosOrdenados;
    }
    
});
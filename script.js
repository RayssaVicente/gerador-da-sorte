document.addEventListener('DOMContentLoaded', () => {
    const botaoGerar = document.getElementById('btn-gerar');
    const seletorJogo = document.getElementById('tipo-jogo');
    const areaResultado = document.getElementById('resultado');

    const regras = {
        'mega-sena': { quantidade: 6, maximo: 60 },
        'quina': { quantidade: 5, maximo: 80 },
        'lotofacil': { quantidade: 15, maximo: 25 },
        'lotomania': { quantidade: 50, maximo: 100 }
    };

    botaoGerar.addEventListener('click', () => {
        const tipo = seletorJogo.value;
        const { quantidade, maximo } = regras[tipo];
        const numeros = gerarNumerosUnicos(quantidade, maximo);
        const numerosFormatados = numeros.join(', ');
    });
        
    /**
     * 
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
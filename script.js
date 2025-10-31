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
});
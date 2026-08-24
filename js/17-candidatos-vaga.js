document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // 1. Tema Claro / Escuro
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('fdlm-theme', theme);
        } catch (e) { }
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
            }
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const current = htmlElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // 2. Lógica de Rejeitar Candidato
    const botoesRejeitar = document.querySelectorAll('.btnRejeitar');
    botoesRejeitar.forEach(botao => {
        botao.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const statusBadge = document.getElementById(`status-${id}`);

            // Muda visualmente para rejeitado
            if (statusBadge) {
                statusBadge.className = 'badge badge-danger';
                statusBadge.textContent = 'Rejeitado';
            }

            // Desabilita os botões de ação para essa linha
            this.style.display = 'none';
            const btnSelecionar = this.parentElement.querySelector('.btnSelecionar');
            if (btnSelecionar) btnSelecionar.style.display = 'none';
        });
    });

    // 3. Lógica de Selecionar Candidato (Modal)
    const modalSelecionar = document.getElementById('modalSelecionar');
    const botoesSelecionar = document.querySelectorAll('.btnSelecionar');
    const btnCancelarSelecao = document.getElementById('btnCancelarSelecao');
    const btnConfirmarSelecao = document.getElementById('btnConfirmarSelecao');
    const feedbackAlert = document.getElementById('feedbackAlert');
    let candidatoSelecionadoId = null;

    // Abrir modal ao clicar no botão verde de check
    botoesSelecionar.forEach(botao => {
        botao.addEventListener('click', function () {
            candidatoSelecionadoId = this.getAttribute('data-id');
            modalSelecionar.style.display = 'flex';
        });
    });

    // Fechar modal no Cancelar
    if (btnCancelarSelecao) {
        btnCancelarSelecao.addEventListener('click', function () {
            modalSelecionar.style.display = 'none';
            candidatoSelecionadoId = null;
        });
    }

    // Confirmar contratação
    if (btnConfirmarSelecao) {
        btnConfirmarSelecao.addEventListener('click', function () {
            modalSelecionar.style.display = 'none';

            // Muda o status visualmente para Selecionado
            const statusBadge = document.getElementById(`status-${candidatoSelecionadoId}`);
            if (statusBadge) {
                statusBadge.className = 'badge badge-success';
                statusBadge.textContent = 'Selecionado';
            }

            // Exibe a notificação de sucesso e redireciona para a Ordem de Serviço
            feedbackAlert.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Simula o tempo de API e redireciona (a tela 19 é o detalhe da OS)
            setTimeout(() => {
                window.location.href = '/pages/19-ordem-servico-detalhe.html';
            }, 2000);
        });
    }
});
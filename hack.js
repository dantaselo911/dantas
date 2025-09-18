(function() {
    // ðŸ‘‡ COLE SEU GABARITO COMPLETO AQUI
    const gabarito = [
        {
            "questao_numero": 1,
            "id_da_questao": 392847501,
            "enunciado": "Com base em seus conhecimentos sobre a reflexÃ£o de raios de luz em espelhos planos...",
            "alternativa_correta": {
                "B": "I - reta normal; II - raio incidente; III - raio refletido."
            }
        },
        {
            "questao_numero": 2,
            "id_da_questao": 282754095,
            "enunciado": "Leia o texto e responda Ã  questÃ£o. Ãšrsula Maria Firmina...",
            "alternativa_correta": {
                "B": "O sistema opressor escravocrata."
            }
        }
        // ... cole todas as questÃµes aqui
    ];

    // Cria janela flutuante
    const overlay = document.createElement('div');
    overlay.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 99999;
            background: #2c3e50;
            color: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            font-family: Arial, sans-serif;
            width: 300px;
            cursor: move;
            user-select: none;
        ">
            <h3 style="margin: 0 0 10px 0; font-size: 16px; display: flex; justify-content: space-between; align-items: center;">
                ðŸ¤– AutoResponder
                <button id="fecharBtn" style="
                    background: #e74c3c;
                    border: none;
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">âœ•</button>
            </h3>
            <div id="status" style="margin: 10px 0; font-size: 14px; color: #ecf0f1;">Aguardando...</div>
            <button id="iniciarBtn" style="
                background: #27ae60;
                border: none;
                color: white;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                width: 100%;
            ">â–¶ï¸ Iniciar AutomaÃ§Ã£o</button>
            <button id="pararBtn" style="
                background: #e67e22;
                border: none;
                color: white;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                width: 100%;
                margin-top: 8px;
                display: none;
            ">â¹ï¸ Parar</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Torna a janela arrastÃ¡vel
    let isDragging = false;
    let offsetX, offsetY;
    const header = overlay.querySelector('h3');

    header.addEventListener('mousedown', (e) => {
        if (e.target.id === 'fecharBtn') return;
        isDragging = true;
        offsetX = e.clientX - overlay.getBoundingClientRect().left;
        offsetY = e.clientY - overlay.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        overlay.style.left = (e.clientX - offsetX) + 'px';
        overlay.style.top = (e.clientY - offsetY) + 'px';
        overlay.style.right = 'auto';
        overlay.style.bottom = 'auto';
    });

    document.addEventListener('mouseup', () => isDragging = false);

    // BotÃµes
    const fecharBtn = overlay.querySelector('#fecharBtn');
    const iniciarBtn = overlay.querySelector('#iniciarBtn');
    const pararBtn = overlay.querySelector('#pararBtn');
    const statusDiv = overlay.querySelector('#status');

    fecharBtn.addEventListener('click', () => overlay.remove());

    let observando = false;
    let ultimoNumeroQuestao = null;

    function atualizarStatus(texto, cor = '#ecf0f1') {
        statusDiv.innerHTML = texto;
        statusDiv.style.color = cor;
    }

    function clicarProximo() {
        const btnProximo = [...document.querySelectorAll('button, a')]
            .find(btn => 
                /pr[oÃ³]xima?|avan[cÃ§]ar|continuar|seguinte|prosseguir|salvar/i.test(btn.textContent.trim())
            );

        if (btnProximo) {
            btnProximo.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                btnProximo.click();
                atualizarStatus("â­ï¸ AvanÃ§ando para prÃ³xima questÃ£o...", "#3498db");
            }, 300);
        } else {
            atualizarStatus("âš ï¸ BotÃ£o 'PrÃ³ximo' nÃ£o encontrado.", "#e67e22");
        }
    }

    function responderPeloTexto() {
        // 1. Procura nÃºmero da questÃ£o
        const elementoNumero = [...document.querySelectorAll('*')].find(el => 
            /questÃ£o\s*(\d+)/i.test(el.textContent)
        );

        if (!elementoNumero) {
            atualizarStatus("âŒ NÃ£o encontrei nÃºmero da questÃ£o.", "#e74c3c");
            return;
        }

        const numeroQuestao = parseInt(elementoNumero.textContent.match(/questÃ£o\s*(\d+)/i)[1]);

        // SÃ³ executa se mudou de questÃ£o
        if (numeroQuestao === ultimoNumeroQuestao) return;
        ultimoNumeroQuestao = numeroQuestao;

        atualizarStatus(`ðŸ“Œ Detectada questÃ£o ${numeroQuestao}...`, "#f39c12");

        // 2. Busca no gabarito
        const questao = gabarito.find(q => q.questao_numero === numeroQuestao);
        if (!questao) {
            atualizarStatus(`âš ï¸ QuestÃ£o ${numeroQuestao} nÃ£o no gabarito â€” pulando...`, "#e67e22");
            setTimeout(clicarProximo, 1000);
            return;
        }

        // 3. Pega texto correto
        const textoCorreto = Object.values(questao.alternativa_correta)[0].trim();

        // 4. Procura em qualquer elemento
        const candidatos = [...document.querySelectorAll('*')].filter(el => {
            if (!el.textContent) return false;
            const texto = el.textContent.trim();
            const semLetra = texto.replace(/^\s*[A-Z][\)\.]\s*/i, '').trim();
            return semLetra.replace(/\s+/g, ' ') === textoCorreto.replace(/\s+/g, ' ');
        });

        if (candidatos.length === 0) {
            atualizarStatus(`âš ï¸ Alternativa nÃ£o encontrada â€” pulando questÃ£o ${numeroQuestao}...`, "#e67e22");
            setTimeout(clicarProximo, 1000); // â¬…ï¸ AQUI: pula se nÃ£o achar!
            return;
        }

        // 5. Encontra label pai
        let alvo = candidatos[0];
        while (alvo && alvo.tagName !== 'LABEL') {
            alvo = alvo.parentElement;
        }
        if (!alvo) alvo = candidatos[0];

        // 6. Rola e clica
        alvo.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
            const input = alvo.querySelector('input[type="radio"], input[type="checkbox"]');
            if (input && !input.disabled) {
                input.click();
                atualizarStatus(`âœ… Respondido: QuestÃ£o ${numeroQuestao}!`, "#27ae60");
            } else {
                alvo.click();
                atualizarStatus(`âœ… Respondido (click direto): QuestÃ£o ${numeroQuestao}!`, "#27ae60");
            }

            // â­ï¸ CLICA EM "PRÃ“XIMO" APÃ“S 1 SEGUNDO
            setTimeout(clicarProximo, 1000);

        }, 800);
    }

    function iniciarObservador() {
        if (observando) return;
        observando = true;
        iniciarBtn.style.display = 'none';
        pararBtn.style.display = 'block';

        // Executa imediatamente
        responderPeloTexto();

        // Observa mudanÃ§as na pÃ¡gina (mutaÃ§Ãµes)
        const observer = new MutationObserver(() => {
            if (observando) responderPeloTexto();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        });

        // TambÃ©m verifica a cada 2 segundos (backup)
        const intervalo = setInterval(() => {
            if (observando) responderPeloTexto();
        }, 2000);

        // Salva para parar depois
        overlay.observer = observer;
        overlay.intervalo = intervalo;
    }

    function pararObservador() {
        observando = false;
        iniciarBtn.style.display = 'block';
        pararBtn.style.display = 'none';
        if (overlay.observer) overlay.observer.disconnect();
        if (overlay.intervalo) clearInterval(overlay.intervalo);
        atualizarStatus("â¹ï¸ AutomaÃ§Ã£o parada.", "#ecf0f1");
    }

    iniciarBtn.addEventListener('click', iniciarObservador);
    pararBtn.addEventListener('click', pararObservador);

    // Estilo inicial
    overlay.style.position = 'fixed';
    overlay.style.top = '20px';
    overlay.style.right = '20px';
    overlay.style.zIndex = '99999';

    atualizarStatus("âœ… Sistema carregado. Clique em 'Iniciar'.", "#27ae60");
})();

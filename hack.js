(function() {
    // ====== GABARITO ======
    const gabarito = [
        {
            questao_numero: 1,
            id: 392847501,
            enunciado: "Reflexão de raios de luz em espelhos planos...",
            correta: { B: "I - reta normal; II - raio incidente; III - raio refletido." }
        },
        {
            questao_numero: 2,
            id: 282754095,
            enunciado: "Leia o texto e responda à questão. Úrsula Maria Firmina...",
            correta: { B: "O sistema opressor escravocrata." }
        }
        // 👉 Cole as próximas aqui
    ];

    // ====== INTERFACE ======
    const box = document.createElement('div');
    box.innerHTML = `
        <div style="
            position: fixed; top: 25px; right: 25px; z-index: 99999;
            background: linear-gradient(135deg, #34495e, #2c3e50);
            color: #fff; padding: 18px 20px; border-radius: 15px;
            width: 320px; font-family: 'Segoe UI', sans-serif;
            box-shadow: 0 8px 25px rgba(0,0,0,.4);
            backdrop-filter: blur(6px); cursor: move; user-select: none;
        ">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3 style="margin:0; font-size:18px; font-weight:600; letter-spacing:.5px;">⚡ AutoResponder</h3>
                <button id="fecharBtn" style="
                    background: #e74c3c; border:none; color:#fff;
                    width:26px; height:26px; border-radius:50%;
                    cursor:pointer; font-size:14px; font-weight:bold;
                    display:flex; align-items:center; justify-content:center;
                    box-shadow: 0 2px 6px rgba(0,0,0,.2);
                ">✕</button>
            </div>
            
            <div id="status" style="
                margin:14px 0; font-size:14px;
                background: rgba(255,255,255,.1);
                padding:8px 10px; border-radius:8px;
                font-weight:500; letter-spacing:.3px;
            ">Aguardando...</div>
            
            <div style="display:flex; flex-direction:column; gap:10px;">
                <button id="startBtn" style="
                    background: linear-gradient(135deg,#2ecc71,#27ae60);
                    border:none; color:#fff; font-size:14px; font-weight:bold;
                    padding:10px 0; border-radius:8px; cursor:pointer;
                    transition: all .2s; box-shadow: 0 3px 10px rgba(0,0,0,.3);
                ">▶️ Iniciar Automação</button>
                
                <button id="stopBtn" style="
                    background: linear-gradient(135deg,#e67e22,#d35400);
                    border:none; color:#fff; font-size:14px; font-weight:bold;
                    padding:10px 0; border-radius:8px; cursor:pointer;
                    display:none; transition: all .2s;
                    box-shadow: 0 3px 10px rgba(0,0,0,.3);
                ">⏹️ Parar Automação</button>
            </div>
        </div>
    `;
    document.body.appendChild(box);

    // ====== VARIÁVEIS ======
    let ativo = false;
    let ultimaQuestao = null;
    const status = box.querySelector('#status');
    const btnStart = box.querySelector('#startBtn');
    const btnStop = box.querySelector('#stopBtn');
    const btnFechar = box.querySelector('#fecharBtn');

    // ====== STATUS ======
    function setStatus(txt, cor = "#ecf0f1") {
        status.textContent = txt;
        status.style.color = cor;
    }

    // ====== PROCURAR BOTÃO "PRÓXIMO" ======
    function clicarProximo() {
        const botao = [...document.querySelectorAll('button, a')]
            .find(b => /pr[oó]xima?|avan[cç]ar|continuar|seguinte|prosseguir|salvar/i.test(b.textContent));
        
        if (botao) {
            botao.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                botao.click();
                setStatus("⏭️ Indo pra próxima questão...", "#3498db");
            }, 300);
        } else {
            setStatus("⚠️ Botão 'Próximo' não encontrado.", "#f39c12");
        }
    }

    // ====== RESPONDER QUESTÃO ======
    function responderQuestao() {
        const elNum = [...document.querySelectorAll('*')].find(el => /questão\s*(\d+)/i.test(el.textContent));
        if (!elNum) return setStatus("❌ Número da questão não encontrado.", "#e74c3c");

        const num = parseInt(elNum.textContent.match(/questão\s*(\d+)/i)[1]);
        if (num === ultimaQuestao) return;
        ultimaQuestao = num;

        setStatus(`📌 Questão ${num} detectada...`, "#f39c12");

        const q = gabarito.find(x => x.questao_numero === num);
        if (!q) {
            setStatus(`⚠️ Questão ${num} não está no gabarito.`, "#f39c12");
            return setTimeout(clicarProximo, 1000);
        }

        const resposta = Object.values(q.correta)[0].trim();
        const candidatos = [...document.querySelectorAll('*')].filter(el => {
            const txt = el.textContent?.trim();
            if (!txt) return false;
            const limpo = txt.replace(/^\s*[A-Z][\)\.]\s*/i, '').trim();
            return limpo.replace(/\s+/g, ' ') === resposta.replace(/\s+/g, ' ');
        });

        if (!candidatos.length) {
            setStatus(`⚠️ Resposta não encontrada — pulando...`, "#f39c12");
            return setTimeout(clicarProximo, 1000);
        }

        let alvo = candidatos[0];
        while (alvo && alvo.tagName !== 'LABEL') alvo = alvo.parentElement;
        if (!alvo) alvo = candidatos[0];

        alvo.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            const input = alvo.querySelector('input[type=radio], input[type=checkbox]');
            if (input && !input.disabled) input.click();
            else alvo.click();

            setStatus(`✅ Questão ${num} respondida!`, "#2ecc71");
            setTimeout(clicarProximo, 1000);
        }, 800);
    }

    // ====== START / STOP ======
    function start() {
        if (ativo) return;
        ativo = true;
        btnStart.style.display = 'none';
        btnStop.style.display = 'block';
        responderQuestao();

        const obs = new MutationObserver(() => ativo && responderQuestao());
        obs.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
        box.obs = obs;

        box.intervalo = setInterval(() => ativo && responderQuestao(), 2000);
    }

    function stop() {
        ativo = false;
        btnStart.style.display = 'block';
        btnStop.style.display = 'none';
        if (box.obs) box.obs.disconnect();
        if (box.intervalo) clearInterval(box.intervalo);
        setStatus("⏹️ Automação parada.", "#ecf0f1");
    }

    // ====== EVENTOS ======
    btnFechar.addEventListener('click', () => box.remove());
    btnStart.addEventListener('click', start);
    btnStop.addEventListener('click', stop);

    setStatus("✅ Sistema carregado. Clique em 'Iniciar'.", "#2ecc71");
})();

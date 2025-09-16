javascript:(function(){
    if (document.getElementById('moon-hack-root')) return;

    // === FASE 1: ANIMAÇÃO HACKER ===
    const overlay = document.createElement('div');
    overlay.id = 'moon-hack-root';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: #000;
        z-index: 2147483647;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Courier New', monospace;
    `;
    overlay.innerHTML = `
        <div style="width:90%;max-width:800px;padding:30px;background:#000;color:#0f0;border:2px solid #0f0;box-shadow:0 0 30px rgba(0,255,0,0.7);border-radius:10px;overflow:hidden;text-align:left;position:relative;">
            <div id="hack-lines" style="max-height:80vh;overflow-y:auto;line-height:1.6;white-space:pre-wrap;word-break:break-word;"></div>
            <div id="hack-cursor" style="color:#0f0;margin-top:8px;opacity:1;">></div>
        </div>
    `;
    document.body.appendChild(overlay);

    const linesContainer = overlay.querySelector('#hack-lines');
    const cursor = overlay.querySelector('#hack-cursor');

    const messages = [
        "root@moonscript:~# Iniciando script de acesso root...",
        "→ Conectando ao servidor lunar... ✓",
        "→ Acesso concedido. Bem-vindo, usuário #666.",
        "⚠️ ALERTA: SISTEMA COMPROMETIDO — VOCÊ FOI HACKEADO!",
        "→ Descompactando módulo: MoonScript Gabarito v3.0...",
        "→ Iniciando interface com suporte a JSON customizado... ✓",
        "✅ Sistema carregado. Cole seu JSON para exibir o gabarito."
    ];

    const speeds = [40, 50, 50, 1, 40, 50, 50];
    const delays = [0, 800, 600, 1500, 800, 800, 1000];
    let msgIndex = 0;

    function typeLine() {
        if (msgIndex >= messages.length) {
            launchToggleGabarito();
            return;
        }

        const lineDiv = document.createElement('div');
        lineDiv.style.cssText = `margin: 4px 0; color: ${msgIndex === 3 ? '#ff0000' : '#0f0'}; font-weight: ${msgIndex === 3 ? 'bold' : 'normal'};`;
        linesContainer.appendChild(lineDiv);

        let charIndex = 0;
        const msg = messages[msgIndex];
        const speed = speeds[msgIndex];
        const delayAfter = delays[msgIndex];
        msgIndex++;

        const interval = setInterval(() => {
            if (charIndex < msg.length) {
                lineDiv.textContent += msg[charIndex];
                charIndex++;
                linesContainer.scrollTop = linesContainer.scrollHeight;
            } else {
                clearInterval(interval);
                if (msgIndex < messages.length) {
                    cursor.style.display = 'block';
                    setTimeout(() => {
                        cursor.style.display = 'none';
                        typeLine();
                    }, delayAfter);
                } else {
                    cursor.style.display = 'none';
                    setTimeout(launchToggleGabarito, 1200);
                }
            }
        }, speed);
    }

    setTimeout(typeLine, 500);

    // === FASE 2: BOTÃO TOGGLE + JANELA PARA COLAR JSON ===
    function launchToggleGabarito() {
        document.body.removeChild(overlay);

        // Botão flutuante
        const btn = document.createElement('button');
        btn.id = 'moon-gab-btn';
        btn.innerText = '🌙 Gabarito';
        btn.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 2147483646;
            background: linear-gradient(90deg, #7b1fa2, #4a148c);
            color: white;
            border: none;
            border-radius: 32px;
            padding: 14px 24px;
            font-weight: 600;
            font-family: 'Segoe UI', sans-serif;
            cursor: pointer;
            box-shadow: 0 5px 20px rgba(138, 43, 226, 0.6);
            transition: transform 0.2s, box-shadow 0.2s;
        `;
        btn.onmouseover = () => { btn.style.transform = 'scale(1.05)'; };
        btn.onmouseout = () => { btn.style.transform = 'scale(1)'; };

        // Painel do Gabarito (inicialmente escondido)
        const panel = document.createElement('div');
        panel.id = 'moon-gab-panel';
        panel.innerHTML = `
            <div id="gab-window" style="width:92%;max-width:620px;background:#1a1a2e;border-radius:18px;box-shadow:0 12px 45px rgba(138,43,226,0.7);overflow:hidden;pointer-events:auto;font-family:Segoe UI">
                <div style="background:linear-gradient(90deg,#4a148c,#7b1fa2);color:white;padding:22px 24px;font-weight:bold;font-size:20px;display:flex;justify-content:space-between;align-items:center">
                    <span>MoonScript — Cole seu JSON</span>
                    <button id="gab-close" style="background:0;border:0;color:white;font-size:28px;cursor:pointer;padding:0;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center">✕</button>
                </div>
                <div style="padding:20px;background:#0f0f1a;">
                    <textarea id="json-input" placeholder="Cole seu JSON aqui (formato do gabarito)..." style="width:100%;height:180px;padding:14px;background:#161626;color:#e0e0ff;border:1px solid #4a148c;border-radius:8px;font-family:monospace;font-size:14px;resize:vertical;outline:none;"></textarea>
                    <button id="process-btn" style="margin-top:15px;width:100%;padding:12px;background:linear-gradient(90deg,#7b1fa2,#4a148c);color:white;border:none;border-radius:8px;font-weight:600;cursor:pointer;">Processar Gabarito</button>
                    <div id="output-area" style="margin-top:20px;padding:20px;background:#0a0a14;border-radius:8px;color:#e0e0ff;min-height:50px;max-height:300px;overflow-y:auto;"></div>
                </div>
            </div>
        `;
        panel.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 2147483645;
            pointer-events: none;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.35s, visibility 0.35s;
        `;

        document.body.appendChild(btn);
        document.body.appendChild(panel);

        // Processar JSON
        const processBtn = panel.querySelector('#process-btn');
        const jsonInput = panel.querySelector('#json-input');
        const outputArea = panel.querySelector('#output-area');

        processBtn.onclick = () => {
            try {
                const data = JSON.parse(jsonInput.value);

                if (!data.questoes || !Array.isArray(data.questoes)) {
                    throw new Error('Formato inválido: precisa ter "questoes" como array.');
                }

                outputArea.innerHTML = data.questoes.map((q, idx) => {
                    if (q.correta == null || !q.alternativas || !q.pergunta) {
                        return `<div style="color:#ff9999;margin:10px 0;">⚠ Questão ${q.id || idx+1} mal formatada.</div>`;
                    }
                    const letra = String.fromCharCode(65 + q.correta);
                    const resposta = q.alternativas[q.correta];
                    return `
                        <div style="padding:18px 0;margin-bottom:18px;border-bottom:1px solid #333;">
                            <div style="font-weight:700;margin-bottom:8px;color:#c697ff;font-size:17px;">
                                ${q.id || (idx+1)}. ${q.pergunta}
                            </div>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <span style="font-weight:700;color:#66ffaa;background:rgba(102,255,170,0.15);padding:4px 12px;border-radius:6px;font-size:15px;">
                                    ${letra})
                                </span>
                                <span>${resposta}</span>
                            </div>
                        </div>
                    `;
                }).join('');

                outputArea.style.color = '#a5d6a7';
            } catch (err) {
                outputArea.innerHTML = `<span style="color:#ef9a9a;">❌ Erro: ${err.message}</span>`;
            }
        };

        // Toggle abrir/fechar
        btn.onclick = () => {
            const p = panel;
            if (p.style.opacity === '1') {
                p.style.opacity = '0';
                p.style.visibility = 'hidden';
            } else {
                p.style.opacity = '1';
                p.style.visibility = 'visible';
            }
        };

        // Fecha ao clicar no ×
        panel.querySelector('#gab-close').onclick = () => {
            panel.style.opacity = '0';
            panel.style.visibility = 'hidden';
        };

        // Fecha ao clicar fora
        panel.onclick = (e) => {
            if (e.target === panel) {
                panel.style.opacity = '0';
                panel.style.visibility = 'hidden';
            }
        };
    }
})();

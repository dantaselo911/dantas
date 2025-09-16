javascript:(function(){
    if (document.getElementById('moon-hack-root')) return;

    // === FASE 1: ANIMAÇÃO HACKER SEM BUGS ===
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
        "→ Descompactando módulo: MoonScript Gabarito v2.0...",
        "→ Iniciando interface elegante... ✓",
        "✅ Sistema carregado. Liberando controle de acesso."
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

    // === FASE 2: LANÇA O BOTÃO TOGGLE + GABARITO (DARK + ROXO) ===
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
                    <span>MoonScript — Gabarito Oficial</span>
                    <button id="gab-close" style="background:0;border:0;color:white;font-size:28px;cursor:pointer;padding:0;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center">✕</button>
                </div>
                <div id="gab-content" style="padding:30px 25px;color:#e0e0ff;line-height:1.7;font-size:16px;background:#0f0f1a;max-height:70vh;overflow-y:auto"></div>
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

        // Conteúdo do Gabarito
        const questoes = [
            {id:1,pergunta:"Qual é a capital do Brasil?",alternativas:["São Paulo","Rio de Janeiro","Brasília","Belo Horizonte"],correta:2},
            {id:2,pergunta:"Quem foi o primeiro homem a pisar na Lua?",alternativas:["Yuri Gagarin","Neil Armstrong","Buzz Aldrin","Michael Collins"],correta:1},
            {id:3,pergunta:"Qual é o maior oceano do mundo?",alternativas:["Atlântico","Índico","Ártico","Pacífico"],correta:3},
            {id:4,pergunta:"Quantos estados tem o Brasil?",alternativas:["24","26","27","25"],correta:1},
            {id:5,pergunta:"Quem escreveu 'O Pequeno Príncipe'?",alternativas:["Machado de Assis","Antoine de Saint-Exupéry","Monteiro Lobato","J. K. Rowling"],correta:1}
        ];

        const content = panel.querySelector('#gab-content');
        content.innerHTML = questoes.map(q => {
            const letra = String.fromCharCode(65 + q.correta);
            const resposta = q.alternativas[q.correta];
            return `
                <div style="padding:18px 0;margin-bottom:18px;border-bottom:1px solid #333;">
                    <div style="font-weight:700;margin-bottom:8px;color:#c697ff;font-size:17px;">
                        ${q.id}. ${q.pergunta}
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

        // Adiciona elementos ao corpo
        document.body.appendChild(btn);
        document.body.appendChild(panel);

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

        // Fecha ao clicar fora (opcional)
        panel.onclick = (e) => {
            if (e.target === panel) {
                panel.style.opacity = '0';
                panel.style.visibility = 'hidden';
            }
        };
    }
})();

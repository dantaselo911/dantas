javascript:(function() {
    if (document.getElementById("moon-root")) {
        console.log("MoonScript já está ativo.");
        return;
    }

    // === FASE 1: ANIMAÇÃO HACKER ===
    const overlay = document.createElement("div");
    overlay.id = "moon-root";
    overlay.innerHTML = `
        <div style="
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #000; z-index: 9999999;
            display: flex; align-items: center; justify-content: center;
            color: #0f0; font-family: 'Courier New', monospace;
        ">
            <div style="
                width: 90%; max-width: 800px; padding: 30px;
                background: #000; border: 2px solid #0f0;
                box-shadow: 0 0 30px rgba(0, 255, 0, 0.5); border-radius: 12px;
                overflow: hidden; text-align: left;
            ">
                <div id="lines" style="
                    max-height: 70vh; overflow-y: auto;
                    line-height: 1.5; word-wrap: break-word;
                    font-size: 16px;
                "></div>
                <div id="cur" style="color: #0f0; margin-top: 12px; font-size: 18px;">></div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const linesContainer = document.getElementById("lines");
    const cursor = document.getElementById("cur");

    const messages = [
        "root@moonscript:~# Iniciando sistema lunar...",
        "→ Conectando ao banco de gabaritos...",
        "→ Acesso root concedido.",
        "⚠️ ALERTA: SISTEMA COMPROMETIDO — VOCÊ FOI HACKEADO!",
        "→ Iniciando interface MoonScript v6.0...",
        "✅ Sistema carregado. Clique no botão flutuante."
    ];

    const speeds = [50, 50, 50, 1, 50, 50];
    const delays = [0, 600, 600, 1500, 800, 1200];
    let msgIndex = 0;

    function typeLine() {
        if (msgIndex >= messages.length) {
            launchToggleGabarito();
            return;
        }

        cursor.style.display = "none";
        const lineDiv = document.createElement("div");
        lineDiv.textContent = "";
        lineDiv.style.color = msgIndex === 3 ? "#ff3333" : "#00ff66";
        lineDiv.style.fontWeight = msgIndex === 3 ? "bold" : "normal";
        linesContainer.appendChild(lineDiv);

        let charIndex = 0;
        const msg = messages[msgIndex];
        const speed = speeds[msgIndex];
        const delayAfter = delays[msgIndex];
        msgIndex++;

        const interval = setInterval(() => {
            if (charIndex < msg.length) {
                lineDiv.textContent += msg.charAt(charIndex);
                charIndex++;
                linesContainer.scrollTop = linesContainer.scrollHeight;
            } else {
                clearInterval(interval);
                if (msgIndex < messages.length) {
                    cursor.style.display = "block";
                    setTimeout(typeLine, delayAfter);
                } else {
                    setTimeout(launchToggleGabarito, 1200);
                }
            }
        }, speed);
    }

    setTimeout(typeLine, 500);

    // === FASE 2: BOTÃO TOGGLE + JANELA DE JSON ===
    function launchToggleGabarito() {
        document.body.removeChild(overlay);

        // Botão flutuante
        const btn = document.createElement("button");
        btn.id = "moon-btn";
        btn.innerText = "🌙 Gabarito";
        btn.style.cssText = `
            position: fixed; bottom: 24px; right: 24px; z-index: 999999;
            background: linear-gradient(135deg, #ff0000, #220000, #000000);
            color: white; border: none; border-radius: 32px;
            padding: 14px 24px; font-weight: 600; font-family: Segoe UI;
            cursor: pointer; box-shadow: 0 5px 25px rgba(255, 0, 0, 0.5);
            transition: transform 0.2s, box-shadow 0.2s;
        `;
        btn.onmouseover = () => { btn.style.transform = "scale(1.05)"; };
        btn.onmouseout = () => { btn.style.transform = "scale(1)"; };

        // Painel do Gabarito — COM DRAG & DROP E BORDA CORRIGIDA
        const panel = document.createElement("div");
        panel.id = "moon-panel";
        panel.innerHTML = `
            <div style="
                width: 92%; max-width: 650px;
                background: #111; border-radius: 18px;
                box-shadow: 0 12px 50px rgba(255, 0, 0, 0.6);
                overflow: hidden; pointer-events: auto; font-family: Segoe UI;
            " id="gab-window">
                <div id="gab-header" style="
                    background: linear-gradient(90deg, #ff0000, #8b0000, #000000);
                    color: white; padding: 22px 24px; font-weight: bold; font-size: 20px;
                    display: flex; justify-content: space-between; align-items: center;
                    cursor: move; user-select: none;
                ">
                    <span>MoonScript — Gabarito</span>
                    <button id="close-btn" style="
                        background: 0; border: 0; color: white; font-size: 28px;
                        cursor: pointer; padding: 0; width: 40px; height: 40px;
                        border-radius: 50%; display: flex; align-items: center;
                        justify-content: center;
                    ">✕</button>
                </div>
                <div style="padding: 25px; background: #0a0a0a;" id="input-section">
                    <textarea id="json-area" placeholder="Cole seu JSON aqui (formato personalizado)..." style="
                        width: 100%; height: 180px; padding: 16px;
                        background: #1a0000; color: #ffcccc;
                        border: 1px solid rgba(255, 0, 0, 0.3); /* ✅ BORDA ELEGANTE */
                        border-radius: 8px; font-family: monospace;
                        resize: vertical; outline: none;
                        box-shadow: inset 0 1px 4px rgba(0,0,0,0.6); /* ✅ SOMBRA INTERNA */
                    "></textarea>
                    <button id="proc-btn" style="
                        margin-top: 18px; width: 100%; padding: 13px;
                        background: linear-gradient(135deg, #ff0000, #5a0000);
                        color: white; border: none; border-radius: 8px;
                        font-weight: 600; cursor: pointer;
                        box-shadow: 0 3px 15px rgba(255, 0, 0, 0.4);
                    ">🎯 Processar Gabarito</button>
                </div>
                <div id="result-section" style="padding: 0 25px 25px; display: none;">
                    <div id="result" style="
                        margin-top: 25px; padding: 20px;
                        background: #000000; border-radius: 8px;
                        color: #ffcccc; min-height: 60px;
                        max-height: 400px; overflow-y: auto; line-height: 1.6;
                    "></div>
                </div>
                <div style="
                    padding: 12px 24px; background: #000; border-top: 1px solid #330000;
                    font-size: 12px; color: #666; text-align: center;
                ">
                    Feito por <a href="https://github.com/KilluaWq" target="_blank" style="color:#ff6666; text-decoration: none; font-weight: bold;">@bakai</a> & 
                    <a href="#" style="color:#ff6666; text-decoration: none; font-weight: bold;">@trampos</a> • 
                    <a href="https://discord.com/invite/kmeuwvXTNH" target="_blank" style="color:#00ccff; text-decoration: none;">Servidor Discord</a>
                </div>
            </div>
        `;
        panel.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            z-index: 999998; pointer-events: none;
            background: rgba(0,0,0,0.9); display: flex;
            align-items: center; justify-content: center;
            opacity: 0; visibility: hidden;
            transition: opacity 0.35s, visibility 0.35s;
        `;

        document.body.appendChild(btn);
        document.body.appendChild(panel);

        // ========== DRAG & DROP ========== //
        const header = panel.querySelector("#gab-header");
        let isDragging = false;
        let offsetX = 0, offsetY = 0;

        header.addEventListener("mousedown", (e) => {
            isDragging = true;
            const rect = panel.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            panel.style.transition = "none";
            e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            panel.style.pointerEvents = "none";
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            panel.style.left = x + "px";
            panel.style.top = y + "px";
            panel.style.transform = "none";
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            panel.style.transition = "opacity 0.35s, visibility 0.35s";
            panel.style.pointerEvents = "auto";
        });
        // ========== FIM DRAG & DROP ========== //

        // Processar JSON
        panel.querySelector("#proc-btn").onclick = () => {
            try {
                const input = panel.querySelector("#json-area").value;
                let data = JSON.parse(input);
                if (!Array.isArray(data)) data = [data];

                if (!data.length) throw new Error("JSON deve conter pelo menos uma questão.");

                const resultDiv = panel.querySelector("#result");

                // RENDERIZA O GABARITO — SEM MOSTRAR O CONTEXTO — ✅ CORRIGIDO "undefined"
                resultDiv.innerHTML = data.map(item => {
                    const letra = Object.keys(item.alternativa_correta)[0];
                    const texto = item.alternativa_correta[letra];

                    let html = `<div style="padding:18px 0; margin-bottom:22px;">`;

                    // → ID
                    if (item.id_da_questao) {
                        html += `<div style="font-size:13px; color:#666; margin-bottom:8px">ID: ${item.id_da_questao}</div>`;
                    }

                    // → PERGUNTA — ✅ CORREÇÃO AQUI
                    const pergunta = item.enunciado_pergunta || "[Pergunta não definida]";
                    html += `
                        <div style="
                            font-weight: 700; margin: 10px 0 8px; color: #ff9999; font-size: 17px;
                        ">${pergunta}</div>
                        <div style="
                            display: flex; align-items: center; gap: 10px; margin-top: 8px;
                        ">
                            <span style="
                                font-weight: 700; color: #ff6666;
                                background: rgba(255, 102, 102, 0.15); padding: 5px 12px;
                                border-radius: 6px; font-size: 15px;
                            ">${letra})</span>
                            <span>${texto}</span>
                        </div>
                    </div>`;

                    return html;
                }).join("");

                resultDiv.style.color = "#ff9999";

                // → OCULTA INPUT
                panel.querySelector("#input-section").style.display = "none";
                panel.querySelector("#result-section").style.display = "block";

            } catch (err) {
                const resultDiv = panel.querySelector("#result");
                resultDiv.innerHTML = `<span style="color:#ff6666; font-weight:600">❌ Erro: ${err.message || err}</span>`;
                panel.querySelector("#result-section").style.display = "block";
            }
        };

        // Toggle abrir/fechar
        btn.onclick = () => {
            const p = panel;
            if (p.style.opacity === "1") {
                p.style.opacity = "0";
                p.style.visibility = "hidden";
            } else {
                p.style.opacity = "1";
                p.style.visibility = "visible";
                p.style.left = "50%";
                p.style.top = "50%";
                p.style.transform = "translate(-50%, -50%)";
            }
        };

        // Fechar com ×
        panel.querySelector("#close-btn").onclick = () => {
            panel.style.opacity = "0";
            panel.style.visibility = "hidden";
        };

        // Fechar clicando fora
        panel.onclick = (e) => {
            if (e.target === panel) {
                panel.style.opacity = "0";
                panel.style.visibility = "hidden";
            }
        };
    }
})();

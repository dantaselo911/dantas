javascript:(function() {
    if (document.getElementById("infinity-root")) {
        console.log("InfinityCode já está ativo.");
        return;
    }

    // === FASE 1: ANIMAÇÃO HACKER ===
    const overlay = document.createElement("div");
    overlay.id = "infinity-root";
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
        "root@infinitycode:~# Iniciando sistema InfinityCode...",
        "→ Conectando ao banco de gabaritos...",
        "→ Acesso root concedido.",
        "⚠️ ALERTA: SISTEMA COMPROMETIDO — VOCÊ FOI HACKEADO!",
        "→ Iniciando interface InfinityCode v6.0...",
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
                    cursor.style.display = "inline";
                    setTimeout(typeLine, delayAfter);
                } else {
                    cursor.style.display = "inline";
                    launchToggleGabarito();
                }
            }
        }, speed);
    }

    // Função placeholder - substitua conforme necessário
    function launchToggleGabarito() {
        alert("Função launchToggleGabarito() ativada!");
        // Aqui você pode adicionar a lógica real para alternar gabaritos
    }

    // Inicia a animação
    typeLine();
})();

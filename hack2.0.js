javascript:(async function() {
    'use strict';

    const ROOT_ID = "infinity-root-1000x";
    const BTN_ID = "infinity-btn-1000x";
    const PANEL_ID = "infinity-panel-1000x";

    if (document.getElementById(ROOT_ID)) {
        console.warn("[InfinityCode 1000x] Já está ativo. Recarregando...");
        document.getElementById(ROOT_ID).remove();
    }

    // ========== FUNÇÕES UTILITÁRIAS ==========
    const $ = (sel, parent = document) => parent.querySelector(sel);
    const $$ = (sel, parent = document) => parent.querySelectorAll(sel);
    const ce = (tag, props = {}) => Object.assign(document.createElement(tag), props);

    const showError = (container, message) => {
        container.innerHTML = `<div style="color: #ff6666; font-weight: bold; padding: 10px; background: rgba(255,102,102,0.1); border-radius: 4px; margin: 10px 0;">❌ ${message}</div>`;
        console.error("[InfinityCode 1000x] Erro:", message);
    };

    const showSuccess = (container, message) => {
        container.innerHTML = `<div style="color: #66ff66; font-weight: bold; padding: 10px; background: rgba(102,255,102,0.1); border-radius: 4px; margin: 10px 0;">✅ ${message}</div>`;
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error("Falha ao copiar:", err);
            return false;
        }
    };

    const exportToFile = (text, filename = "gabarito_infinity_1000x.txt") => {
        try {
            const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = ce('a', { href: url, download: filename });
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Falha ao exportar:", err);
        }
    };

    // ========== RENDERIZADOR DE QUESTÃO ==========
    const renderQuestion = (item) => {
        const letra = Object.keys(item.alternativa_correta)[0] || '?';
        const texto = item.alternativa_correta[letra] || '';
        let html = `<div class="ic-question" data-id="${item.id_da_questao || ''}" style="padding: 16px 0; margin-bottom: 20px; border-bottom: 1px solid rgba(0,102,255,0.15);">`;

        // ID
        if (item.id_da_questao) {
            html += `<div style="font-size: 12px; color: #6699ff; margin-bottom: 6px; font-weight: 500;">ID: ${item.id_da_questao}</div>`;
        }

        // IMAGEM (prioridade para imagem_url, depois para [IMAGEM] no texto)
        let imageUrl = item.imagem_url;
        if (!imageUrl && texto.startsWith('[IMAGEM]')) {
            imageUrl = texto.replace('[IMAGEM]', '').trim();
        }

        if (imageUrl) {
            html += `<div style="margin: 12px 0; text-align: center;">
                <img src="${imageUrl}" alt="Imagem da questão" 
                     style="max-width: 100%; max-height: 180px; border-radius: 6px; border: 1px solid rgba(102,153,255,0.2); cursor: pointer;"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                     onclick="window.open(this.src, '_blank');">
                <div style="display: none; color: #ff9999; font-size: 12px; margin-top: 4px;">(Imagem não carregou)</div>
            </div>`;
        }

        // ENUNCIADO
        const enunciado = item.enunciado_pergunta || item.enunciado || 'Enunciado não disponível';
        html += `<div style="font-weight: 700; margin: 8px 0 6px; color: #66ccff; font-size: 16px; line-height: 1.4;">${enunciado}</div>`;

        // ALTERNATIVA CORRETA
        html += `<div style="display: flex; align-items: flex-start; gap: 8px; margin-top: 6px; flex-wrap: wrap;">
            <span style="font-weight: 700; color: #6699ff; background: rgba(102, 153, 255, 0.15); padding: 4px 10px; border-radius: 4px; font-size: 14px; min-width: 30px; text-align: center;">${letra})</span>
            <span style="flex: 1; word-break: break-word;">${texto.startsWith('[IMAGEM]') ? '🖼️ <i>Ver imagem acima</i>' : texto}</span>
        </div>`;

        html += `</div>`;
        return html;
    };

    // ========== PROCESSADOR DE JSON ==========
    const processJSON = (input, resultContainer) => {
        try {
            if (!input.trim()) throw new Error("O campo de JSON está vazio.");

            let data = JSON.parse(input);
            if (!Array.isArray(data)) data = [data];
            if (data.length === 0) throw new Error("O JSON não contém nenhuma questão.");

            // Validação básica
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                if (!item.alternativa_correta || Object.keys(item.alternativa_correta).length === 0) {
                    throw new Error(`A questão no índice ${i} não possui 'alternativa_correta' válida.`);
                }
            }

            // Renderiza
            resultContainer.innerHTML = data.map(renderQuestion).join('');
            $('#result-section').style.display = 'block';
            $('#input-section').style.display = 'none';

            // Salva dados para busca
            window.infinityData = data;
            console.log(`[InfinityCode 1000x] Processadas ${data.length} questões com sucesso.`);
            return data;

        } catch (err) {
            showError(resultContainer, err.message || "Erro desconhecido ao processar JSON.");
            $('#result-section').style.display = 'block';
            return null;
        }
    };

    // ========== BUSCA ==========
    const performSearch = (term, resultContainer) => {
        if (!window.infinityData || window.infinityData.length === 0) {
            showError(resultContainer, "Nenhum gabarito foi processado ainda.");
            return;
        }

        if (!term.trim()) {
            resultContainer.innerHTML = window.infinityData.map(renderQuestion).join('');
            return;
        }

        const termLower = term.toLowerCase();
        const filtered = window.infinityData.filter(item => {
            const id = (item.id_da_questao || '').toString().toLowerCase();
            const enunciado = (item.enunciado_pergunta || item.enunciado || '').toLowerCase();
            const letra = (Object.keys(item.alternativa_correta)[0] || '').toLowerCase();
            const resposta = (item.alternativa_correta[letra] || '').toLowerCase();
            return id.includes(termLower) || enunciado.includes(termLower) || resposta.includes(termLower);
        });

        if (filtered.length === 0) {
            resultContainer.innerHTML = `<div style="color: #ffcc66; padding: 20px; text-align: center;">🔍 Nenhuma questão encontrada para: <b>"${term}"</b></div>`;
        } else {
            resultContainer.innerHTML = filtered.map(renderQuestion).join('');
            console.log(`[InfinityCode 1000x] ${filtered.length} questões encontradas para: "${term}"`);
        }
    };

    // ========== CRIA ELEMENTOS ==========
    const createRoot = () => ce('div', { id: ROOT_ID });

    const createButton = () => {
        const btn = ce('button', {
            id: BTN_ID,
            innerText: "🌌 InfinityCode 1000x",
            style: `
                position: fixed; bottom: 24px; right: 24px; z-index: 9999999;
                background: linear-gradient(135deg, #0066ff, #003366, #000000);
                color: white; border: none; border-radius: 32px;
                padding: 14px 24px; font-weight: 600; font-family: 'Segoe UI', sans-serif;
                cursor: pointer; box-shadow: 0 5px 25px rgba(0, 102, 255, 0.5);
                transition: transform 0.2s, box-shadow 0.2s;
            `
        });
        btn.onmouseenter = () => { btn.style.transform = "scale(1.05)"; };
        btn.onmouseleave = () => { btn.style.transform = "scale(1)"; };
        return btn;
    };

    const createPanel = () => {
        const panel = ce('div', {
            id: PANEL_ID,
            innerHTML: `
                <div style="width: 95%; max-width: 700px; background: #111; border-radius: 18px; box-shadow: 0 12px 50px rgba(0, 102, 255, 0.6); overflow: hidden; pointer-events: auto; font-family: 'Segoe UI', sans-serif;" id="gab-window">
                    <div id="gab-header" style="background: linear-gradient(90deg, #0066ff, #003366, #000000); color: white; padding: 20px 24px; font-weight: bold; font-size: 18px; display: flex; justify-content: space-between; align-items: center; cursor: move; user-select: none;">
                        <span>🌌 InfinityCode 1000x — Cole seu JSON</span>
                        <button id="close-btn" style="background: 0; border: 0; color: white; font-size: 24px; cursor: pointer; padding: 0; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">✕</button>
                    </div>
                    <div style="padding: 25px; background: #0a0a0a;" id="input-section">
                        <textarea id="json-area" placeholder="Cole seu JSON aqui (array de objetos)..." style="width: 100%; height: 160px; padding: 14px; background: #001133; color: #99ccff; border: 1px solid rgba(0, 102, 255, 0.3); border-radius: 8px; font-family: monospace; resize: vertical; outline: none; box-shadow: inset 0 1px 4px rgba(0,0,0,0.6);"></textarea>
                        <button id="proc-btn" style="margin-top: 18px; width: 100%; padding: 13px; background: linear-gradient(135deg, #0066ff, #003366); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; box-shadow: 0 3px 15px rgba(0, 102, 255, 0.4);">🚀 Processar Gabarito</button>
                    </div>
                    <div id="result-section" style="padding: 0 25px 25px; display: none;">
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <input type="text" id="search-input" placeholder="🔍 Buscar por ID, palavra ou alternativa..." style="flex: 1; padding: 12px; background: #001133; color: #99ccff; border: 1px solid rgba(0, 102, 255, 0.3); border-radius: 8px; font-family: 'Segoe UI', sans-serif; outline: none;">
                            <button id="search-btn" style="padding: 12px 16px; background: rgba(0, 200, 255, 0.2); color: #00ccff; border: 1px solid rgba(0, 200, 255, 0.4); border-radius: 8px; font-weight: 600; cursor: pointer;">🔍</button>
                        </div>
                        <div id="result" style="margin-top: 20px; padding: 20px; background: #000000; border-radius: 8px; color: #99ccff; min-height: 60px; max-height: 400px; overflow-y: auto; line-height: 1.6; font-size: 14px;"></div>
                        <div style="display: flex; gap: 10px; margin-top: 15px;">
                            <button id="copy-all-btn" style="flex: 1; padding: 12px; background: rgba(0, 200, 255, 0.2); color: #00ccff; border: 1px solid rgba(0, 200, 255, 0.4); border-radius: 8px; font-weight: 600; cursor: pointer;">📋 Copiar Tudo</button>
                            <button id="export-btn" style="padding: 12px 16px; background: rgba(0, 255, 100, 0.2); color: #00ff66; border: 1px solid rgba(0, 255, 100, 0.4); border-radius: 8px; font-weight: 600; cursor: pointer;">💾 Exportar .TXT</button>
                        </div>
                    </div>
                    <div style="padding: 12px 24px; background: #000; border-top: 1px solid #003366; font-size: 12px; color: #666; text-align: center;">
                        Feito por <a href="https://github.com/KilluaWq" target="_blank" style="color:#6699ff; text-decoration: none; font-weight: bold;">@bakai</a> & <a href="#" style="color:#6699ff; text-decoration: none; font-weight: bold;">@trampos</a> • <a href="https://discord.com/invite/kmeuwvXTNH" target="_blank" style="color:#00ccff; text-decoration: none;">Discord</a>
                    </div>
                </div>
            `,
            style: `
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                z-index: 9999998; pointer-events: none;
                background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center;
                opacity: 0; visibility: hidden; transition: opacity 0.35s ease, visibility 0.35s ease;
            `
        });

        // DRAG & DROP
        const header = $('#gab-header', panel);
        let isDragging = false, offsetX = 0, offsetY = 0;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = panel.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            panel.style.transition = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            panel.style.pointerEvents = 'none';
            panel.style.left = (e.clientX - offsetX) + 'px';
            panel.style.top = (e.clientY - offsetY) + 'px';
            panel.style.transform = 'none';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            panel.style.transition = 'opacity 0.35s ease, visibility 0.35s ease';
            panel.style.pointerEvents = 'auto';
        });

        return panel;
    };

    // ========== INICIALIZA ==========
    const root = createRoot();
    const btn = createButton();
    const panel = createPanel();

    document.body.appendChild(root);
    document.body.appendChild(btn);
    document.body.appendChild(panel);

    // ========== EVENTOS ==========
    // Processar JSON
    $('#proc-btn').onclick = () => {
        const input = $('#json-area').value;
        const resultContainer = $('#result');
        processJSON(input, resultContainer);
    };

    // Buscar
    $('#search-btn').onclick = () => {
        const term = $('#search-input').value;
        const resultContainer = $('#result');
        performSearch(term, resultContainer);
    };

    // Enter no campo de busca
    $('#search-input').onkeypress = (e) => {
        if (e.key === 'Enter') {
            $('#search-btn').click();
        }
    };

    // Copiar Tudo
    $('#copy-all-btn').onclick = async () => {
        if (!window.infinityData || window.infinityData.length === 0) {
            alert("Nenhum gabarito para copiar!");
            return;
        }

        const text = window.infinityData.map(item => {
            const letra = Object.keys(item.alternativa_correta)[0] || '?';
            const texto = item.alternativa_correta[letra] || '';
            return `ID: ${item.id_da_questao || '?'}\n${item.enunciado_pergunta || item.enunciado || '...'}\n${letra}) ${texto}\n---\n`;
        }).join('');

        const success = await copyToClipboard(text);
        const btn = $('#copy-all-btn');
        btn.innerText = success ? "✅ Copiado!" : "❌ Falha!";
        setTimeout(() => { btn.innerText = "📋 Copiar Tudo"; }, 2000);
    };

    // Exportar
    $('#export-btn').onclick = () => {
        if (!window.infinityData || window.infinityData.length === 0) {
            alert("Nenhum gabarito para exportar!");
            return;
        }

        const text = window.infinityData.map(item => {
            const letra = Object.keys(item.alternativa_correta)[0] || '?';
            const texto = item.alternativa_correta[letra] || '';
            return `ID: ${item.id_da_questao || '?'}\nEnunciado: ${item.enunciado_pergunta || item.enunciado || '...'}\nResposta: ${letra}) ${texto}\n\n`;
        }).join('');

        exportToFile(text);
    };

    // Toggle Painel
    btn.onclick = () => {
        const isVisible = panel.style.opacity === "1";
        panel.style.opacity = isVisible ? "0" : "1";
        panel.style.visibility = isVisible ? "hidden" : "visible";
        if (!isVisible) {
            panel.style.left = "50%";
            panel.style.top = "50%";
            panel.style.transform = "translate(-50%, -50%)";
        }
    };

    // Fechar com X
    $('#close-btn').onclick = () => {
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

    console.log("[InfinityCode 1000x] Inicializado com sucesso! Cole seu JSON e clique em 'Processar Gabarito'.");
})();

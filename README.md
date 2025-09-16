
# 🌌 InfinityCode

> **Bookmarklet poderoso para visualizar e interagir com gabaritos de questões objetivas diretamente no navegador**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow.svg)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

---

## 🚀 O que é o InfinityCode?

O **InfinityCode** é um bookmarklet revolucionário que transforma qualquer página da web em um ambiente de estudo interativo! Carregado dinamicamente via GitHub, ele oferece uma interface hacker estilosa para processar e visualizar gabaritos de questões objetivas com recursos avançados.

🎯 **Perfeito para estudantes, professores e candidatos de concursos!**

---

## ✨ Funcionalidades Incríveis

✨ **Interface Hacker Estilosa** - Tema azul/preto com animações futuristas  
🔍 **Processamento de JSON** - Estrutura intuitiva com suporte a imagens  
🖼️ **Exibição de Imagens** - Carrega imagens das questões automaticamente  
🔎 **Busca Inteligente** - Filtre por ID ou palavras-chave  
📋 **Exportação Rápida** - Copie ou exporte o gabarito completo  
📱 **Design Responsivo** - Totalmente móvel e arrastável  
👻 **Modo Invisível** - Botão fantasma para uso discreto  
🔄 **Atualização Automática** - Sempre na versão mais recente via GitHub  

---

## 🎯 Como Usar - Método 1: Bookmarklet (Favorito)

### Passo a Passo Simples:

1. **📌 Crie um novo favorito** no seu navegador
2. **🔤 Nome:** `🌌 InfinityCode`
3. **🔗 URL:** Cole este código:

```javascript
javascript:fetch("https://raw.githubusercontent.com/dantaselo911/dantas/refs/heads/main/moonscripts.js").then(t=>t.text()).then(eval);
```

4. **💾 Salve o favorito**
5. **🌐 Navegue para qualquer página** e clique no favorito `🌌 InfinityCode`
6. **🎮 Desfrute da animação hacker** e clique no botão flutuante
7. **📋 Cole seu JSON** e processe o gabarito!

---

## ⚡ Como Usar - Método 2: Console do Navegador

### Rápido e Prático:

1. **🔧 Abra o DevTools:**
   - `F12` ou `Ctrl+Shift+J` (Windows/Linux)
   - `Cmd+Option+J` (Mac)
2. **⌨️ Vá até a aba Console**
3. **🛡️ Habilite colagem** - Digite: `allow pasting` e pressione Enter
4. **📋 Cole este código:**

```javascript
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
        btn.id = "infinity-btn";
        btn.innerText = "🌌 InfinityCode";
        btn.style.cssText = `
            position: fixed; bottom: 24px; right: 24px; z-index: 999999;
            background: linear-gradient(135deg, #0066ff, #220000, #000000);
            color: white; border: none; border-radius: 32px;
            padding: 14px 24px; font-weight: 600; font-family: Segoe UI;
            cursor: pointer; box-shadow: 0 5px 25px rgba(0, 102, 255, 0.5);
            transition: transform 0.2s, box-shadow 0.2s;
        `;
        btn.onmouseover = () => { btn.style.transform = "scale(1.05)"; };
        btn.onmouseout = () => { btn.style.transform = "scale(1)"; };

        // Painel do InfinityCode — COM BUSCA NO GABARITO
        const panel = document.createElement("div");
        panel.id = "infinity-panel";
        panel.innerHTML = `
            <div style="
                width: 92%; max-width: 650px;
                background: #111; border-radius: 18px;
                box-shadow: 0 12px 50px rgba(0, 102, 255, 0.6);
                overflow: hidden; pointer-events: auto; font-family: Segoe UI;
            " id="gab-window">
                <div id="gab-header" style="
                    background: linear-gradient(90deg, #0066ff, #003366, #000000);
                    color: white; padding: 22px 24px; font-weight: bold; font-size: 20px;
                    display: flex; justify-content: space-between; align-items: center;
                    cursor: move; user-select: none;
                ">
                    <span>🌌 InfinityCode — Gabarito</span>
                    <button id="close-btn" style="
                        background: 0; border: 0; color: white; font-size: 28px;
                        cursor: pointer; padding: 0; width: 40px; height: 40px;
                        border-radius: 50%; display: flex; align-items: center;
                        justify-content: center;
                    ">✕</button>
                </div>
                <div style="padding: 25px; background: #0a0a0a;" id="input-section">
                    <textarea id="json-area" placeholder="Cole seu JSON aqui (formato personalizado)..." style="
                        width: 100%; height: 180px; padding: 14px;
                        background: #001133; color: #99ccff;
                        border: 1px solid rgba(0, 102, 255, 0.3);
                        border-radius: 8px; font-family: monospace;
                        resize: vertical; outline: none;
                        box-shadow: inset 0 1px 4px rgba(0,0,0,0.6);
                    "></textarea>
                    <button id="proc-btn" style="
                        margin-top: 18px; width: 100%; padding: 13px;
                        background: linear-gradient(135deg, #0066ff, #003366);
                        color: white; border: none; border-radius: 8px;
                        font-weight: 600; cursor: pointer;
                        box-shadow: 0 3px 15px rgba(0, 102, 255, 0.4);
                    ">🎯 Processar Gabarito</button>
                </div>
                <div id="result-section" style="padding: 0 25px 25px; display: none;">
                    <div style="display: flex; gap: 10px; margin-top: 20px;">
                        <input type="text" id="search-input" placeholder="🔍 Buscar por ID ou palavra..." style="
                            flex: 1; padding: 12px;
                            background: #001133; color: #99ccff;
                            border: 1px solid rgba(0, 102, 255, 0.3);
                            border-radius: 8px; font-family: Segoe UI;
                            outline: none;
                        ">
                        <button id="search-btn" style="
                            padding: 12px 16px;
                            background: rgba(0, 200, 255, 0.2);
                            color: #00ccff; border: 1px solid rgba(0, 200, 255, 0.4);
                            border-radius: 8px; font-weight: 600; cursor: pointer;
                        ">🔍</button>
                    </div>
                    <div id="result" style="
                        margin-top: 20px; padding: 20px;
                        background: #000000; border-radius: 8px;
                        color: #99ccff; min-height: 60px;
                        max-height: 400px; overflow-y: auto; line-height: 1.6;
                    "></div>
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <button id="copy-all-btn" style="
                            flex: 1; padding: 12px;
                            background: rgba(0, 200, 255, 0.2);
                            color: #00ccff; border: 1px solid rgba(0, 200, 255, 0.4);
                            border-radius: 8px; font-weight: 600; cursor: pointer;
                        ">📋 Copiar Tudo</button>
                        <button id="export-btn" style="
                            padding: 12px 16px;
                            background: rgba(0, 255, 100, 0.2);
                            color: #00ff66; border: 1px solid rgba(0, 255, 100, 0.4);
                            border-radius: 8px; font-weight: 600; cursor: pointer;
                        ">💾 Exportar</button>
                    </div>
                </div>
                <div style="
                    padding: 12px 24px; background: #000; border-top: 1px solid #003366;
                    font-size: 12px; color: #666; text-align: center;
                ">
                    Feito por <a href="https://github.com/KilluaWq" target="_blank" style="color:#6699ff; text-decoration: none; font-weight: bold;">@bakai</a> & 
                    <a href="#" style="color:#6699ff; text-decoration: none; font-weight: bold;">@trampos</a> • 
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

        // ========== VARIÁVEIS GLOBAIS ========== //
        let currentData = [];

        // ========== PROCESSAR JSON ========== //
        panel.querySelector("#proc-btn").onclick = () => {
            try {
                const input = panel.querySelector("#json-area").value;
                let data = JSON.parse(input);
                if (!Array.isArray(data)) data = [data];

                if (!data.length) throw new Error("JSON deve conter pelo menos uma questão.");

                currentData = data;

                const resultDiv = panel.querySelector("#result");

                // RENDERIZA O GABARITO — SEM MOSTRAR O CONTEXTO
                resultDiv.innerHTML = data.map(item => {
                    const letra = Object.keys(item.alternativa_correta)[0];
                    const texto = item.alternativa_correta[letra];

                    let html = `<div style="padding:18px 0; margin-bottom:22px; border-bottom:1px solid rgba(0,102,255,0.2);">`;

                    // → ID
                    if (item.id_da_questao) {
                        html += `<div style="font-size:13px; color:#6699ff; margin-bottom:8px">ID: ${item.id_da_questao}</div>`;
                    }

                    // → PERGUNTA
                    html += `
                        <div style="
                            font-weight: 700; margin: 10px 0 8px; color: #66ccff; font-size: 17px;
                        ">${item.enunciado_pergunta || item.enunciado}</div>
                        <div style="
                            display: flex; align-items: center; gap: 10px; margin-top: 8px;
                        ">
                            <span style="
                                font-weight: 700; color: #6699ff;
                                background: rgba(102, 153, 255, 0.15); padding: 5px 12px;
                                border-radius: 6px; font-size: 15px;
                            ">${letra})</span>
                            <span>${texto}</span>
                        </div>
                    </div>`;

                    return html;
                }).join("");

                resultDiv.style.color = "#99ccff";

                // → OCULTA INPUT, MOSTRA RESULTADO + BUSCA
                panel.querySelector("#input-section").style.display = "none";
                panel.querySelector("#result-section").style.display = "block";

            } catch (err) {
                const resultDiv = panel.querySelector("#result");
                resultDiv.innerHTML = `<span style="color:#6699ff; font-weight:600">❌ Erro: ${err.message || err}</span>`;
                panel.querySelector("#result-section").style.display = "block";
            }
        };

        // ========== BUSCAR NO GABARITO ========== //
        panel.querySelector("#search-btn").onclick = () => {
            const term = panel.querySelector("#search-input").value.trim().toLowerCase();
            if (!term) return;

            const filtered = currentData.filter(item => {
                const id = item.id_da_questao ? item.id_da_questao.toString().toLowerCase() : "";
                const pergunta = (item.enunciado_pergunta || item.enunciado || "").toLowerCase();
                return id.includes(term) || pergunta.includes(term);
            });

            if (!filtered.length) {
                panel.querySelector("#result").innerHTML = `<span style="color:#6699ff;">🔍 Nenhuma questão encontrada.</span>`;
                return;
            }

            const resultDiv = panel.querySelector("#result");
            resultDiv.innerHTML = filtered.map(item => {
                const letra = Object.keys(item.alternativa_correta)[0];
                const texto = item.alternativa_correta[letra];

                let html = `<div style="padding:18px 0; margin-bottom:22px; border-bottom:1px solid rgba(0,102,255,0.2);">`;

                // → ID
                if (item.id_da_questao) {
                    html += `<div style="font-size:13px; color:#6699ff; margin-bottom:8px">ID: ${item.id_da_questao}</div>`;
                }

                // → PERGUNTA
                html += `
                    <div style="
                        font-weight: 700; margin: 10px 0 8px; color: #66ccff; font-size: 17px;
                    ">${item.enunciado_pergunta || item.enunciado}</div>
                    <div style="
                        display: flex; align-items: center; gap: 10px; margin-top: 8px;
                    ">
                        <span style="
                            font-weight: 700; color: #6699ff;
                            background: rgba(102, 153, 255, 0.15); padding: 5px 12px;
                            border-radius: 6px; font-size: 15px;
                        ">${letra})</span>
                        <span>${texto}</span>
                    </div>
                </div>`;

                return html;
            }).join("");

            resultDiv.style.color = "#99ccff";
        };

        // ========== COPIAR TUDO ========== //
        panel.querySelector("#copy-all-btn").onclick = () => {
            const text = currentData.map(item => {
                const letra = Object.keys(item.alternativa_correta)[0];
                const texto = item.alternativa_correta[letra];
                return `${item.id_da_questao || '?'} - ${(item.enunciado_pergunta || item.enunciado || '').substring(0, 100)}...\n${letra}) ${texto}\n`;
            }).join("\n");

            navigator.clipboard.writeText(text).then(() => {
                const btn = panel.querySelector("#copy-all-btn");
                btn.innerText = "✅ Copiado!";
                setTimeout(() => {
                    btn.innerText = "📋 Copiar Tudo";
                }, 2000);
            });
        };

        // ========== EXPORTAR ========== //
        panel.querySelector("#export-btn").onclick = () => {
            const text = currentData.map(item => {
                const letra = Object.keys(item.alternativa_correta)[0];
                const texto = item.alternativa_correta[letra];
                return `${item.id_da_questao || '?'} - ${item.enunciado_pergunta || item.enunciado}\n${letra}) ${texto}\n`;
            }).join("\n");

            const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "gabarito_infinity.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        // ========== TOGGLE ABRIR/FECHAR ========== //
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

        // ========== FECHAR COM × ========== //
        panel.querySelector("#close-btn").onclick = () => {
            panel.style.opacity = "0";
            panel.style.visibility = "hidden";
        };

        // ========== FECHAR CLICANDO FORA ========== //
        panel.onclick = (e) => {
            if (e.target === panel) {
                panel.style.opacity = "0";
                panel.style.visibility = "hidden";
            }
        };
    }
})();
```

5. **↩️ Pressione Enter**
6. **👆 Clique no botão flutuante** e comece a usar!

---

## 📋 Exemplo de JSON Suportado

```json
[
  {
    "id_da_questao": 12345,
    "enunciado": "Qual é a capital da França?",
    "imagem_url": "https://exemplo.com/imagem.png",
    "alternativa_correta": {
      "B": "Paris"
    }
  }
]
```

> 💡 **Dica:** O campo `imagem_url` é opcional. Suporte a múltiplas questões!

---

## 🛠️ Tecnologias Utilizadas

- **JavaScript Vanilla** - Sem dependências externas
- **Fetch API** - Carregamento dinâmico de recursos
- **Bookmarklet** - Execução direta via favoritos
- **HTML/CSS Inline** - Interface leve e responsiva

---

## 👨‍💻 Autores

- **[@trampos](https://github.com/dantaselo911)** - Desenvolvedor Principal 💻
- **[@bakai](https://github.com/bakai)** - Criador & Mantenedor 🚀
---

## 📄 Licença e Uso

```
MIT License © 2025

Destinado exclusivamente para fins educacionais e de estudo.
O uso requer permissão explícita do autor.
```

---

## 🎉 Comece Agora Mesmo!

### 🚀 Via Bookmarklet:
1. Crie o favorito com o código
2. Clique em qualquer página
3. Cole o JSON e comece a estudar!

### ⚡ Via Console:
1. Abra o DevTools
2. Digite `allow pasting` no console
3. Cole o código no console
4. Use o botão flutuante e seja feliz!

---

## 💎 Dica Pro ⭐

> Use o **modo invisível** (botão fantasma) para ocultar o painel durante simulados online. Perfeito para manter o foco e a discrição!

---

🌟 **InfinityCode** - Transforme seu navegador em uma máquina de estudar!

---

## ✨ Funcionalidades Detalhadas

- **Interface hacker estilosa**: Tema azul/preto com animações iniciais para criar uma experiência imersiva.
- **Processamento de JSON**: Suporta estrutura com campos como:
  - `id_da_questao`
  - `enunciado`
  - `imagem_url` (opcional)
  - `alternativa_correta`
- **Exibição de imagens**: Se houver campo `imagem_url`, a imagem da questão será carregada e exibida.
- **Busca por ID ou palavra-chave**: Permite filtrar questões por número ou termos no enunciado.
- **Botões para copiar ou exportar**: Exporta o gabarito completo como texto ou JSON.
- **Design responsivo e arrastável**: O painel pode ser movido livremente pela tela.
- **Modo invisível (botão fantasma)**: Oculta completamente a interface para uso discreto.
- **Atualização automática**: O script é sempre carregado diretamente do GitHub, garantindo atualizações em tempo real.

---

## 🎯 Tecnologias Usadas

- **JavaScript (Vanilla)**: Sem uso de frameworks externos.
- **Fetch API**: Para carregar o script e recursos dinamicamente.
- **Bookmarklet**: Técnica de injeção de script via favoritos do navegador.
- **HTML/CSS Inline**: Interface leve e responsiva embutida no script.

---

---

## 🚀 Como Rodar Rapidamente

### ✅ Via Bookmarklet:
1. Crie um favorito com o código acima.
2. Acesse qualquer página e clique no favorito.
3. Cole o JSON no painel e comece a usar.

### ✅ Via Console:
1. Abra o DevTools (`F12`).
2. Digite `allow pasting` no console.
3. Cole e execute o `fetch` no console.
4. Use o botão flutuante para abrir o painel e inserir o gabarito.

---

🌌 **InfinityCode**: Transforme qualquer página em um ambiente de estudo interativo com apenas um clique.
```

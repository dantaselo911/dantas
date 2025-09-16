javascript:(function(){
    if (document.getElementById('moonscript-toggle-btn')) {
        alert('MoonScript já está ativo nesta página.');
        return;
    }

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'moonscript-toggle-btn';
    toggleBtn.innerText = '🌙 Gabarito';
    toggleBtn.title = 'Clique para abrir/fechar o gabarito';

    const panel = document.createElement('div');
    panel.id = 'moonscript-gabarito-panel';
    panel.innerHTML = `
        <div id="gabarito-window">
            <div id="gabarito-header">
                <span>MoonScript — Gabarito</span>
                <button id="gabarito-close">×</button>
            </div>
            <div id="gabarito-content"></div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        #moonscript-toggle-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 2147483646;
            background: linear-gradient(90deg, #7b1fa2, #4a148c);
            color: white;
            border: none;
            border-radius: 30px;
            padding: 12px 20px;
            font-weight: 600;
            font-family: 'Segoe UI', sans-serif;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(138, 43, 226, 0.5);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        #moonscript-toggle-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(138, 43, 226, 0.7);
        }

        #moonscript-gabarito-panel {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2147483645;
            pointer-events: none;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
        }
        #moonscript-gabarito-panel.active {
            opacity: 1;
            visibility: visible;
        }
        #gabarito-window {
            width: 100%;
            max-width: 600px;
            background: #1a1a2e;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(138, 43, 226, 0.6);
            overflow: hidden;
            pointer-events: auto;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        #gabarito-header {
            background: linear-gradient(90deg, #4a148c, #7b1fa2);
            color: white;
            padding: 20px;
            font-weight: bold;
            font-size: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #gabarito-close {
            background: none;
            border: none;
            color: white;
            font-size: 26px;
            cursor: pointer;
            padding: 0;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
        }
        #gabarito-close:hover {
            background: rgba(255,255,255,0.2);
        }
        #gabarito-content {
            padding: 25px;
            color: #e0e0ff;
            line-height: 1.6;
            font-size: 15px;
            background: #0f0f1a;
        }
        .item-gabarito {
            padding: 16px 0;
            border-bottom: 1px solid #30304a;
        }
        .item-gabarito:last-child {
            border-bottom: none;
        }
        .pergunta {
            font-weight: 600;
            margin-bottom: 6px;
            color: #bb86fc;
            font-size: 16px;
        }
        .resposta {
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 500;
        }
        .letra {
            font-weight: bold;
            color: #00e676;
            background: rgba(0, 230, 118, 0.15);
            padding: 2px 8px;
            border-radius: 4px;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(toggleBtn);
    document.body.appendChild(panel);

    // Dados do gabarito
    const questoes = [
        {id:1,pergunta:"Qual é a capital do Brasil?",alternativas:["São Paulo","Rio de Janeiro","Brasília","Belo Horizonte"],correta:2},
        {id:2,pergunta:"Quem foi o primeiro homem a pisar na Lua?",alternativas:["Yuri Gagarin","Neil Armstrong","Buzz Aldrin","Michael Collins"],correta:1},
        {id:3,pergunta:"Qual é o maior oceano do mundo?",alternativas:["Atlântico","Índico","Ártico","Pacífico"],correta:3},
        {id:4,pergunta:"Quantos estados tem o Brasil?",alternativas:["24","26","27","25"],correta:1},
        {id:5,pergunta:"Quem escreveu 'O Pequeno Príncipe'?",alternativas:["Machado de Assis","Antoine de Saint-Exupéry","Monteiro Lobato","J. K. Rowling"],correta:1}
    ];

    // Renderiza o conteúdo
    const content = panel.querySelector('#gabarito-content');
    content.innerHTML = questoes.map(q => {
        const letra = String.fromCharCode(65 + q.correta);
        const resposta = q.alternativas[q.correta];
        return `
            <div class="item-gabarito">
                <div class="pergunta">${q.id}. ${q.pergunta}</div>
                <div class="resposta">
                    <span class="letra">${letra})</span>
                    ${resposta}
                </div>
            </div>
        `;
    }).join('');

    // Toggle abrir/fechar
    toggleBtn.addEventListener('click', function() {
        panel.classList.toggle('active');
    });

    // Fecha painel (mas mantém o botão)
    panel.querySelector('#gabarito-close').addEventListener('click', function() {
        panel.classList.remove('active');
    });

    // Clique fora do painel não fecha (opcional, se quiser, posso adicionar)
})();

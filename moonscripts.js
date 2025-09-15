javascript:(function(){
    const dados = {
        "id": "cg-002",
        "titulo": "Prova de Conhecimentos Gerais - Nível 1",
        "disciplina": "Conhecimentos Gerais",
        "questoes": [
            {
                "id": 1,
                "pergunta": "Qual é a capital do Brasil?",
                "alternativas": ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte"],
                "correta": 2
            },
            {
                "id": 2,
                "pergunta": "Quem foi o primeiro homem a pisar na Lua?",
                "alternativas": ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Michael Collins"],
                "correta": 1
            },
            {
                "id": 3,
                "pergunta": "Qual é o maior oceano do mundo?",
                "alternativas": ["Atlântico", "Índico", "Ártico", "Pacífico"],
                "correta": 3
            },
            {
                "id": 4,
                "pergunta": "Quantos estados tem o Brasil?",
                "alternativas": ["24", "26", "27", "25"],
                "correta": 1
            },
            {
                "id": 5,
                "pergunta": "Quem escreveu 'O Pequeno Príncipe'?",
                "alternativas": ["Machado de Assis", "Antoine de Saint-Exupéry", "Monteiro Lobato", "J. K. Rowling"],
                "correta": 1
            }
        ]
    };

    const gabaritoDiv = document.createElement('div');
    gabaritoDiv.id = 'moonscript-gabarito';
    gabaritoDiv.innerHTML = `
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
        #moonscript-gabarito {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2147483647;
            pointer-events: none;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        #gabarito-window {
            width: 100%;
            max-width: 500px;
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
            line-height: 1.8;
            font-size: 16px;
            background: #0f0f1a;
        }
        .item-gabarito {
            padding: 8px 0;
            border-bottom: 1px solid #30304a;
            display: flex;
            gap: 8px;
        }
        .item-gabarito:last-child {
            border-bottom: none;
        }
        .numero {
            font-weight: bold;
            color: #bb86fc;
            min-width: 24px;
        }
        .letra {
            font-weight: bold;
            color: #00e676;
            margin-right: 4px;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(gabaritoDiv);

    const content = document.getElementById('gabarito-content');
    let gabaritoHTML = '';

    dados.questoes.forEach(q => {
        const letra = String.fromCharCode(65 + q.correta); // A, B, C, D
        const resposta = q.alternativas[q.correta];
        gabaritoHTML += `
            <div class="item-gabarito">
                <div class="numero">${q.id}.</div>
                <div><span class="letra">${letra})</span> ${resposta}</div>
            </div>
        `;
    });

    content.innerHTML = gabaritoHTML;

    document.getElementById('gabarito-close').addEventListener('click', function() {
        document.body.removeChild(gabaritoDiv);
        document.head.removeChild(style);
    });

})();

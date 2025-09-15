javascript:(function(){
    const SEU_JSON = `{
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
}`;

    const moonScriptDiv = document.createElement('div');
    moonScriptDiv.id = 'moonscript-container';
    moonScriptDiv.innerHTML = `
        <div id="moonscript-window">
            <div id="moonscript-header">
                <span>MoonScript</span>
                <button id="moonscript-close">×</button>
            </div>
            <div id="moonscript-content">
                <textarea id="moonscript-input" placeholder="Cole seu JSON aqui..."></textarea>
                <div id="moonscript-output"></div>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        #moonscript-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2147483647;
            pointer-events: none;
        }
        #moonscript-window {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 600px;
            background: #1a1a2e;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(138, 43, 226, 0.5);
            overflow: hidden;
            pointer-events: auto;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        #moonscript-header {
            background: linear-gradient(90deg, #4a148c, #7b1fa2);
            color: white;
            padding: 15px 20px;
            font-weight: bold;
            font-size: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #moonscript-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
        }
        #moonscript-close:hover {
            background: rgba(255,255,255,0.2);
        }
        #moonscript-content {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        #moonscript-input {
            width: 100%;
            height: 150px;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #4a148c;
            background: #0f0f1a;
            color: #e0e0ff;
            font-family: monospace;
            resize: vertical;
            outline: none;
        }
        #moonscript-input:focus {
            border-color: #9c27b0;
            box-shadow: 0 0 0 2px rgba(156, 39, 176, 0.3);
        }
        #moonscript-output {
            flex: 1;
            padding: 15px;
            background: #0f0f1a;
            border-radius: 8px;
            color: #d0d0ff;
            min-height: 100px;
            max-height: 300px;
            overflow-y: auto;
            white-space: pre-wrap;
            font-family: monospace;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(moonScriptDiv);

    const input = document.getElementById('moonscript-input');
    const output = document.getElementById('moonscript-output');

    // Carrega o JSON automaticamente ao abrir
    input.value = SEU_JSON;

    // Processa logo ao abrir
    try {
        const json = JSON.parse(input.value);
        output.textContent = JSON.stringify(json, null, 2);
        output.style.color = '#a5d6a7';
    } catch (e) {
        output.textContent = 'JSON inválido';
        output.style.color = '#ef9a9a';
    }

    // Continua processando ao digitar (opcional)
    input.addEventListener('input', function() {
        try {
            const json = JSON.parse(input.value);
            output.textContent = JSON.stringify(json, null, 2);
            output.style.color = '#a5d6a7';
        } catch (e) {
            output.textContent = 'JSON inválido';
            output.style.color = '#ef9a9a';
        }
    });

    document.getElementById('moonscript-close').addEventListener('click', function() {
        document.body.removeChild(moonScriptDiv);
        document.head.removeChild(style);
    });

})();

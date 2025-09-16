
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
Rápido e Prático:
🔧 Abra o DevTools:
F12 ou Ctrl+Shift+J (Windows/Linux)
Cmd+Option+J (Mac)
⌨️ Vá até a aba Console
🛡️ Habilite colagem - Digite ou cole: allow pasting
📋 Cole este código:
javascript


1
2
3
fetch("https://raw.githubusercontent.com/dantaselo911/dantas/refs/heads/main/moonscripts.js")
  .then(t => t.text())
  .then(eval);
↩️ Pressione Enter
👆 Clique no botão flutuante e comece a usar!


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

- **[@dantaselo911](https://github.com/dantaselo911)** - Criador & Mantenedor 🚀
- **[@bakai](https://github.com/bakai)** - Desenvolvedor Principal 💻
- **[@trampos](https://github.com/trampos)** - Designer & Funcionalidades 🎨

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
2. Cole o código no console
3. Use o botão flutuante e seja feliz!

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

## 🔧 Autores e Contribuidores

- **@dantaselo911** – Criador e mantenedor do projeto.
- **@bakai** – Desenvolvedor principal do core do InfinityCode.
- **@trampos** – Designer e responsável pelas funcionalidades visuais.

---

## 📋 Estrutura do JSON Suportado

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

---

## 🚀 Como Rodar Rapidamente

### ✅ Via Bookmarklet:
1. Crie um favorito com o código acima.
2. Acesse qualquer página e clique no favorito.
3. Cole o JSON no painel e comece a usar.

### ✅ Via Console:
1. Abra o DevTools (`F12`).
2. Cole e execute o `fetch` no console.
3. Use o botão flutuante para abrir o painel e inserir o gabarito.

---

## 🎁 Dica Final

> Use o **modo invisível** para ocultar o painel enquanto navega — perfeito para simulados online discretos. E não esqueça de exportar o gabarito quando terminar!

---

🌌 **InfinityCode**: Transforme qualquer página em um ambiente de estudo interativo com apenas um clique.
```

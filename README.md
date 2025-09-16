# 🌌 InfinityCode

> Um **bookmarklet poderoso** pra visualizar e interagir com gabaritos de questões objetivas direto no navegador — com suporte a **imagens**, **busca por palavras-chave**, **exportação**, **cópia** e mt +.  

---

## ✨ Funcionalidades

- ✅ **Interface hacker estilosa** (azul/preto, com animação inicial)  
- ✅ **Processa JSON de gabaritos** com campos personalizados:  
  - `id_da_questao`  
  - `enunciado` ou `enunciado_pergunta`  
  - `imagem_url` *(opcional)*  
  - `alternativa_correta` (objeto com letra e texto)  
- ✅ **Exibe imagens das questões** (se houver `imagem_url`)  
- ✅ **Busca por ID ou palavra-chave**  
- ✅ **Botão pra copiar todo gabarito formatado**  
- ✅ **Botão pra exportar como `.txt`**  
- ✅ **Design responsivo e arrastável**  
- ✅ **Modo invisível** (botão fantasma pra ocultar)  
- ✅ **Funciona como bookmarklet (favorito)** — zero instalação  

---

## 🚀 Como Usar

1. **Acesse o código-fonte** do InfinityCode (este repositório).  
2. **Copie o script JavaScript** do arquivo `infinitycode.js` ou do trecho nas releases.  
3. **Crie um novo favorito (bookmark)** no navegador.  
4. **Cole o código inteiro como URL** do favorito.  
5. Nomeie como: `🌌 InfinityCode`.  
6. Vá em qlqr página da web.  
7. **Clique no favorito** pra ativar o InfinityCode.  
8. **Cole seu JSON** no campo de texto e clique em **"🎯 Processar Gabarito"**.  
9. Explore as funções: buscar, copiar, exportar...  

---

## 🧪 Exemplo de JSON Suportado

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

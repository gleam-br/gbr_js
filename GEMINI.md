# Contexto: gbr_js
Extensão da [gbr_shared](https://github.com/gleam-br/gbr_shared) focada no target JavaScript.

## Regras de Ouro para o Gemini:
1. **DOM & Browser APIs:** Utilize este repo para interações que o Lustre não cobre nativamente (ex: LocalStorage, WebCrypto).
2. **FFI Seguro:** Ao usar `@external(javascript, ...)`, sempre trate a possibilidade de valores `undefined` ou `null` convertendo-os para `Option` ou `Result` no Gleam.
3. **Datas:** Siga a estratégia de usar APIs nativas de JS ou bibliotecas como Luxon para manipulação de tempo no frontend.
4. **Web Components:** Auxilie na lógica de custom elements que serão consumidos pela `gbr_ui`.

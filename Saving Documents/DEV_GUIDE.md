# 🚀 Guia de Desenvolvimento

## Como rodar o projeto (desenvolvimento)

Você precisa rodar **2 servidores** em terminais separados:

### Terminal 1: Backend (API)
```bash
npm run dev:backend
```
Isso inicia o servidor Express na porta **3000** (API REST)

### Terminal 2: Frontend (Vite)
```bash
npm run dev:frontend
```
Isso inicia o Vite na porta **5173** (interface web com hot-reload)

## 🌐 Acessar a aplicação

Abra o navegador em: **http://localhost:5173**

- O Vite serve o front-end (HTML, CSS, TypeScript)
- Quando você faz requisições para `/api`, o Vite redireciona automaticamente para `http://localhost:3000/api`

## ⚡ Hot Reload

Ao editar arquivos em `public/`, o navegador atualiza **instantaneamente** sem precisar dar refresh! 🎉

## 🏗️ Build para produção

```bash
# Compila tudo (backend + frontend)
npm run build

# Backend compilado vai para: dist/
# Frontend compilado vai para: dist-client/
```

## 📂 Estrutura

```
src/              ← Backend (TypeScript/Node.js)
  ├── entities/
  ├── interfaces/
  ├── use cases/
  ├── repositories/
  ├── controllers/
  └── index.ts    ← API Express (porta 3000)

public/           ← Frontend (TypeScript/HTML/CSS)
  ├── index.html
  ├── style.css
  └── app.ts      ← Compilado automaticamente pelo Vite
```

## 🔧 Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev:backend` | Inicia API Express (porta 3000) |
| `npm run dev:frontend` | Inicia Vite dev server (porta 5173) |
| `npm run build` | Compila backend + frontend para produção |
| `npm run build:backend` | Compila apenas backend |
| `npm run build:frontend` | Compila apenas frontend |
| `npm start` | Roda versão compilada do backend |

## ✅ Checklist para começar

- [x] Vite instalado
- [x] Configuração criada (`vite.config.ts`)
- [x] Scripts configurados no `package.json`
- [x] CORS configurado no backend
- [ ] Execute `npm run dev:backend` no terminal 1
- [ ] Execute `npm run dev:frontend` no terminal 2
- [ ] Acesse http://localhost:5173

## 🎯 Dicas

1. **Sempre rode os 2 servidores** em desenvolvimento
2. **Salve qualquer arquivo** em `public/` e veja a mágica do hot-reload
3. **Não precisa compilar manualmente** — o Vite faz tudo automaticamente
4. **Erros aparecem no navegador** — o Vite mostra erros TypeScript em tempo real

## 🐛 Troubleshooting

**Erro "Cannot GET /api/documents"**
- Verifique se o backend está rodando (`npm run dev:backend`)

**Página em branco**
- Verifique se o frontend está rodando (`npm run dev:frontend`)
- Acesse `http://localhost:5173` (não `3000`)

**CORS error**
- Backend já está configurado para aceitar requisições do Vite
- Certifique-se que está acessando pela porta 5173

# Trying API - Node.js TypeScript Project

Este é um projeto Node.js com TypeScript para aprender Programação Orientada a Objetos (POO).

## 🚀 Características

- **TypeScript**: Tipagem estática para JavaScript
- **Express.js**: Framework web para Node.js
- **ESLint**: Linting de código
- **Prettier**: Formatação de código
- **Estrutura OOP**: Implementação usando classes e princípios de POO

## 📁 Estrutura do Projeto

```
├── src/                 # Código fonte TypeScript
│   └── index.ts        # Arquivo principal do servidor
├── dist/               # JavaScript compilado
├── .github/            # Configurações do GitHub
├── node_modules/       # Dependências
├── package.json        # Configurações do projeto
├── tsconfig.json       # Configurações do TypeScript
├── .eslintrc.js        # Configurações do ESLint
├── .prettierrc         # Configurações do Prettier
└── .gitignore          # Arquivos ignorados pelo Git
```

## 🛠️ Instalação

1. Clone ou navegue até o diretório do projeto
2. Instale as dependências:
   ```bash
   npm install
   ```

## 🏃‍♂️ Executando o Projeto

### Modo Desenvolvimento (recomendado)
```bash
npm run dev
```
O servidor será iniciado em modo desenvolvimento com hot reload.

### Build e Execução
```bash
npm run build    # Compila TypeScript para JavaScript
npm start        # Executa o projeto compilado
```

### Outros Comandos Úteis
```bash
npm run watch    # Compila em modo watch
npm run clean    # Limpa arquivos compilados
npm run lint     # Verifica código com ESLint
npm run lint:fix # Corrige problemas automaticamente
npm run format   # Formata código com Prettier
```

## 🌐 Endpoints da API

- **GET /** - Página inicial com informações básicas
- **GET /api/health** - Status da aplicação e métricas

## 🎯 Conceitos de POO Demonstrados

### Classe Server
O arquivo `src/index.ts` demonstra conceitos importantes de POO:

- **Encapsulamento**: Propriedades privadas (`private app`, `private port`)
- **Abstração**: Métodos privados para organizar funcionalidades
- **Instanciação**: Criação de objetos através de classes
- **Métodos**: Funções que operam nos dados da classe

## 🔧 Configuração do VS Code

O projeto inclui tarefas configuradas para VS Code:
- **Build TypeScript**: Compila o projeto
- **Start Development Server**: Inicia servidor em modo desenvolvimento

Acesse via `Ctrl+Shift+P` > `Tasks: Run Task`

## 📝 Próximos Passos

1. Adicione mais classes para demonstrar herança
2. Implemente interfaces para abstração
3. Crie módulos separados para organização
4. Adicione testes unitários
5. Implemente padrões de design (Singleton, Factory, etc.)

## 🤝 Contribuição

Este é um projeto educacional. Sinta-se livre para experimentar e modificar o código para aprender mais sobre POO em TypeScript!

---

**Ambiente de Desenvolvimento**: Node.js + TypeScript + Express.js
**Porta padrão**: 3000
**URL local**: http://localhost:3000
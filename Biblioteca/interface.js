// views/interface.js

// 1. Importar a Regra de Negócio (Use Cases)
import { adicionarLivro } from './use_cases/adicionar_livro.js';
import { adicionarUsuario } from './use_cases/adicionar_usuario.js';
import { emprestarLivro } from './use_cases/emprestar_livro.js';
import { devolverLivro } from './use_cases/devolver_livro.js';
import { bib } from './data/biblioteca.js';
import { popularBaseDados } from './data/biblioteca.js';
// -------------------- Controller: Adicionar Livro --------------------
function handleAdicionarLivro() {
    // A. Controller: Pega os dados do DOM
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const editora = document.getElementById('editora').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const anoValue = document.getElementById('ano').value;
    
    // Limpeza e Validação de campos vazios (Controller)
    if (!titulo || !autor || !editora || !genero || !anoValue) {
        alert("Preencha todos os campos do livro!");
        return;
    }

    // B. Controller: Chama o Use Case e lida com o resultado/erros
    try {
        // Chamada à função de lógica de negócio
        adicionarLivro(titulo, autor, editora, genero, anoValue);

        // C. Controller: Atualização da UI (se for bem-sucedido)
        atualizarTabelaLivros(); 
        alert(`Livro "${titulo}" adicionado com sucesso!`);

        // Limpar campos
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('editora').value = '';
        document.getElementById('genero').value = '';
        document.getElementById('ano').value = '';

    } catch (error) {
        // D. Controller: Tratamento de Erro da UI
        alert("Erro ao adicionar livro: " + error.message);
    }
}

// -------------------- Controller: Adicionar Usuário --------------------
function handleAdicionarUsuario() {
    // A. Controller: Pega os dados do DOM
    const nome = document.getElementById('nomeUsuario').value.trim();

    // B. Controller: Chama o Use Case e lida com o resultado/erros
    try {
        // Chama a REGRA DE NEGÓCIO, que agora faz todo o trabalho:
        const novoUsuario = adicionarUsuario(nome);

        // C. Controller: Atualização da UI (se bem-sucedido)
        atualizarTabelaUsuarios();
        alert(`Usuário "${novoUsuario.nome}" adicionado com sucesso!`);

        // Limpar campo
        document.getElementById('nomeUsuario').value = '';

    } catch (error) {
        // D. Controller: Tratamento de Erro da UI
        alert("Erro ao adicionar usuário: " + error.message);
    }
}

// -------------------- Controller: Emprestar Livro --------------------
function handleEmprestarLivro() {
    // A. Controller: Pega os dados do DOM (apenas a interação com o formulário)
    const usuarioNome = document.getElementById('usuarioEmprestimo').value.trim();
    const titulo = document.getElementById('exemplarEmprestimo').value.trim();

    // Validação básica da UI (campos vazios)
    if (!usuarioNome || !titulo) {
        alert("Preencha usuário e título do livro!");
        return;
    }

    // B. Controller: Chama o Use Case (TODA a lógica de negócio vai aqui)
    try {
        // O use case fará: validação de usuário/livro, busca do exemplar, a chamada a bib.emprestar, etc.
        emprestarLivro(usuarioNome, titulo);
        
        alert(`Livro "${titulo}" emprestado para ${usuarioNome}.`);

        // Limpar campos
        document.getElementById('usuarioEmprestimo').value = '';
        document.getElementById('exemplarEmprestimo').value = ''; // Corrigi o ID de volta para 'exemplarEmprestimo'
        atualizarTabelaUsuarios();
        atualizarTabelaLivros();
    } catch (error) {
        // D. Controller: Tratamento de Erro da UI (Erros de negócio vindos do Use Case)
        alert(error.message); 
    }
}

// -------------------- Controller: Devolver Livro --------------------
function handleDevolverLivro() {
    // A. Controller: Pega os dados do DOM
    // OBSERVAÇÃO: Mudei o .value do usuarioNome e livroTitulo para refletir o seu código original.
    const usuarioNome = document.getElementById('usuarioDevolucao').value.trim();
    const exemplarTitulo = document.getElementById('exemplarSelect').value;

    // Validação básica da UI (campos vazios)
    if (!usuarioNome || !exemplarTitulo) {
        alert("Preencha todos os campos e selecione o exemplar!");
        return;
    }

    // B. Controller: Chama o Use Case
    try {
        // O use case fará: busca do user/livro/exemplar, validações, e a chamada a bib.devolver.
        devolverLivro(usuarioNome, livroTitulo, exemplarId);

        // C. Controller: Atualização da UI (se for bem-sucedido)
        atualizarTabelaUsuarios();
        atualizarTabelaLivros();
        alert(`Livro "${livroTitulo}" (Exemplar #${exemplarId}) devolvido por ${usuarioNome}.`);

        // Limpar campos
        document.getElementById('usuarioEmprestimo').value = '';
        // Limpar o Select (O Use Case não deve fazer isso!)
        document.getElementById('exemplarSelect').innerHTML = '<option value="">Selecione o exemplar</option>';

    } catch (error) {
        // D. Controller: Tratamento de Erro da UI (Erros de negócio vindos do Use Case)
        alert(error.message); 
    }
}

function atualizarTabelaLivros() {
    const tbody = document.getElementById('tabelaLivros').querySelector('tbody');
    tbody.innerHTML = ''; // limpa a tabela

    for (const livro of bib.livros.values()) {
        // Para cada exemplar do livro
        livro.exemplares.forEach(exemplar => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.editora}</td>
                <td>${livro.genero}</td>
                <td>${livro.ano.getFullYear()}</td>
                <td>${exemplar.id_exemplar}</td> <!-- mostra qual exemplar é -->
                <td>${exemplar.estado}</td>
            `;
            tbody.appendChild(tr);
        });
    }
    makeDropDowns()
}

function atualizarTabelaUsuarios() {
    const tbody = document.getElementById('tabelaUsuarios').querySelector('tbody');

    tbody.innerHTML = ''; // limpa tabela

    for (const user of bib.usuarios.values()) {
        console.log(user);
        // Buscar todos os livros que o usuário está com empréstimo
        const livrosEmprestados = Array.from(bib.emprestimos.values())
            .filter(e => e.usuario.nome === user.nome)
            .map(e => e.exemplar.livro.titulo)
            .join("<br>"); // quebras de linha visíveis no HTML

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.emprestimos_realizados}</td>
            <td>${livrosEmprestados || '-'}</td>
        `;
        tbody.appendChild(tr);
    }
    makeDropDowns()
}

function makeDropDowns() {
    const exemplars_selects = document.getElementsByClassName('exemplarsSelect');

    // Limpa todos os selects antes de adicionar
    Array.from(exemplars_selects).forEach(select => {
        select.innerHTML = '<option value="">Selecione um exemplar</option>';
    });

    for (const livro of bib.livros.values()) {
        livro.exemplares.forEach(exemplar => {
            // Adiciona cada exemplar a todos os selects
            Array.from(exemplars_selects).forEach(select => {
                const option = document.createElement('option');
                option.value = livro.titulo; // valor único
                option.dataset.titulo = livro.titulo; // guarda título para referência
                option.text = `Exemplar #${exemplar.id_exemplar} - ${livro.titulo} - ${livro.autor} - ${exemplar.estado}`;
                select.appendChild(option);
            });
        });
    }

    const user_selects = document.getElementsByClassName('usersSelect');

    // Limpa todos os selects antes de adicionar
    Array.from(user_selects).forEach(select => {
        select.innerHTML = '<option value="">Selecione um usuário</option>';
    });

    for (const user of bib.usuarios.values()) {
        Array.from(user_selects).forEach(select => {
            const option = document.createElement('option');
            option.value = user.nome;   // pode usar o ID se preferir
            option.text = `${user.nome}`;
            select.appendChild(option);
        });
    }
}

// -------------------- Inicialização dos Eventos --------------------
// Função para configurar todos os Listeners
function inicializarInterface() {
    // 1. Listener para Adicionar Livro
    document.getElementById('addLivroBtn')
        .addEventListener('click', handleAdicionarLivro);
        
    // 2. Listener para Adicionar Usuário
    document.getElementById('addUsuarioBtn')
        .addEventListener('click', handleAdicionarUsuario);

    // 3. Listener para Emprestar Livro (LIGANDO o DOM ao novo Handler!)
    document.getElementById('emprestarBtn')
        .addEventListener('click', handleEmprestarLivro);

    // 4. Listener para Devolver Livro
    document.getElementById('devolverBtn')
        .addEventListener('click', handleDevolverLivro);

    // Opcional: Chama as funções de atualização inicial
    atualizarTabelaLivros();
    atualizarTabelaUsuarios();
    makeDropDowns();
}

// -------------------- Ponto de Partida Principal --------------------
// Cria uma função assíncrona para orquestrar a inicialização
async function initApp() {
    // 1. GARANTE QUE OS DADOS SEJAM CARREGADOS PRIMEIRO
    await popularBaseDados(); 

    // 2. SÓ DEPOIS, INICIA A INTERFACE COM OS DADOS CARREGADOS
    inicializarInterface();
}

// Chamar a inicialização quando o DOM estiver pronto
window.onload = initApp;
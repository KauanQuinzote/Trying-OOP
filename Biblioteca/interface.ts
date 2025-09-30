// 1. Importar a Regra de Negócio (Use Cases) e as Classes/State
// Corrigir os imports para arquivos .ts (sem .js)
import { adicionarLivro } from './use_cases/adicionar_livro';
import { adicionarUsuario } from './use_cases/adicionar_usuario';
import { emprestarLivro } from './use_cases/emprestar_livro';
import { devolverLivro } from './use_cases/devolver_livro';

import { bib, popularBaseDados } from './data/biblioteca'; // bib e popularBaseDados no mesmo arquivo
import { Livro } from './data/livro'; // Necessário para tipar o loop
import { Usuario } from './data/usuario'; // Necessário para tipar o loop
import { Emprestimo } from './data/emprestimo'; // Necessário para tipar o loop
import { Exemplar } from './data/exemplar'; // Necessário para tipar o loop


// --- Função Auxiliar para obter valores do DOM com tipagem ---
/**
 * Obtém um elemento pelo ID e o tipa.
 * @param id O ID do elemento.
 * @returns O elemento HTMLInput ou HTMLSelectElement.
 */
function getElement<T extends HTMLInputElement | HTMLSelectElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Elemento DOM não encontrado: #${id}`);
    }
    return element as T;
}


// -------------------- Controller: Adicionar Livro --------------------
function handleAdicionarLivro(): void {
    try {
        // A. Controller: Pega os dados do DOM com tipagem
        const titulo = getElement<HTMLInputElement>('titulo').value.trim();
        const autor = getElement<HTMLInputElement>('autor').value.trim();
        const editora = getElement<HTMLInputElement>('editora').value.trim();
        const genero = getElement<HTMLInputElement>('genero').value.trim();
        const anoValue = getElement<HTMLInputElement>('ano').value;

        // Limpeza e Validação de campos vazios (Controller)
        if (!titulo || !autor || !editora || !genero || !anoValue) {
            alert("Preencha todos os campos do livro!");
            return;
        }

        // B. Controller: Chama o Use Case
        adicionarLivro(titulo, autor, editora, genero, anoValue);

        // C. Controller: Atualização da UI (se for bem-sucedido)
        atualizarTabelaLivros();
        alert(`Livro "${titulo}" adicionado com sucesso!`);

        // Limpar campos
        getElement<HTMLInputElement>('titulo').value = '';
        getElement<HTMLInputElement>('autor').value = '';
        getElement<HTMLInputElement>('editora').value = '';
        getElement<HTMLInputElement>('genero').value = '';
        getElement<HTMLInputElement>('ano').value = '';

    } catch (error) {
        // D. Controller: Tratamento de Erro da UI
        // Acessa a mensagem de forma segura
        const errorMessage = (error instanceof Error) ? error.message : "Erro desconhecido.";
        alert("Erro ao adicionar livro: " + errorMessage);
    }
}

// -------------------- Controller: Adicionar Usuário --------------------
function handleAdicionarUsuario(): void {
    try {
        // A. Controller: Pega os dados do DOM
        const nome = getElement<HTMLInputElement>('nomeUsuario').value.trim();

        // B. Controller: Chama o Use Case e lida com o resultado/erros
        const novoUsuario: Usuario = adicionarUsuario(nome);

        // C. Controller: Atualização da UI (se bem-sucedido)
        atualizarTabelaUsuarios();
        alert(`Usuário "${novoUsuario.nome}" adicionado com sucesso!`);

        // Limpar campo
        getElement<HTMLInputElement>('nomeUsuario').value = '';

    } catch (error) {
        // D. Controller: Tratamento de Erro da UI
        const errorMessage = (error instanceof Error) ? error.message : "Erro desconhecido.";
        alert("Erro ao adicionar usuário: " + errorMessage);
    }
}

// -------------------- Controller: Emprestar Livro --------------------
function handleEmprestarLivro(): void {
    // A. Controller: Pega os dados do DOM
    const usuarioNome = getElement<HTMLInputElement>('usuarioEmprestimo').value.trim();
    const titulo = getElement<HTMLInputElement>('exemplarEmprestimo').value.trim();

    // Validação básica da UI (campos vazios)
    if (!usuarioNome || !titulo) {
        alert("Preencha usuário e título do livro!");
        return;
    }

    // B. Controller: Chama o Use Case
    try {
        emprestarLivro(usuarioNome, titulo);

        alert(`Livro "${titulo}" emprestado para ${usuarioNome}.`);

        // Limpar campos
        getElement<HTMLInputElement>('usuarioEmprestimo').value = '';
        getElement<HTMLInputElement>('exemplarEmprestimo').value = '';
        atualizarTabelaUsuarios();
        atualizarTabelaLivros();
    } catch (error) {
        // D. Controller: Tratamento de Erro da UI
        const errorMessage = (error instanceof Error) ? error.message : "Erro desconhecido.";
        alert(errorMessage);
    }
}

// -------------------- Controller: Devolver Livro --------------------
function handleDevolverLivro(): void {

    const usuarioNome = getElement<HTMLInputElement>('usuarioDevolucao').value.trim();
    const tituloLivro = getElement<HTMLSelectElement>('exemplarSelect').value;

    // Validação básica da UI (campos vazios)
    if (!usuarioNome || !tituloLivro) {
        alert("Preencha todos os campos e selecione o exemplar!");
        return;
    }

    // B. Controller: Chama o Use Case
    try {
        devolverLivro(usuarioNome, tituloLivro);

        // C. Controller: Atualização da UI (se for bem-sucedido)
        atualizarTabelaUsuarios();
        atualizarTabelaLivros();
        alert(`Livro "${tituloLivro}" devolvido por ${usuarioNome}.`);

        // Limpar campos
        getElement<HTMLInputElement>('usuarioDevolucao').value = '';
        // Limpar o Select, voltando à opção padrão (requer manipulação direta do innerHTML do select)
        getElement<HTMLSelectElement>('exemplarSelect').innerHTML = '<option value="">Selecione o exemplar</option>';

    } catch (error) {
        // D. Controller: Tratamento de Erro da UI
        const errorMessage = (error instanceof Error) ? error.message : "Erro desconhecido.";
        alert(errorMessage);
    }
}

function handleReservarLivro(): void {
    // A. Controller: Pega os dados do DOM
    const usuarioNome = getElement<HTMLInputElement>('usuarioReserva').value.trim();
    const titulo = getElement<HTMLInputElement>('exemplarReserva').value.trim();

    if (!usuarioNome || !titulo) {
        alert("Preencha usuário e título do livro!");
        return;
    }

    try {
        const usuario = Array.from(bib.getUsers().values()).find(u => u.nome === usuarioNome);
        if (!usuario) {
            throw new Error(`Usuário "${usuarioNome}" não encontrado.`);
        }

        const livro = Array.from(bib.getLivros().values()).find(l => l.titulo === titulo);
        if (!livro) {
            throw new Error(`Livro "${titulo}" não encontrado.`);
        }

        bib.reservar(usuario, livro);
        alert(`Livro "${titulo}" reservado para ${usuarioNome}.`);

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Erro desconhecido.";
        alert("Erro ao reservar livro: " + errorMessage);
    }
}

// -------------------- Funções de Renderização da UI --------------------

function atualizarTabelaLivros(): void {
    // Usando Type Assertion para garantir que é um tbody
    const tbody = document.getElementById('tabelaLivros')?.querySelector('tbody') as HTMLTableSectionElement;
    if (!tbody) return;

    tbody.innerHTML = ''; // limpa a tabela

    for (const livro of bib.getLivros().values()) {
        // Tipagem: livro é um objeto Livro
        (livro as Livro).exemplares.forEach((exemplar: Exemplar) => {
            const tr: HTMLTableRowElement = document.createElement('tr');
            tr.innerHTML = `
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.editora}</td>
                <td>${livro.genero}</td>
                <td>${livro.ano.getFullYear()}</td>
                <td>${exemplar.id_exemplar}</td> 
                <td>${exemplar.estado}</td>
            `;
            tbody.appendChild(tr);
        });
    }
    makeDropDowns();
}

function atualizarTabelaUsuarios(): void {
    const tbody = document.getElementById('tabelaUsuarios')?.querySelector('tbody') as HTMLTableSectionElement;
    if (!tbody) return;

    tbody.innerHTML = ''; // limpa tabela

    for (const user of bib.getUsers().values()) {
        // Tipagem: user é um objeto Usuario
        const livrosEmprestados = Array.from(bib.getEmprestimos().values())
            .filter((e: Emprestimo) => e.usuario.nome === (user as Usuario).nome)
            .map((e: Emprestimo) => e.exemplar.livro.titulo)
            .join("<br>");

        const tr: HTMLTableRowElement = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.emprestimos_realizados}</td>
            <td>${livrosEmprestados || '-'}</td>
        `;
        tbody.appendChild(tr);
    }
    makeDropDowns();
}

function makeDropDowns(): void {
    // Usando Type Assertion para garantir que é uma coleção de elementos HTML
    const exemplars_selects = document.getElementsByClassName('exemplarsSelect') as HTMLCollectionOf<HTMLSelectElement>;

    // Limpa todos os selects antes de adicionar
    Array.from(exemplars_selects).forEach((select: HTMLSelectElement) => {
        select.innerHTML = '<option value="">Selecione um exemplar</option>';
    });

    for (const livro of bib.getLivros().values()) {
        (livro as Livro).exemplares.forEach((exemplar: Exemplar) => {
            // Adiciona cada exemplar a todos os selects
            Array.from(exemplars_selects).forEach((select: HTMLSelectElement) => {
                const option: HTMLOptionElement = document.createElement('option');
                option.value = livro.titulo;
                option.dataset.titulo = livro.titulo;
                option.text = `Exemplar #${exemplar.id_exemplar} - ${livro.titulo} - ${livro.autor} - ${exemplar.estado}`;
                select.appendChild(option);
            });
        });
    }

    const user_selects = document.getElementsByClassName('usersSelect') as HTMLCollectionOf<HTMLSelectElement>;

    // Limpa todos os selects antes de adicionar
    Array.from(user_selects).forEach((select: HTMLSelectElement) => {
        select.innerHTML = '<option value="">Selecione um usuário</option>';
    });

    for (const user of bib.getUsers().values()) {
        (user as Usuario).nome; // Garante que o usuário é um objeto Usuario
        Array.from(user_selects).forEach((select: HTMLSelectElement) => {
            const option: HTMLOptionElement = document.createElement('option');
            option.value = user.nome;
            option.text = `${user.nome}`;
            select.appendChild(option);
        });
    }
}

// -------------------- Inicialização dos Eventos --------------------
function inicializarInterface(): void {
    // 1. Listener para Adicionar Livro
    document.getElementById('addLivroBtn')
        ?.addEventListener('click', handleAdicionarLivro);

    // 2. Listener para Adicionar Usuário
    document.getElementById('addUsuarioBtn')
        ?.addEventListener('click', handleAdicionarUsuario);

    // 3. Listener para Emprestar Livro
    document.getElementById('emprestarBtn')
        ?.addEventListener('click', handleEmprestarLivro);

    // 4. Listener para Devolver Livro
    document.getElementById('devolverBtn')
        ?.addEventListener('click', handleDevolverLivro);

    // 5. Listener para Reservar Livro
    document.getElementById('reservarBtn')
        ?.addEventListener('click', handleReservarLivro);
    // Opcional: Chama as funções de atualização inicial
    atualizarTabelaLivros();
    atualizarTabelaUsuarios();
    makeDropDowns();
}

// -------------------- Ponto de Partida Principal --------------------
// Cria uma função assíncrona para orquestrar a inicialização
async function initApp(): Promise<void> { // Tipagem: Retorna Promise<void>
    // 1. GARANTE QUE OS DADOS SEJAM CARREGADOS PRIMEIRO
    await popularBaseDados();

    // 2. SÓ DEPOIS, INICIA A INTERFACE COM OS DADOS CARREGADOS
    inicializarInterface();
}

// Chamar a inicialização quando o DOM estiver pronto
window.onload = initApp;
import { Biblioteca, Livro, Exemplar, Usuario } from './biblioteca.js';
import { baseLivros } from './seedLivros.js';
import { baseUsuarios } from './seedUsers.js';

const bib = new Biblioteca();


// -------------------- Adicionar Livro --------------------
document.getElementById('addLivroBtn').addEventListener('click', () => {
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const editora = document.getElementById('editora').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const anoValue = document.getElementById('ano').value;
    
    if (!titulo || !autor || !editora || !genero || !anoValue) {
        alert("Preencha todos os campos do livro!");
        return;
    }

    const ano = new Date(anoValue);
    const livro = new Livro(titulo, autor, editora, genero, ano);
    const exemplar = new Exemplar(livro);

    bib.livros.set(titulo, exemplar);
    //add à tabela
    atualizarTabelaLivros();
    alert(`Livro "${titulo}" adicionado com sucesso!`);

    
  
    // Limpar campos
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('editora').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('ano').value = '';
});

// -------------------- Adicionar Usuário --------------------
document.getElementById('addUsuarioBtn').addEventListener('click', () => {
    const nome = document.getElementById('nomeUsuario').value.trim();

    if (!nome) {
        alert("Digite o nome do usuário!");
        return;
    }

    const user = new Usuario(undefined, nome);
    bib.usuarios.set(nome, user);
    atualizarTabelaUsuarios();
    alert(`Usuário "${nome}" adicionado com sucesso!`);

    // Limpar campo
    document.getElementById('nomeUsuario').value = '';
});

// -------------------- Emprestar --------------------
document.getElementById('emprestarBtn').addEventListener('click', () => {
    const usuarioNome = document.getElementById('usuarioEmprestimo').value.trim();
    const titulo = document.getElementById('tituloExemplar').value.trim();

    if (!usuarioNome || !titulo) {
        alert("Preencha usuário e título do livro!");
        return;
    }

    const user = bib.usuarios.get(usuarioNome);
    const exemplar = bib.livros.get(titulo);

    if (!user) {
        alert(`Usuário "${usuarioNome}" não encontrado!`);
        return;
    }
    if (!exemplar) {
        alert(`Livro "${titulo}" não encontrado!`);
        return;
    }

    try {
        bib.emprestar(user, exemplar);
        atualizarTabelaUsuarios();
        atualizarTabelaLivros();
        alert(`Livro "${titulo}" emprestado para ${usuarioNome}.`);
    } catch (e) {
        alert(e.message);
    }

    // Limpar campos
    document.getElementById('usuarioEmprestimo').value = '';
    document.getElementById('tituloExemplar').value = '';
});

// -------------------- Devolver --------------------
document.getElementById('devolverBtn').addEventListener('click', () => {
    const usuarioNome = document.getElementById('usuarioEmprestimo').value.trim();
    const titulo = document.getElementById('tituloExemplar').value.trim();

    if (!usuarioNome || !titulo) {
        alert("Preencha usuário e título do livro!");
        return;
    }

    const user = bib.usuarios.get(usuarioNome);
    const exemplar = bib.livros.get(titulo);

    if (!user) {
        alert(`Usuário "${usuarioNome}" não encontrado!`);
        return;
    }
    if (!exemplar) {
        alert(`Livro "${titulo}" não encontrado!`);
        return;
    }

    try {
        bib.devolver(user, exemplar);
        alert(`Livro "${titulo}" devolvido por ${usuarioNome}.`);
    } catch (e) {
        alert(e.message);
    }

    // Limpar campos
    document.getElementById('usuarioEmprestimo').value = '';
    document.getElementById('tituloExemplar').value = '';
});

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
}

function atualizarTabelaUsuarios() {
    const tbody = document.getElementById('tabelaUsuarios').querySelector('tbody');
    tbody.innerHTML = ''; // limpa tabela

    for (const user of bib.usuarios.values()) {
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
}


baseLivros(bib)
atualizarTabelaLivros()

baseUsuarios(bib)
atualizarTabelaUsuarios()
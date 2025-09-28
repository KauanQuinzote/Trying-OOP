import { Livro } from './livro.js';
import { Usuario } from './usuario.js';
import { Emprestimo } from './emprestimo.js';
import mockData from './mock_data.js';

export class Biblioteca {
    static diasAtraso = 518400000; // 6 dias em milissegundos

    constructor() {
        this.livros = new Map();
        this.usuarios = new Map();
        this.emprestimos = new Map();
        this.blocked_users = new Map(); // id -> { nome, diasSuspenso }

    }

    blockUser(user, diasSuspenso) {
        this.blocked_users.set(user.id, diasSuspenso)
    }

    emprestar(user, exemplar, dataInit = new Date()) {
        // livro.exemplares é um array de exemplares
        const exemplarDisponivel = exemplar.livro.exemplares.find(
            (e) => e.estado === "Disponível"
        );

        if (!exemplarDisponivel) {
            throw new Error(`Nenhum exemplar disponível para o livro "${exemplar.titulo}"`);
        }
        if (user.emprestimos_realizados >= 3)
            throw Error("Usuário já emprestou 3 livros e não devolveu nenhum!\n");
        //essa parte nunca irá acontecer!
        if (exemplarDisponivel.estado !== "Disponível")
            throw Error("O livro não está em estado disponível, mas sim:" + exemplar.estado);

        const novo_emprestimo = new Emprestimo(
            user,
            exemplar,
            new Date(),
            new Date(),
        );
  
        this.emprestimos.set(novo_emprestimo.id_emprestimo, novo_emprestimo);
        user.emprestimos_realizados++;
        exemplar.estado = "Emprestado";
    }

    devolver (aluno, exemplar, dataDevolucao = new Date()) {
        for (const [id, emprestimo] of this.emprestimos) {
            if (emprestimo.usuario.nome === aluno.nome) {
                if (periodo = dataDevolucao.getTime() - emprestimo.dataInicio.getTime() > diasAtraso) {
                    blockUser(aluno.id, periodo);
                    throw Error("Usuário devolveu o livro atrasado! Ficará Supenso por " + periodo + " dias.    ");
                }

                if (exemplar.estado === "Danificado") {
                    exemplar.estado = "Danificado";
                    throw Error("O exemplar está danificado! Não poderá mais ser emprestado.");
                }
                aluno.emprestimos_realizados--;
                exemplar.estado = "Disponível";
            }
        }
    }
}

export const bib = new Biblioteca();

export async function popularBaseDados() {

    // Popula Usuários usando o id como chave
    mockData.usuarios.forEach(userData => {
        const user = new Usuario(userData.id, userData.nome);
        user.emprestimos_realizados = userData.emprestimos_realizados;
        bib.usuarios.set(userData.id, user); // chave: id
    });

    // Popula Livros usando o título como chave (ou pode usar outro identificador se preferir)
    mockData.livros.forEach(livroObjMock => {
        const anoDate = new Date(livroObjMock.ano);
        const livro = new Livro(
            livroObjMock.titulo,
            livroObjMock.autor,
            livroObjMock.editora,
            livroObjMock.genero,
            anoDate,
            livroObjMock.exemplares
        );
        console.log(livro);
        livro.exemplares.forEach(ex => ex.livro = livro);
        bib.livros.set(livroObjMock.titulo, livro); // chave: título
    });
}


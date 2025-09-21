// biblioteca.js

export class Livro {
    constructor(titulo, autor, editora, genero, ano) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.genero = genero;
        this.ano = ano;
        this.exemplares = []; // array de Exemplar
    }

    // Adiciona um exemplar ao livro
    adicionarExemplar(exemplar) {
        this.exemplares.push(exemplar);
    }

    // Retorna os exemplares disponíveis
    getExemplaresDisponiveis() {
        return this.exemplares.filter(e => e.estado === 'Disponível');
    }
}


export class Exemplar {
    constructor(livro, id_exemplar = 1, estado = 'Disponível') {
        this.livro = livro;
        this.id_exemplar = id_exemplar;
        this.estado = estado;
        this.id_exemplar++;
    }

    whichOne() {
        return this.id_exemplar;
    }
}

export class Usuario {
    constructor(id = 1, nome, emprestimos_realizados = 0) {
        this.id = id;
        this.nome = nome;
        this.emprestimos_realizados = emprestimos_realizados;
    }
}

export class Emprestimo {
    static id = 1;

    constructor(usuario, exemplar, dataInicio, dataFim, estado) {
        this.usuario = usuario;
        this.exemplar = exemplar;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        Emprestimo.id++;
        this.id_emprestimo = Emprestimo.id;
        this.estado = 'Emprestado';
    }
}

export class Biblioteca {
    constructor() {
        this.livros = new Map();
        this.usuarios = new Map();
        this.emprestimos = new Map();
    }

    emprestar(user, exemplar, dataInit = new Date()) {
        if (user.emprestimos_realizados >= 3)
            throw Error("Usuário já emprestou 3 livros e não devolveu nenhum!\n");
        if (exemplar.estado !== 'Disponível')
            throw Error("O livro não está em estado disponível, mas sim:" + exemplar.estado);

        const novo_emprestimo = new Emprestimo(user, exemplar, new Date(), new Date(), exemplar.estado);
        this.emprestimos.set(novo_emprestimo.id_emprestimo, novo_emprestimo);
        user.emprestimos_realizados++;
        exemplar.estado = 'Emprestado';
    }

    devolver(aluno, exemplar, dataDevolucao = new Date()) {
        for (const [id, emprestimo] of this.emprestimos) {
            if (emprestimo.usuario.nome === aluno.nome) {
                if (dataDevolucao.getTime() - emprestimo.dataInicio.getTime() > 518400000) // 6 dias
                    throw Error("Usuário devolveu o livro atrasado!");
                aluno.emprestimos_realizados--; 
                exemplar.estado = 'Disponível'; 
            }
        }
    }
}

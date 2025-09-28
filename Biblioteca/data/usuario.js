export class Usuario {
    constructor(id = 1, nome, emprestimos_realizados = 0) {
        this.id = id;
        this.nome = nome;
        this.emprestimos_realizados = emprestimos_realizados;
    }
}
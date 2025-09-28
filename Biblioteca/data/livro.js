export class Livro {
    constructor(titulo, autor, editora, genero, ano, exemplares = []) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.genero = genero;
        this.ano = ano;
        this.exemplares = exemplares; // array de Exemplar
    }

    // Adiciona um exemplar ao livro
    adicionarExemplar(exemplar) {
        this.exemplares.push(exemplar);
    }

    // Retorna os exemplares disponíveis
    getExemplaresDisponiveis() {
        return this.exemplares.filter((e) => e.estado === "Disponível");
    }
}
export class Exemplar {
    constructor(livro, id_exemplar = 0, estado = "Disponível") {
        this.livro = livro;
        this.id_exemplar = id_exemplar;
        this.estado = estado;
        this.id_exemplar++;
    }

    whichOne() {
        return this.id_exemplar;
    }
}
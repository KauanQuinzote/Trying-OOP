export class Emprestimo {
    static id = 0;

    constructor(usuario, exemplar, dataInicio, dataFim) {
        this.usuario = usuario;
        this.exemplar = exemplar;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        Emprestimo.id++;
        this.id_emprestimo = Emprestimo.id;
        this.exemplar.estado = "Emprestado";
    }
}
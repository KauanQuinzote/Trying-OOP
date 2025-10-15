import { Usuario } from './usuario';
import { Exemplar } from './exemplar';

export class Emprestimo {
    static id: number = 0;

    // Propriedades da instância, tipadas explicitamente
    public usuario: Usuario;
    public exemplar: Exemplar;
    public dataInicio: Date;
    public dataFim: Date; // A data de devolução prevista
    public id_emprestimo: number; // Ou string, se usar UUID

    /**
     * Construtor da classe Emprestimo.
     * @param usuario O usuário que pegou o livro emprestado.
     * @param exemplar O exemplar específico emprestado.
     * @param dataInicio A data em que o empréstimo foi iniciado.
     * @param dataFim A data prevista para a devolução.
     */
    constructor(
        usuario: Usuario,
        exemplar: Exemplar,
        dataInicio: Date,
        dataFim: Date
    ) {
        this.usuario = usuario;
        this.exemplar = exemplar;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;

        // Lógica de incremento e atribuição do ID
        Emprestimo.id++;
        this.id_emprestimo = Emprestimo.id;      
        this.exemplar.estado = "Emprestado"; 
    }
}
// Assumindo que a classe Livro está disponível
import { Livro } from './livro';

// Definindo um Union Type para os possíveis estados de um exemplar
export type EstadoExemplar = "Disponível" | "Emprestado" | "Danificado" | "Perdido";

export class Exemplar {
    // Propriedades da instância com tipagem explícita
    public livro: Livro;
    public id_exemplar: number;
    public estado: EstadoExemplar;

    /**
     * Construtor da classe Exemplar.
     * @param livro A referência ao livro ao qual este exemplar pertence.
     * @param id_exemplar O identificador único deste exemplar (opcional, padrão 0).
     * @param estado O estado atual do exemplar (opcional, padrão "Disponível").
     */
    constructor(
        livro: Livro,
        id_exemplar: number = 1,
        estado: EstadoExemplar = "Disponível"
    ) {
        this.livro = livro;
        this.id_exemplar = id_exemplar;
        this.estado = estado;
    }
}
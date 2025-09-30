import { Exemplar } from './exemplar';

export class Livro {
    public titulo: string;
    public autor: string;
    public editora: string;
    public genero: string;
    public ano: Date;    
    public exemplares: Exemplar[];

    /**
     * Construtor da classe Livro.
     * @param titulo O título do livro.
     * @param autor O autor do livro.
     * @param editora A editora que publicou o livro.
     * @param genero O gênero ou categoria do livro.
     * @param ano O ano de publicação do livro (como objeto Date).
     * @param exemplares Um array de Exemplares que pertencem a este livro (opcional, padrão: array vazio).
     */
    constructor(
        titulo: string,
        autor: string,
        editora: string,
        genero: string,
        ano: Date,
        exemplares: Exemplar[] = []
    ) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.genero = genero;
        this.ano = ano;
        this.exemplares = exemplares;
    }

    /**
     * Adiciona um novo exemplar à coleção deste livro.
     * @param exemplar O objeto Exemplar a ser adicionado.
     */
    public adicionarExemplar(exemplar: Exemplar): void {
        this.exemplares.push(exemplar);
    }

    /**
     * Retorna um array contendo apenas os exemplares que estão no estado "Disponível".
     * @returns Um array de Exemplares.
     */
    public getExemplaresDisponiveis(): Exemplar[] {
        // Usa o tipo EstadoExemplar para maior segurança
        return this.exemplares.filter((e) => e.estado === "Disponível");
    }
}

export { Exemplar };

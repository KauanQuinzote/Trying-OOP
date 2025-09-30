class Usuario {
    public id: number;
    public nome: string;
    public emprestimos_realizados: number;

    /**
     * Construtor da classe Usuário.
     * @param id O identificador único do usuário (opcional, padrão é 1).
     * @param nome O nome completo do usuário.
     * @param emprestimos_realizados A contagem de empréstimos ativos do usuário (opcional, padrão é 0).
     */
    constructor(
        id: number = 1,
        nome: string,
        emprestimos_realizados: number = 0
    ) {        
        this.id = id;
        this.nome = nome;
        this.emprestimos_realizados = emprestimos_realizados;
    }
}

export { Usuario };
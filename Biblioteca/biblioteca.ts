type EstadoLivro = 
    'Disponível' 
    | 'Emprestado' 
    | 'Danificado'

class Livro {
    constructor (
        public titulo:string, 
        public autor: string, 
        public editora:string, 
        public genero:string, 
        public ano:Date,
    ) {}
}

class Exemplar {
    constructor (
        public livro: Livro,
        private id_exemplar:number = 1,
        public estado: EstadoLivro = 'Disponível',
    ) {
        this.id_exemplar++
    }

    whichOne (){
        return this.id_exemplar
    }
}

class Usuario {
    constructor(
        private id:number = 1,
        public nome: string,
        public emprestimos_realizados:number = 0
    ) {}
}
class Emprestimo {
    private static id = 0
    public id_emprestimo: number
    constructor (
        public usuario: Usuario,
        public exemplar: Exemplar,
        public dataInicio: Date,
        public dataFim: Date,
        public estado: EstadoLivro,
    ) {
        Emprestimo.id++

        this.id_emprestimo = Emprestimo.id
        this.estado = 'Emprestado'
    }
    
}

class Biblioteca {

    livros: Map<string, Exemplar> = new Map();
    usuarios: Map<string, Usuario> = new Map();
    emprestimos: Map<number, Emprestimo> = new Map();

    emprestar (user: Usuario, exemplar: Exemplar, dataInit: Date = new Date()) {
        
        if (user.emprestimos_realizados > 3)
            throw Error("Usuário já emprestou 3 livros e não devolveu nenhum!\n")

        if (exemplar.estado !== 'Disponível')
            throw Error("O livro não está em estado disponível, mas sim:" + exemplar.estado)


        let novo_emprestimo = new Emprestimo(user, exemplar, new Date(), new Date(), exemplar.estado)

        this.emprestimos.set(novo_emprestimo.id_emprestimo, novo_emprestimo);
    }
    // Recebe o user, o exemplar emprestado e já configura a data de devolução
    devolver (aluno: Usuario, exemplar: Exemplar, dataDevolucao: Date = new Date()) {

        //Para cada emprestimo registrado na Bilioteca, executar:
        for (const [id, emprestimo] of this.emprestimos) {

            //Se o nome do aluno bate com algum nome registrado nos empréstimos da biblioteca
            if (emprestimo.usuario.nome === aluno.nome) {

                // Se o período de emprestimo foi superiror a 6 dias
                if (dataDevolucao.getTime() - emprestimo.dataInicio.getTime() > 518400000) //6 dias
                    throw Error ("Usuário devolveu o livro atrasado!")
                
                aluno.emprestimos_realizados-- // retira o emprestimo realizado do banco da biblioteca

                exemplar.estado = 'Disponível' // torna o exemplar disponível novamente
            }                
        }
    }
}

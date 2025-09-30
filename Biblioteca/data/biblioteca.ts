// Os imports devem ser corrigidos para usar as extensões corretas (.ts, .d.ts, ou nenhuma)
// Em um projeto TS/Node moderno, o ideal é remover a extensão .js
import { Livro } from './livro'; // Adicionei 'Exemplar' pois é usado
import { Usuario } from './usuario';
import { Emprestimo } from './emprestimo';
import mockData from './mock_data';
import { Exemplar } from './exemplar';

interface MockData {
    usuarios: Array<{
        id: number;
        nome: string;
        emprestimos_realizados: number;
    }>;
    livros: Array<{
        titulo: string;
        autor: string;
        editora: string;
        genero: string;
        ano: string; // assumindo que é uma string de data
        exemplares: Exemplar[]; // assumindo que você tem uma tipagem para Exemplar
    }>;
}


export class Biblioteca {
    static diasAtraso: number = 518400000; // 6 dias em milissegundos

    // Tipagem das propriedades
    private livros: Map<string, Livro>; // chave: título (string), valor: Livro
    private usuarios: Map<number, Usuario>; // chave: id (number), valor: Usuario
    private emprestimos: Map<number, Emprestimo>; // chave: id_emprestimo (string), valor: Emprestimo
    private blocked_users: Map<Usuario, number>;
    private reserved: Map<Usuario, Livro[]>; // Usuário como chave, array de livros reservados como valor

    constructor() {
        this.livros = new Map<string, Livro>();
        this.usuarios = new Map<number, Usuario>();
        this.emprestimos = new Map<number, Emprestimo>();
        this.blocked_users = new Map<Usuario, number>();
        this.reserved = new Map<Usuario, Livro[]>();
    }

    /**
     * Bloqueia um usuário por um número de dias.
     * @param user O usuário a ser bloqueado.
     * @param diasSuspenso O número de dias de suspensão.
     */
    blockUser(user: Usuario, diasSuspenso: number): void {
        this.blocked_users.set(user, diasSuspenso);
    }

    /**
     * Realiza o empréstimo de um exemplar de livro para um usuário.
     * @param user O usuário que está emprestando.
     * @param exemplar O exemplar (item específico do livro) a ser emprestado.
     * @param dataInit A data de início do empréstimo (opcional, padrão é new Date()).
     */
    emprestar(user: Usuario, exemplar: Exemplar, dataInit: Date = new Date()): void {
        // exemplar.livro deve ser do tipo Livro e conter a propriedade exemplares
        const exemplarDisponivel = exemplar.livro.exemplares.find(
            (e) => e.estado === "Disponível"
        );

        // Uso de '?' para checagem de nulidade/undefined em TS
        if (!exemplarDisponivel) {
            throw new Error(`Nenhum exemplar disponível para o livro "${exemplar.livro.titulo}"`);
        }

        if (user.emprestimos_realizados >= 3) {
            throw new Error("Usuário já emprestou 3 livros e não devolveu nenhum!\n");
        }

        // Essa checagem é redundante se a anterior com `exemplarDisponivel` estiver correta
        if (exemplarDisponivel.estado !== "Disponível") {
            throw new Error("O livro não está em estado disponível, mas sim:" + exemplarDisponivel.estado);
        }

        // Você provavelmente precisa de um construtor que aceite dataInicio e dataFim (ou dataPrevistaDevolucao)
        // A data de retorno é normalmente a data prevista de devolução, não a data atual
        const dataPrevistaDevolucao = new Date(dataInit.getTime() + Biblioteca.diasAtraso);

        const novo_emprestimo = new Emprestimo(
            user,
            exemplar,
            dataInit,
            dataPrevistaDevolucao, // Assumindo que o construtor espera a data prevista
        );

        // Assumindo que id_emprestimo é uma string (geralmente é um UUID ou similar)
        this.emprestimos.set(novo_emprestimo.id_emprestimo, novo_emprestimo);
        user.emprestimos_realizados++;
        exemplarDisponivel.estado = "Emprestado"; // Altera o estado do exemplar encontrado
    }

    /**
     * Registra a devolução de um exemplar.
     * @param aluno O usuário que está devolvendo.
     * @param exemplar O exemplar (item específico do livro) que está sendo devolvido.
     * @param dataDevolucao A data real da devolução (opcional, padrão é new Date()).
     */
    devolver(aluno: Usuario, exemplar: Exemplar, dataDevolucao: Date = new Date()): void {
        // Encontra o empréstimo específico
        let emprestimoEncontrado: Emprestimo | undefined;
        let idEmprestimo: number | undefined;

        // É mais robusto procurar pelo empréstimo baseado no exemplar e no aluno
        for (const [id, emprestimo] of this.emprestimos) {
            // Assumindo que o empréstimo guarda uma referência ao exemplar (que é o que você usa)
            // É mais seguro comparar IDs (se existirem) ou objetos, mas seguindo sua lógica:
            if (emprestimo.usuario.nome === aluno.nome && emprestimo.exemplar === exemplar) {
                emprestimoEncontrado = emprestimo;
                idEmprestimo = id;
                break; // Encontrou o empréstimo, pode sair do loop
            }
        }

        if (!emprestimoEncontrado || !idEmprestimo) {
            // Em TypeScript, é melhor lançar um erro mais específico
            throw new Error(`Empréstimo não encontrado para o usuário ${aluno.nome} e exemplar ${exemplar.livro.titulo}.`);
        }

        const periodo = dataDevolucao.getTime() - emprestimoEncontrado.dataInicio.getTime();

        if (periodo > Biblioteca.diasAtraso) {
            // Você precisa que 'this.blockUser' seja chamado dentro da classe.
            // O código JS original tinha um erro ao chamar blockUser() sem o 'this'.
            this.blockUser(aluno, Math.ceil(periodo / (1000 * 60 * 60 * 24))); // Calcula dias
            // O erro original informava 'período' em dias, mas ele está em milissegundos. Corrigi para ser mais preciso
            throw new Error("Usuário devolveu o livro atrasado! Ficará suspenso por " + Math.ceil(periodo / (1000 * 60 * 60 * 24)) + " dias.");
        }

        if (exemplar.estado === "Danificado") {
            throw new Error("O exemplar está danificado! Não poderá mais ser emprestado.");
        }

        aluno.emprestimos_realizados--;
        exemplar.estado = "Disponível";
        this.emprestimos.delete(idEmprestimo); // Usa 'this' e o ID do empréstimo
    }

    reservar(user: Usuario, livro: Livro): void {
        const reservasExistentes = this.getReserved(user);
        reservasExistentes.push(livro);
        this.reserved.set(user, reservasExistentes);
    }

    setUser(userId: number, user: Usuario): void {
        this.usuarios.set(userId, user);
    }
    setLivro(titulo: string, livro: Livro): void {
        this.livros.set(titulo, livro);
    }
    getUsers(): Map<number, Usuario> {
        return this.usuarios;
    }
    getLivros(): Map<string, Livro> {
        return this.livros;
    }
    getLivroByTitle(titulo: string): Livro | undefined {
        return this.livros.get(titulo);
    }
    getEmprestimos(): Map<number, Emprestimo> {
        return this.emprestimos;
    }
    getBlockedUsers(): Map<Usuario, number> {
        return this.blocked_users;
    }

    getReserved(user: Usuario): Livro[] {
        return this.reserved.get(user) || [];
    }
}

export const bib = new Biblioteca();

export async function popularBaseDados(): Promise<void> { // Retorna uma Promise<void> para consistência

    // Popula Usuários usando o id como chave
    // Tipando o parâmetro da função para garantir a segurança
    (mockData as MockData).usuarios.forEach(userData => {
        const user = new Usuario(userData.id, userData.nome);
        user.emprestimos_realizados = userData.emprestimos_realizados;
        bib.setUser(userData.id, user); // chave: id
    });

    // Popula Livros usando o título como chave (ou pode usar outro identificador se preferir)
    // Tipando o parâmetro da função para garantir a segurança
    (mockData as MockData).livros.forEach(livroObjMock => {
        const anoDate = new Date(livroObjMock.ano);
        const livro = new Livro(
            livroObjMock.titulo,
            livroObjMock.autor,
            livroObjMock.editora,
            livroObjMock.genero,
            anoDate,
            livroObjMock.exemplares
        );
        console.log(livro);

        // Tipagem 'Exemplar' para garantir que cada item é um exemplar
        livro.exemplares.forEach((ex: Exemplar) => ex.livro = livro);
        bib.setLivro(livroObjMock.titulo, livro); // chave: título
    });
}
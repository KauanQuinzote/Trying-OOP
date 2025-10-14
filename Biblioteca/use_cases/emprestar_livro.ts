// Imports corrigidos para TypeScript
import { bib } from '../entities/biblioteca'; 
import { Usuario } from '../entities/usuario';
import { Livro } from '../entities/livro';
import { Exemplar } from '../entities/exemplar';

/**
 * Executa a lógica de negócio para realizar o empréstimo de um exemplar de livro.
 *
 * @param usuarioNome O nome do usuário que está solicitando o empréstimo.
 * @param tituloLivro O título do livro a ser emprestado.
 * @returns Retorna true se um exemplar foi encontrado e emprestado com sucesso.
 * @throws Lança um erro se o usuário/livro não for encontrado, se não houver exemplar disponível, 
 * ou se a camada de dados (bib.emprestar) lançar um erro.
 */
export function emprestarLivro(usuarioNome: string, tituloLivro: string): boolean {
    
    // 1. Validar Usuário
    // Busca o usuário pelo nome. Note que 'bib.usuarios' é Map<number, Usuario>, então precisa de iteração.
    const usuarioEncontrado: Usuario | undefined = Array.from(bib.getUsers().values()).find(
        (u: Usuario) => u.nome === usuarioNome
    );

    if (!usuarioEncontrado) {
        throw new Error(`Usuário "${usuarioNome}" não encontrado!`);
    }

    // 2. Validar Livro
    // Busca o livro pelo título. 'bib.livros' é Map<string, Livro>.
    const livro: Livro | undefined = bib.getLivroByTitle(tituloLivro);

    if (!livro) {
        throw new Error(`Livro "${tituloLivro}" não encontrado!`);
    }

    // 3. Buscar Exemplar Disponível
    // 'find' retorna o Exemplar ou undefined.
    const exemplar: Exemplar | undefined = livro.exemplares.find(
        (ex: Exemplar) => ex.estado === "Disponível"
    );

    // 4. Validar Disponibilidade
    if (!exemplar) {
        throw new Error(`Nenhum exemplar disponível para o livro "${tituloLivro}"!`);
    }

    // 5. Executar a Regra de Negócio Central (Empréstimo)
    try {
        // A função 'bib.emprestar' é tipada para aceitar (Usuario, Exemplar)
        bib.emprestar(usuarioEncontrado, exemplar);
    } catch (e) {
        // Captura e relança quaisquer erros da camada de Dados/Entidades
        const errorMessage = (e instanceof Error) ? e.message : "Erro desconhecido ao realizar empréstimo.";
        throw new Error(errorMessage);
    }
    
    // O Use Case retorna sucesso
    return true; 
}
// Imports corrigidos para TypeScript
import { bib } from '../entities/biblioteca';
import { Usuario } from '../entities/usuario';
import { Livro } from '../entities/livro';
import { Exemplar } from '../entities/exemplar';


/**
 * Executa a lógica de negócio para registrar a devolução de um exemplar de livro.
 *
 * @param usuarioNome O nome do usuário que está devolvendo o livro.
 * @param tituloLivro O título do livro ao qual o exemplar pertence.
 * @returns Retorna true se a devolução foi realizada com sucesso.
 * @throws Lança um erro se o usuário, o livro, o exemplar não for encontrado,
 * ou se a camada de dados (bib.devolver) lançar um erro.
 */
export function devolverLivro(usuarioNome: string, tituloLivro: string): boolean {

    // --- 1. Buscando Usuário (A busca mais robusta é pelo ID, mas seguiremos pelo nome) ---
    // A tipagem bib.usuarios é Map<number, Usuario>. Buscar por nome exige iterar.
    const usuariosEncontrados: Usuario[] = Array.from(bib.getUsers().values()).filter(
        (u: Usuario) => u.nome === usuarioNome
    );
    
    if (usuariosEncontrados.length === 0) {
        throw new Error(`Usuário "${usuarioNome}" não encontrado!`);
    }
    // Assumimos que o nome é único ou pegamos o primeiro (pode ser ajustado se houver ID)
    const usuario: Usuario = usuariosEncontrados[0]!;

    // --- 2. Buscando Livro ---
    // A tipagem bib.livros é Map<string, Livro> (chave é o título)
    const livro: Livro | undefined = bib.getLivroByTitle(tituloLivro);

    if (!livro) {
        throw new Error(`Livro "${tituloLivro}" não encontrado!`);
    }

    // --- 3. Buscando o Exemplar EMPRESTADO que pertence a esse Usuário ---
    
    // A busca mais correta é em 'bib.emprestimos'
    const emprestimoEncontrado = Array.from(bib.getEmprestimos().values()).find(
        (e) => e.usuario.id === usuario.id && e.exemplar.livro.titulo === tituloLivro
    );

    if (!emprestimoEncontrado) {
        throw new Error(`Nenhum empréstimo ativo encontrado para o usuário "${usuarioNome}" e o livro "${tituloLivro}".`);
    }

    const exemplar: Exemplar = emprestimoEncontrado.exemplar;
    
    // 4. Executar a Regra de Negócio Central (Devolução)
    try {
        // Chamada ao método devolve em Biblioteca, que já lida com o atraso e a remoção.
        bib.devolver(usuario, exemplar);
    } catch (e) {
        // Captura e relança quaisquer erros da camada de Dados/Entidades
        // Tipagem: e pode ser 'unknown', então acessamos 'message' com segurança.
        const errorMessage = (e instanceof Error) ? e.message : "Erro desconhecido na devolução.";
        throw new Error(errorMessage);
    }

    return true;
}

// use_cases/devolver_livro.js

// Importar a referência para a biblioteca (sua camada de dados)
import { bib } from '../data/biblioteca.js';

/**
 * Executa a lógica de negócio para registrar a devolução de um exemplar de livro.
 *
 * @param {string} usuarioNome - O nome do usuário que está devolvendo o livro.
 * @param {string} livroTitulo - O título do livro ao qual o exemplar pertence.
 * @param {number} exemplarId - O ID único do exemplar a ser devolvido.
 * @returns {boolean} Retorna true se a devolução foi realizada com sucesso.
 * @throws {Error} Lança um erro se o usuário, o livro ou o exemplar não for encontrado, 
 * ou se a camada de dados (bib.devolver) lançar um erro.
 */
export function devolverLivro(usuarioNome, exemplarTitulo) {

    // 1. Buscar Usuário, Livro e Exemplar
    const user = bib.usuarios.get(usuarioNome);
    const emprestimo = empbib.emprestimos.get(exemplarTitulo);

    // 2. Validações de Entidade
    if (!user) {
        throw new Error(`Usuário "${usuarioNome}" não encontrado!`);
    }
    if (!livroTitulo) {
        throw new Error(`Livro "${livroTitulo}" não encontrado!`);
    }

    // 3. Buscar Exemplar
    const exemplar = bib.emprestimos.find(emprestimo => emprestimo.user === user && emprestimo.exemplar.titulo === livroTitulo);
    // 4. Validação de Exemplar
    if (!exemplar) {
        throw new Error(`Exemplar do livro "${livroTitulo}" não encontrado!`);
    }

    // *OPCIONAL*: Se precisar validar se o exemplar está realmente com esse usuário
    // if (exemplar.emprestadoPara !== usuarioNome) {
    //     throw new Error(`O exemplar não está com o usuário ${usuarioNome}.`);
    // }

    // 5. Executar a Regra de Negócio Central (Devolução)
    try {
        bib.devolver(user, exemplar);
    } catch (e) {
        // Captura e relança quaisquer erros da camada de Dados/Entidades
        throw new Error(e.message);
    }

    return true;
}
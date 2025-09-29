// use_cases/devolver_livro.js

// Importar a referência para a biblioteca (sua camada de dados)
import { bib } from '../data/biblioteca.js';

/**
 * Executa a lógica de negócio para registrar a devolução de um exemplar de livro.
 *
 * @param {string} usuarioNome - O nome do usuário que está devolvendo o livro.
 * @param {string} tituloLivro - O título do livro ao qual o exemplar pertence.
 * @param {number} exemplarId - O ID único do exemplar a ser devolvido.
 * @returns {boolean} Retorna true se a devolução foi realizada com sucesso.
 * @throws {Error} Lança um erro se o usuário, o livro ou o exemplar não for encontrado, 
 * ou se a camada de dados (bib.devolver) lançar um erro.
 */
export function devolverLivro(usuarioNome, tituloLivro) {

    // 1. Buscar Usuário, Livro e Exemplar
    for (const emprestimo of bib.emprestimos.values()) {
        if (emprestimo.usuario.nome === usuarioNome && emprestimo.exemplar.livro.titulo === tituloLivro) {
            var usuario = emprestimo.usuario;
            var livro_emprestado = emprestimo.exemplar.livro;
            var exemplar = emprestimo.exemplar;
        }
    }
    // 2. Validação de Usuário e Livro
    if (!usuario) {
        throw new Error(`Usuário "${usuarioNome}" não encontrado!`);
    }
    if (!livro_emprestado) {
        throw new Error(`Livro "${tituloLivro}" não encontrado!`);
    }
    // 4. Validação de Exemplar
    if (!exemplar) {
        throw new Error(`Exemplar do livro "${tituloLivro}" não encontrado!`);
    }

    // 5. Executar a Regra de Negócio Central (Devolução)
    try {
        bib.devolver(usuario, exemplar);
    } catch (e) {
        // Captura e relança quaisquer erros da camada de Dados/Entidades
        throw new Error(e.message);
    }

    return true;
}
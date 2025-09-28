// use_cases/adicionar_livro.js

// 1. Importar as dependências (Modelos e State)
// Supondo que você exporte essas classes/objetos de outros arquivos
import { Livro } from '../data/livro.js';
import { Exemplar } from '../data/exemplar.js';
import { bib } from '../data/biblioteca.js'; // A instância da biblioteca

/**
 * Adiciona um novo livro e um exemplar inicial à biblioteca.
 * @param {string} titulo
 * @param {string} autor
 * @param {string} editora
 * @param {string} genero
 * @param {string} anoValue - O valor do input do ano.
 */
export function adicionarLivro(titulo, autor, editora, genero, anoValue) {
    // 1. Validação da Regra de Negócio (Obrigatório, se não foi feita antes)
    if (!titulo || !autor || !editora || !genero || !anoValue) {
        // Usa 'throw' para reportar o erro ao Controller, que decide como mostrar ao usuário
        throw new Error("Todos os campos do livro são obrigatórios.");
    }

    // 2. Lógica de transformação e criação de objetos
    const ano = new Date(anoValue);
    const livro = new Livro(titulo, autor, editora, genero, ano);
    const exemplar = new Exemplar(livro);

    // 3. Modificação do estado (a regra de como o sistema funciona)
    livro.exemplares.push(exemplar);
    bib.livros.set(titulo, livro);

    // 4. Opcional: Retorna o objeto criado
    return livro;
}
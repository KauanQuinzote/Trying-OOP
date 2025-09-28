// use_cases/emprestar_livro.js

// Importar a referência para a biblioteca (assumindo que 'bib' é acessível ou injetável)
import { bib } from '../data/biblioteca.js'; 

/**
 * Executa a lógica de negócio para realizar o empréstimo de um exemplar de livro.
 *
 * @param {string} usuarioNome - O nome do usuário que está solicitando o empréstimo.
 * @param {string} tituloLivro - O título do livro a ser emprestado.
 * @returns {boolean} Retorna true se um exemplar foi encontrado e emprestado com sucesso.
 * @throws {Error} Lança um erro se o usuário/livro não for encontrado, se não houver exemplar disponível, 
 * ou se a camada de dados (bib.emprestar) lançar um erro.
 */
export function emprestarLivro(usuarioNome, tituloLivro) {
    
    // 1. Validar Usuário
    // Se você tem o nome, precisa encontrar o id primeiro:
    const usuarioEncontrado = Array.from(bib.usuarios.values()).find(u => u.nome === usuarioNome);
    if (!usuarioEncontrado) {
        // Lançar um erro que será pego pelo 'try...catch' no Handler
        throw new Error(`Usuário "${usuarioNome}" não encontrado!`);
    }

    // 2. Validar Livro
    const livro = bib.livros.get(tituloLivro);
    if (!livro) {
        throw new Error(`Livro "${tituloLivro}" não encontrado!`);
    }

    // 3. Buscar Exemplar Disponível
    const exemplar = livro.exemplares.find(ex => ex.estado === "Disponível");

    // 4. Validar Disponibilidade
    if (!exemplar) {
        throw new Error(`Nenhum exemplar disponível para o livro "${tituloLivro}"!`);
    }

    // 5. Executar a Regra de Negócio Central (Empréstimo)
    // O Use Case chama o método da sua Entidade/Data Layer
    try {
        bib.emprestar(usuarioEncontrado, exemplar);
    } catch (e) {
        // Captura e relança quaisquer erros da camada de Dados/Entidades (ex: regra de limite)
        throw new Error(e.message); 
    }
    
    // O Use Case retorna sucesso, sem manipular o DOM
    return true; 
}
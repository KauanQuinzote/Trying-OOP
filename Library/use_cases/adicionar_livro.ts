// Os imports devem ser corrigidos para apontar para os arquivos TypeScript (sem .js)
// Assumindo que suas classes estão em '../data/'
import { Livro } from '../entities/livro';
import { Exemplar } from '../entities/exemplar';
import { bib } from '../entities/biblioteca'; // A instância da Biblioteca

/**
 * Adiciona um novo livro e um exemplar inicial à biblioteca.
 * * @param titulo O título do livro.
 * @param autor O autor do livro.
 * @param editora A editora que publicou o livro.
 * @param genero O gênero do livro.
 * @param anoValue O valor do input do ano (esperado como string no formato de data ISO).
 * @returns O objeto Livro recém-criado.
 */
export function adicionarLivro(
    titulo: string,
    autor: string,
    editora: string,
    genero: string,
    anoValue: string
): Livro {
    // 1. Validação da Regra de Negócio (Obrigatório, se não foi feita antes)
    if (!titulo || !autor || !editora || !genero || !anoValue) {
        // O TS não altera a lógica de erro, mas reforça a tipagem de 'Error'
        throw new Error("Todos os campos do livro são obrigatórios.");
    }

    // 2. Lógica de transformação e criação de objetos
    const ano: Date = new Date(anoValue);
    
    // O construtor de Livro exige uma data (Date), não uma string
    const livro: Livro = new Livro(titulo, autor, editora, genero, ano);
    
    // O construtor de Exemplar exige a referência ao Livro
    const exemplar: Exemplar = new Exemplar(livro);

    // 3. Modificação do estado (a regra de como o sistema funciona)
    
    // A propriedade 'exemplares' em Livro é um array de Exemplar, tipagem correta.
    livro.exemplares.push(exemplar);
    
    // 'bib.livros' é um Map<string, Livro>, a chave 'titulo' (string) e o valor 'livro' (Livro) são tipados corretamente.
    bib.setLivro(titulo, livro);

    // 4. Retorna o objeto criado
    return livro;
}
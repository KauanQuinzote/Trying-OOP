import { Exemplar } from './exemplar'; // Importa a tipagem do Exemplar
import type { EstadoExemplar } from './exemplar';

// 1. Definição da interface para a estrutura interna de um Exemplar no Mock
// (Apenas o que o mock precisa fornecer)
interface MockExemplarData {
    id_exemplar: number;
    // O estado no mock pode ser tipado com o Union Type que criamos
    estado: EstadoExemplar; 
}

// 2. Definição da interface para um Livro no Mock
interface MockLivroData {
    titulo: string;
    autor: string;
    editora: string;
    genero: string;
    // O 'ano' é uma string de data no JSON, mas será convertido para 'Date' no código
    ano: string; 
    exemplares: MockExemplarData[];
}

// 3. Definição da interface para um Usuário no Mock
interface MockUsuarioData {
    id: number;
    nome: string;
    emprestimos_realizados: number;
}

// 4. Definição da interface principal para todo o objeto MockData
export interface MockData {
    usuarios: MockUsuarioData[];
    livros: MockLivroData[];
}

// 5. O objeto de dados final, garantindo que ele adere à interface MockData
const mockData: MockData = {
    usuarios: [
        { id: 1, nome: "Alice Souza", emprestimos_realizados: 0 },
        { id: 2, nome: "Bruno Costa", emprestimos_realizados: 0 }
    ],
    livros: [
        {
            titulo: "A Culpa é das Estrelas",
            autor: "John Green",
            editora: "Intrínseca",
            genero: "Romance",
            ano: "2012-01-01T00:00:00.000Z",
            exemplares: [
                { id_exemplar: 101, estado: "Disponível" },
                { id_exemplar: 102, estado: "Disponível" }
            ]
        },
        {
            titulo: "1984",
            autor: "George Orwell",
            editora: "Companhia das Letras",
            genero: "Ficção Distópica",
            ano: "1949-01-01T00:00:00.000Z",
            exemplares: [
                { id_exemplar: 201, estado: "Disponível" }
            ]
        }
    ]
};

export default mockData;
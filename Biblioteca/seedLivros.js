import { Biblioteca, Livro, Exemplar } from './biblioteca.js';

export function baseLivros(bib) {
    


    // Lista de 10 livros de exemplo
    const livros = [
        { titulo: "Dom Quixote", autor: "Miguel de Cervantes", editora: "Editora A", genero: "Clássico", ano: new Date("1605-01-01") },
        { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", editora: "Editora B", genero: "Infantil", ano: new Date("1943-01-01") },
        { titulo: "1984", autor: "George Orwell", editora: "Editora C", genero: "Distopia", ano: new Date("1949-01-01") },
        { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", editora: "Editora D", genero: "Fantasia", ano: new Date("1954-01-01") },
        { titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", editora: "Editora E", genero: "Fantasia", ano: new Date("1997-01-01") },
        { titulo: "A Metamorfose", autor: "Franz Kafka", editora: "Editora F", genero: "Ficção", ano: new Date("1915-01-01") },
        { titulo: "O Alquimista", autor: "Paulo Coelho", editora: "Editora G", genero: "Ficção", ano: new Date("1988-01-01") },
        { titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez", editora: "Editora H", genero: "Realismo", ano: new Date("1967-01-01") },
        { titulo: "O Hobbit", autor: "J.R.R. Tolkien", editora: "Editora I", genero: "Fantasia", ano: new Date("1937-01-01") },
        { titulo: "A Revolução dos Bichos", autor: "George Orwell", editora: "Editora J", genero: "Fábula", ano: new Date("1945-01-01") }
    ];

    // Adiciona cada livro à biblioteca
    livros.forEach(l => {
        const livro = new Livro(l.titulo, l.autor, l.editora, l.genero, l.ano);
        const exemplar = new Exemplar(livro);
        bib.livros.set(l.titulo, exemplar);
    });

    console.log("10 livros adicionados à biblioteca com sucesso!");
    console.log("Livros disponíveis:");
    console.table(Array.from(bib.livros.values()).map(e => ({
        Título: e.livro.titulo,
        Autor: e.livro.autor,
        Editora: e.livro.editora,
        Gênero: e.livro.genero,
        Ano: e.livro.ano.getFullYear(),
        Estado: e.estado
    })));

}

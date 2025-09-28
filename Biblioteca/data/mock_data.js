export default {
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
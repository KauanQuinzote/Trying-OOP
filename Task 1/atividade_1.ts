function main() {

    // Classe Estudante com nome e array de notas
    class Estudante {

        private nome: string;           // Nome do estudante (privado)
        private notas: number[] = [];   // Lista de notas do estudante (privado)

        // Construtor para inicializar o nome
        constructor(nome: string) {
            this.nome = nome;
        }

        // Método para adicionar uma nota ao array de notas
        adicionaNota(nota: number): void {
            this.notas.push(nota);
        }

        // Método para calcular e exibir a média das notas
        media(): void {
            // Soma todas as notas e divide pelo total
            let media = this.notas.reduce((total, nota) => total + nota, 0) / this.notas.length;

            // Exibe a média no console
            console.log(`A média de ${this.nome} é ${media}`);
        }
    }

    // Array que vai armazenar os estudantes criados
    let students: Estudante[] = [];

    // Função para criar um novo estudante e adicioná-lo ao array
    function createStudent(nome: string): Estudante {
        let student = new Estudante(nome);
        students.push(student);
        return student; // Retorna a instância criada
    }

    // Criando estudante "Alberto" e adicionando suas notas
    let Alberto = createStudent('Alberto');
    Alberto.adicionaNota(9);
    Alberto.adicionaNota(8);
    Alberto.adicionaNota(7);

    // Criando estudante "Beatriz" e adicionando suas notas
    let Beatriz = createStudent('Beatriz');
    Beatriz.adicionaNota(7);
    Beatriz.adicionaNota(6);
    Beatriz.adicionaNota(7.5);

    // Calculando e exibindo as médias
    Alberto.media();
    Beatriz.media();
}

// Chamada da função principal
main();
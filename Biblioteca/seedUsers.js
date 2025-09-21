import { Usuario } from './biblioteca.js';

export function baseUsuarios(bib) {
    // Lista de 5 usuários de exemplo
    const usuarios = [
        { id: 1, nome: "Alice" },
        { id: 2, nome: "Bruno" },
        { id: 3, nome: "Carla" },
        { id: 4, nome: "Diego" },
        { id: 5, nome: "Eva" }
    ];

    // Adiciona cada usuário à biblioteca
    usuarios.forEach(u => {
        const user = new Usuario(u.id, u.nome);
        bib.usuarios.set(user.nome, user);
    });

    console.log("5 usuários adicionados à biblioteca com sucesso!");
}

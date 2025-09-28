// use_cases/adicionar_usuario.js

// Importar as dependências (Modelos e Estado)
import { Usuario } from '../data/usuario.js'; 
import { bib } from '../data/biblioteca.js'; 

/**
 * Adiciona um novo usuário à biblioteca.
 * @param {string} nomeUsuario - O nome do usuário a ser adicionado.
 * @returns {Usuario} O objeto Usuário recém-criado.
 */
export function adicionarUsuario(nomeUsuario) {
    // 1. Validação da Regra de Negócio
    if (!nomeUsuario) {
        // Lança um erro se a regra for violada
        throw new Error("O nome do usuário é obrigatório.");
    }
    
    // 2. Verifica se o usuário já existe
    if (bib.usuarios.has(nomeUsuario)) {
        throw new Error(`O usuário "${nomeUsuario}" já existe na biblioteca.`);
    }

    // 3. Criação e Persistência do objeto
    // Nota: Supondo que o construtor da classe Usuario pode aceitar 'undefined' para o ID
    const user = new Usuario(undefined, nomeUsuario);

    while (bib.usuarios.has(user.id)) user.id++; // Garante que o ID seja único
    bib.usuarios.set(nomeUsuario, user);

    return user;
}
// Imports corrigidos para TypeScript
import { Usuario } from '../entities/usuario'; 
import { bib } from '../entities/biblioteca'; 

/**
 * Adiciona um novo usuário à biblioteca.
 * @param nomeUsuario O nome do usuário a ser adicionado.
 * @returns O objeto Usuário recém-criado.
 */
export function adicionarUsuario(nomeUsuario: string): Usuario {
    // 1. Validação da Regra de Negócio
    if (!nomeUsuario) {
        throw new Error("O nome do usuário é obrigatório.");
    }
    
    // --- LÓGICA DE GERAÇÃO DE ID E VERIFICAÇÃO DE EXISTÊNCIA ---
    
    // Tentativa de encontrar o usuário (Apenas checa por nome se você realmente usa o nome como chave)
    // Se o Map for por ID, a verificação de nome é mais complexa.
    
    // 2. Criação inicial do objeto
    // Nota: O construtor do Usuário aceita (id, nome, ...)
    // Vamos iniciar o ID com um valor padrão alto ou um gerador sequencial
    let newId: number = 1;
    
    // Encontra o maior ID atual para garantir que o novo não se repita.
    // Isso é mais seguro do que apenas checar o ID padrão '1'
    if (bib.getUsers().size > 0) {
        // Encontra o maior ID existente e adiciona 1.
        newId = Math.max(...Array.from(bib.getUsers().keys())) + 1;
    }
    
    // Criação do novo usuário
    const user: Usuario = new Usuario(newId, nomeUsuario);

    // 3. Persistência (usando o ID como chave, conforme tipagem de Biblioteca.ts)
    // Se você já checou por duplicidade de ID acima, essa linha é segura.
    bib.setUser(user.id, user);

    return user;
}

/*
// ====================================================================
// VERSÃO ALTERNATIVA: Se você QUISER manter a lógica de checar o ID (e usar o ID como chave)
// Mas atenção: Isso ignora a verificação de nome duplicado!
// ====================================================================

export function adicionarUsuario_ID_Chave(nomeUsuario: string): Usuario {
    if (!nomeUsuario) {
        throw new Error("O nome do usuário é obrigatório.");
    }
    
    // Supondo que você queira o menor ID livre, começando em 1
    let nextId: number = 1;
    while (bib.usuarios.has(nextId)) {
        nextId++; // Encontra o próximo ID disponível
    }

    const user: Usuario = new Usuario(nextId, nomeUsuario);
    bib.usuarios.set(user.id, user);

    return user;
}
*/

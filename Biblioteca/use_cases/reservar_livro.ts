import { Livro } from '../data/livro';
import { bib } from '../data/biblioteca'; // A instância da Biblioteca

export function reservarLivro(usuarioNome: string, titulo: string): void {
    const usuario = Array.from(bib.getUsers().values()).find(u => u.nome === usuarioNome);
    if (!usuario) {
        throw new Error(`Usuário "${usuarioNome}" não encontrado.`);
    }

    const livro = Array.from(bib.getLivros().values()).find(l => l.titulo === titulo);
    if (!livro) {
        throw new Error(`Livro "${titulo}" não encontrado.`);
    }

    bib.reservar(usuario, livro);
}

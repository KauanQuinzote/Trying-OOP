import { DocumentInterface } from "../interfaces/document_interface";
import { DocumentRepository } from "../interfaces/document_repository";

export class ProcessDocumentUseCase {
  constructor(private documentRepository: DocumentRepository) {}

  /**
   * Processa e edita um documento existente
   * @param documentId - ID (ou título temporário) do documento a ser editado
   * @param newContent - Novo conteúdo do documento
   * @param newTitle - Novo título (opcional)
   * @returns O documento atualizado
   */
  async execute(
    documentId: string, 
    newContent: string, 
    newTitle?: string
  ): Promise<DocumentInterface> {
    // 1. Buscar documento no repositório
    const document = await this.documentRepository.findById(documentId);
    
    if (!document) {
      throw new Error(`Document with id '${documentId}' not found.`);
    }

    // 2. Abrir o documento (inicia o ciclo de vida)
    document.open();

    // 3. Editar o conteúdo (e título se fornecido)
    document.content = newContent;
    if (newTitle) {
      document.title = newTitle;
    }

    // 4. Processar o documento (marca como processado)
    document.process();

    // 5. Marcar como salvo
    document.mark_as_save();

    // 6. Salvar no repositório (persistir mudanças)
    await this.documentRepository.save(document);

    // 7. Fechar o documento (finaliza o ciclo)
    document.close();

    return document;
  }
}

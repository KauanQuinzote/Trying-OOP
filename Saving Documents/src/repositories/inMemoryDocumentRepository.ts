import { DocumentRepository } from '../interfaces/document_repository';
import { DocumentEntity } from '../entities/document_entity';

export class InMemoryDocumentRepository implements DocumentRepository {
  private documents: DocumentEntity[] = [];

  async save(document: DocumentEntity): Promise<void> {
    this.documents.push(document);
  }

  async findAll(): Promise<DocumentEntity[]> {
    return [...this.documents];
  }

  async findById(id: string): Promise<DocumentEntity | null> {
    const doc = this.documents.find(d => d.title === id); // usando title como ID temporário
    return doc || null;
  }
}

import { DocumentEntity } from '../entities/document_entity';

export interface DocumentRepository {
  save(document: DocumentEntity): Promise<void>;
  findAll(): Promise<DocumentEntity[]>;
  findById(id: string): Promise<DocumentEntity | null>;
}

import  {DocumentEntity} from "../entities/document_entity";

export function createDocument(title: string, content: string, author: string): DocumentEntity {    
  return new DocumentEntity(title, content, new Date(), new Date(), author);
}
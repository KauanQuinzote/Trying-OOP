import { Request, Response } from 'express';
import { createDocument } from '../use cases/create_document';
import { DocumentRepository } from '../interfaces/document_repository';

export class DocumentController {
  constructor(private repository: DocumentRepository) {}

  async create(req: Request, res: Response): Promise<Response | void> {
    try {
      const { title, content, author } = req.body;

      // Validação básica
      if (!title || !content || !author) {
        res.status(400).json({ error: 'Missing required fields: title, content, author' });
        return;
      }

      // Chama o use-case para criar a entidade
      const document = createDocument(title, content, author);

      // Salva no repositório
      await this.repository.save(document);

      return res.status(201).json({
        message: 'Document created successfully',
        document: {
          title: document.title,
          content: document.content,
          author: document.author,
          created_at: document.created_at,
          updated_at: document.updated_at
        }
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async list(req: Request, res: Response): Promise<Response | void> {
    try {
      const documents = await this.repository.findAll();
      return res.status(200).json({ documents });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

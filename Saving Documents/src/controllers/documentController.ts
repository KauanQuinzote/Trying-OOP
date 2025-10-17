import { Request, Response } from 'express';
import { createDocument } from '../use cases/create_document';
import { ProcessDocumentUseCase } from '../use cases/process_document';
import { DocumentRepository } from '../interfaces/document_repository';

export class DocumentController {
  private processDocumentUseCase: ProcessDocumentUseCase;

  constructor(private repository: DocumentRepository) {
    this.processDocumentUseCase = new ProcessDocumentUseCase(repository);
  }

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

  async process(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Document ID is required' });
      }

      // Chama o use-case que orquestra o processamento
      const document = await this.processDocumentUseCase.execute(id);

      return res.status(200).json({
        message: 'Document processed successfully',
        document: {
          id: document.id,
          title: document.title,
          content: document.content,
          author: document.author,
          created_at: document.created_at,
          updated_at: document.updated_at
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

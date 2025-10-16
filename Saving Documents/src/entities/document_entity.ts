import { DocumentInterface } from '../interfaces/document_interface';
import { randomUUID } from 'crypto';

export class DocumentEntity implements DocumentInterface {
  public readonly id: string;
  public title: string;
  public content: string;
  private readonly created_at: Date;
  private readonly updated_at: Date;
  public readonly author: string;

  private readonly opened: boolean;
  private readonly processed: boolean;
  private readonly saved: boolean;
  private readonly closed: boolean;

  constructor(
    id: string = randomUUID(),
    title: string,
    content: string,
    created_at: Date = new Date(),
    updated_at: Date = new Date(),
    author: string,
    opened: boolean,
    processed: boolean,
    saved: boolean,
    closed: boolean
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.author = author;
    this.opened = opened;
    this.processed = processed;
    this.saved = saved;
    this.closed = closed;
  }

  open(): void {
    this.opened = true;
  }

  process(): void {
    this.processed = true;
  }

  save(): void {
    this.saved = true;
  }

  close(): void {
    this.closed = true;
  }
}

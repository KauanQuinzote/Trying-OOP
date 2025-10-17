import { DocumentInterface } from '../interfaces/document_interface';
import { randomUUID } from 'crypto';

export class DocumentEntity implements DocumentInterface {
  public readonly id: string;
  public title: string;
  public content: string;
  public readonly created_at: Date;
  private _updated_at: Date;
  public get updated_at(): Date { return this._updated_at; }
  public readonly author: string;

  private opened: boolean;
  private processed: boolean;
  private saved: boolean;

  constructor(
    title: string,
    content: string,
    created_at: Date = new Date(),
    updated_at: Date = new Date(),
    author: string,

    ) {
    this.id = randomUUID();
    this.title = title;
    this.content = content;
    this.created_at = new Date();
    this._updated_at = new Date();
    this.author = author;
    this.opened = false;
    this.processed = false;
    this.saved = false;
  }

  open(): void {
    if (this.opened) 
      throw new Error('Document is already open.');
    
    this.opened = true;
  }

  process(): void {
    if (!this.opened)
      throw new Error('Document must be opened before processing.');

    this.processed = true;
  }

  save(): void {
    if (!this.processed)
      throw new Error('Document must be processed before saving.');
    this._updated_at = new Date();
    this.saved = true;
  }

  close(): void {
    if (!this.saved)
      throw new Error('Document must be saved before closing.');

    console.log('Document closed successfully.');
    this.processed = false;
    this.saved = false;
    this.opened = false;
  }
}

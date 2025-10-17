export interface DocumentInterface {
  readonly id: string;
  title: string;
  content: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  author: string;

  open(): void;
  process(): void;
  save(): void;
  close(): void;
}
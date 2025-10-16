export interface DocumentInterface {
  readonly id: string;
  title: string;
  content: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  author: string;
  opened: boolean;
  processed: boolean;
  saved: boolean;
  closed: boolean;

  open(): void;
  process(): void;
  save(): void;
  close(): void;
}
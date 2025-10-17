// Tipos e interfaces
interface Document {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
}

interface CreateDocumentResponse {
  message: string;
  document: Document;
}

interface ListDocumentsResponse {
  documents: Document[];
}

interface ErrorResponse {
  error: string;
}

type MessageType = 'success' | 'error';

// Em desenvolvimento, o Vite proxy redireciona /api para http://localhost:3000/api
// Em produção, a API estará no mesmo domínio
const API_URL = '/api';

// Elementos do DOM
const form = document.getElementById('documentForm') as HTMLFormElement;
const messageDiv = document.getElementById('message') as HTMLDivElement;
const loadButton = document.getElementById('loadDocuments') as HTMLButtonElement;
const documentsList = document.getElementById('documentsList') as HTMLDivElement;

// Função para mostrar mensagem
function showMessage(text: string, type: MessageType): void {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  messageDiv.classList.remove('hidden');
  
  setTimeout(() => {
    messageDiv.classList.add('hidden');
  }, 5000);
}

// Função para formatar data
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Criar documento
form.addEventListener('submit', async (e: Event): Promise<void> => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    author: formData.get('author') as string
  };
  
  try {
    const response = await fetch(`${API_URL}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json() as CreateDocumentResponse | ErrorResponse;
    
    if (response.ok) {
      showMessage('✅ Documento criado com sucesso!', 'success');
      form.reset();
      loadDocuments(); // Recarrega a lista
    } else {
      const errorResult = result as ErrorResponse;
      showMessage(`❌ Erro: ${errorResult.error}`, 'error');
    }
  } catch (error) {
    showMessage('❌ Erro ao conectar com o servidor', 'error');
    console.error('Error:', error);
  }
});

// Carregar documentos
async function loadDocuments(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/documents`);
    const result = await response.json() as ListDocumentsResponse | ErrorResponse;
    
    if (response.ok && 'documents' in result) {
      displayDocuments(result.documents);
    } else {
      showMessage('❌ Erro ao carregar documentos', 'error');
    }
  } catch (error) {
    showMessage('❌ Erro ao conectar com o servidor', 'error');
    console.error('Error:', error);
  }
}

// Exibir documentos
function displayDocuments(documents: Document[]): void {
  if (documents.length === 0) {
    documentsList.innerHTML = '<div class="empty-state">Nenhum documento encontrado. Crie o primeiro!</div>';
    return;
  }
  
  documentsList.innerHTML = documents.map(doc => `
    <div class="document-card">
      <h3>📄 ${doc.title}</h3>
      <p><strong>Conteúdo:</strong> ${doc.content}</p>
      <p><strong>Autor:</strong> ${doc.author}</p>
      <div class="meta">
        <button class="btn-edit btn-secondary">Editar</button>
        <span>Criado: ${formatDate(doc.created_at)}</span>
        <span>Atualizado: ${formatDate(doc.updated_at)}</span>
      </div>
    </div>
  `).join('');
}

// Event listener para botão de carregar
loadButton.addEventListener('click', loadDocuments);

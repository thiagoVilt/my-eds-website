// A função padrão de todo bloco EDS deve ser 'decorate' e ser exportada como default
export default function decorate(block) {
  // 1. Extração: Pegamos os elementos "crus" que vieram do AEM/Universal Editor
  const title = block.querySelector('h1, p');
  const picture = block.querySelector('picture');

  // Pegamos todos os parágrafos do bloco
  const allParagraphs = Array.from(block.querySelectorAll('p'));
  // O primeiro parágrafo é sempre o título, então pegamos do segundo em diante
  const metadataParagraphs = allParagraphs.slice(1);
  // Extraímos nome do autor (segundo p geral = primeiro dos metadados)
  // e data (terceiro p geral = segundo dos metadados)
  const authorName = metadataParagraphs[0]?.textContent.trim() || '';
  const publishDate = metadataParagraphs[1]?.textContent.trim() || '';

  // 2. Limpeza: Esvaziamos o bloco original para reconstruirmos um DOM semântico e limpo
  block.textContent = '';

  // 3. Reconstrução: Criamos as divs organizadoras
  const headerContainer = document.createElement('div');
  headerContainer.className = 'article-header-container';

  // Inserimos o título
  if (title) {
    title.className = 'article-title';
    headerContainer.append(title);
  }

  // Criamos o container de metadados (Foto + Nome + Data)
  const metaContainer = document.createElement('div');
  metaContainer.className = 'article-meta';

  if (picture) {
    picture.classList.add('article-author-avatar');
    metaContainer.append(picture);
  }

  // Montamos as informações do autor e data
  if (authorName || publishDate) {
    const authorInfo = document.createElement('div');
    authorInfo.className = 'article-author-info';

    if (authorName) {
      const authorNameSpan = document.createElement('span');
      authorNameSpan.className = 'article-author-name';
      authorNameSpan.textContent = authorName;
      authorInfo.append(authorNameSpan);
    }

    if (publishDate) {
      const publishDateSpan = document.createElement('span');
      publishDateSpan.className = 'article-date';
      publishDateSpan.textContent = publishDate;
      authorInfo.append(publishDateSpan);
    }

    metaContainer.append(authorInfo);
  }

  headerContainer.append(metaContainer);

  // 4. Injeção: Devolvemos o HTML estruturado para o bloco principal
  block.append(headerContainer);
}

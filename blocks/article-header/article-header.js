// A função padrão de todo bloco EDS deve ser 'decorate' e ser exportada como default
export default function decorate(block) {
  // 1. Extração: Pegamos os elementos "crus" que vieram do AEM/Universal Editor
  const title = block.querySelector('h1');
  const picture = block.querySelector('picture'); // O EDS converte <img> para <picture> automaticamente para performance
  const paragraphs = block.querySelectorAll('p');

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

  // Pegamos os parágrafos (assumindo que [0] é o nome e [1] é a data)
  if (paragraphs.length > 0) {
    const authorInfo = document.createElement('div');
    authorInfo.className = 'article-author-info';

    const authorName = document.createElement('span');
    authorName.className = 'article-author-name';
    authorName.innerHTML = paragraphs[0].innerHTML;
    authorInfo.append(authorName);

    if (paragraphs.length > 1) {
      const publishDate = document.createElement('span');
      publishDate.className = 'article-date';
      publishDate.innerHTML = paragraphs[1].innerHTML;
      authorInfo.append(publishDate);
    }

    metaContainer.append(authorInfo);
  }

  headerContainer.append(metaContainer);

  // 4. Injeção: Devolvemos o HTML estruturado para o bloco principal
  block.append(headerContainer);
}

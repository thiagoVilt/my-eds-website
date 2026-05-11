export default function decorate(block) {
  // Extração
  const picture = block.querySelector('picture');
  const paragraphs = block.querySelectorAll('p');

  // Limpeza
  block.textContent = '';

  // Reconstrução
  const bioContainer = document.createElement('div');
  bioContainer.className = 'author-bio-container';

  if (picture) {
    picture.className = 'author-bio-avatar';
    bioContainer.append(picture);
  }

  const infoContainer = document.createElement('div');
  infoContainer.className = 'author-bio-info';

  if (paragraphs.length > 0) {
    const name = document.createElement('h3');
    name.className = 'author-bio-name';
    name.innerHTML = paragraphs[0].innerHTML;
    infoContainer.append(name);
  }

  if (paragraphs.length > 1) {
    const role = document.createElement('span');
    role.className = 'author-bio-role';
    role.innerHTML = paragraphs[1].innerHTML;
    infoContainer.append(role);
  }

  if (paragraphs.length > 2) {
    const desc = document.createElement('p');
    desc.className = 'author-bio-description';
    desc.innerHTML = paragraphs[2].innerHTML;
    infoContainer.append(desc);
  }

  bioContainer.append(infoContainer);

  // Injeção
  block.append(bioContainer);
}

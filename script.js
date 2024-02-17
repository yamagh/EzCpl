import { dir, files } from './settings.js';

function createElementWithText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

async function loadFile(file) {
  const fileDiv = document.createElement('div');
  fileDiv.appendChild(createElementWithText('h2', file.name));
  const pre = document.createElement('pre');
  fileDiv.appendChild(pre);
  try {
    const response = await fetch(dir + '/' + file.path);
    const data = await response.text();
    if (file.path.endsWith('.md')) {
      pre.textContent = data;
    } else {
      pre.appendChild(createElementWithText('code', data));
    }
  } catch (error) {
    console.error('Error:', error);
    pre.textContent = 'Error loading file';
  }
  document.getElementById('files').appendChild(fileDiv);
}

(async function () {
  for (const file of files) {
    await loadFile(file);
  }
})();


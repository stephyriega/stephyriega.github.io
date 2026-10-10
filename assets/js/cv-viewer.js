/**
 * Draws every page of the CV PDF inside #cv-viewer, so it can be read on the
 * page on any device (phones do not show PDFs inside a web page on their own).
 * The PDF path comes from the element's data-pdf attribute.
 */
import * as pdfjsLib from '../vendor/pdfjs/pdf.min.js';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  new URL('../vendor/pdfjs/pdf.worker.min.js', import.meta.url).href;

const viewer = document.getElementById('cv-viewer');

async function renderCv() {
  const url = viewer.dataset.pdf;
  const pdf = await pdfjsLib.getDocument(url).promise;
  const width = viewer.clientWidth;
  const density = Math.min(window.devicePixelRatio || 1, 3);
  const pages = [];

  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n);
    const fit = width / page.getViewport({ scale: 1 }).width;
    const viewport = page.getViewport({ scale: fit * density });

    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', `CV, page ${n} of ${pdf.numPages}`);

    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    pages.push(canvas);
  }

  viewer.replaceChildren(...pages);
}

renderCv().catch((error) => {
  console.error(error);
  const message = document.createElement('p');
  message.className = 'cv-status';
  message.append('The preview could not be loaded. ');
  const link = document.createElement('a');
  link.href = viewer.dataset.pdf;
  link.textContent = 'Open the PDF';
  message.append(link, ' instead.');
  viewer.replaceChildren(message);
});

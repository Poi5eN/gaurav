import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const texPath = path.join(__dirname, 'Resume.tex');
const pdfPath = path.join(__dirname, 'public', 'resume.pdf');

console.log('Reading Resume.tex...');
const texContent = fs.readFileSync(texPath, 'utf8');

const payload = {
  compiler: 'pdflatex',
  resources: [
    {
      main: true,
      content: texContent
    }
  ]
};

console.log('Sending request to https://latex.ytotech.com/builds/sync...');
fetch('https://latex.ytotech.com/builds/sync', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
  .then(res => {
    if (!res.ok) {
      return res.text().then(text => {
        throw new Error(`HTTP error ${res.status}: ${text}`);
      });
    }
    return res.arrayBuffer();
  })
  .then(buffer => {
    console.log('Writing response to public/resume.pdf...');
    fs.writeFileSync(pdfPath, Buffer.from(buffer));
    console.log('Resume successfully compiled to PDF!');
  })
  .catch(err => {
    console.error('Compilation failed:', err);
  });

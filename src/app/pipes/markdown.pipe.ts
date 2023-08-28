import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: string): string {
    let html = '';
    const lines = value.split('\n');
    let insideCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('### ')) {
        html += '<h3 class="mb-5">' + line.substring(4) + '</h3>';
      } else if (line.startsWith('## ')) {
        html += '<h2 class="mb-5">' + line.substring(3) + '</h2>';
      } else if (line.startsWith('# ')) {
        html += '<h1 class="mb-5">' + line.substring(2) + '</h1>';
      } else if (line.startsWith('```')) {
        insideCodeBlock = !insideCodeBlock;
        html += '<pre><code>';
      } else if (line.startsWith('---') || line.startsWith('***')) {
        html += '<hr>';
      } else if (line.startsWith('Image: ')) {
        html += `
          <div class="image-spinner d-flex justify-content-center rounded" data-image="${line}">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          `;
      } else if (!insideCodeBlock) {
        html += '<p class="fs-5">' + line + '</p>';
      } else {
        html += line + '\n';
      }

      if (insideCodeBlock && line.startsWith('```')) {
        html += '</code></pre>';
      }
    }

    return html;
  }

}

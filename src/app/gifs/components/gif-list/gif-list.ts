import { Component, input, signal } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [],
  templateUrl: './gif-list.html',
  styleUrl: './gif-list.css',
})
export class GifList {
  // Recibimos la lista plana
  gifs = input.required<Gif[]>();

  copiedGifId = signal<string | null>(null);

  copyToClipboard(url: string, id: string) {
    navigator.clipboard.writeText(url).then(() => {
      this.copiedGifId.set(id);
      setTimeout(() => {
        this.copiedGifId.set(null);
      }, 2000);
    }).catch(err => console.error('Error al copiar:', err));
  }
}
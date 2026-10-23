import { Component, input } from '@angular/core';
import { GifListItem } from './gif-list-item/gif-list-item';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItem],
  templateUrl: './gif-list.html',
  styleUrl: './gif-list.css',
})
export class GifList {
  gifs = input.required<Gif[]>()

}

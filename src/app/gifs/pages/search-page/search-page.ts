import { Component, inject, signal, viewChild, ElementRef } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [ GifList ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export default class SearchPage {

  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);
  
  // Referencia al div para el scroll
  scrollDivRef = viewChild<ElementRef>('groupDiv');

  // Controladores de estado
  currentQuery = '';
  currentPage = 0;
  isLoading = false;

  onSearch(query: string){
    if (!query) return;

    // Si el usuario busca una palabra nueva, reiniciamos todo
    if (this.currentQuery !== query) {
      this.currentQuery = query;
      this.currentPage = 0;
      this.gifs.set([]); 
    }

    this.loadMore();
  }

  // Método dedicado a cargar la página actual y avanzar
  loadMore() {
    if (this.isLoading || !this.currentQuery) return;
    this.isLoading = true;

    this.gifService.searchGifs(this.currentQuery, this.currentPage).subscribe( resp => {
      // Concatenamos los nuevos gifs a los que ya teníamos en pantalla
      this.gifs.update(currentGifs => [...currentGifs, ...resp]);
      this.currentPage++;
      this.isLoading = false;
    });
  }

  // Evento de scroll infinito (Idéntico a Trending)
  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    
    if (isAtBottom) {
      this.loadMore();
    }
  }

}
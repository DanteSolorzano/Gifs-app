import { Component, signal, inject, viewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifList } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service'

@Component({
  selector: 'app-trending-page',
  imports: [ GifList],
  templateUrl: "./trending-page.html",
  styleUrl: './trending-page.css',
})
export default class TrendingPage implements AfterViewInit {

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

//scroll infinito
  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if( !scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeigth = scrollDiv.scrollHeight;
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeigth;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if(isAtBottom){
      this.gifService.loadTrengingGifs();
    }

  }

}

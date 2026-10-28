import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../../services/gifs.service';

interface MenuOption {
  label: string;
  sublabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './side-menu-options.html' ,
  styleUrl: './side-menu-options.css',
})
export class SideMenuOptions {

  gifService = inject(GifService);
  router = inject(Router); 

  menuOptions:MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      sublabel: 'Gifs populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      sublabel: 'Buscar gifs',
      route: '/dashboard/search'
    }
  ];

  deleteHistoryItem(key: string) {
    // 1. Borrar el elemento del servicio
    this.gifService.removeHistory(key);

    // 2. Comprobar si la URL actual es la misma del historial que acabamos de borrar
    const currentUrl = this.router.url;
    const deletedUrl = `/dashboard/history/${key}`;

    if (currentUrl === deletedUrl) {
      this.router.navigate(['/dashboard/trending']);
    }
  }

}
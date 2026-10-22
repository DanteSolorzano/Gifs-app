import { Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.html',
  styleUrl: './side-menu-header.css',
})
export class SideMenuHeader {

  envs = environment;
}

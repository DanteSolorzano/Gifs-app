import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifList } from '../../components/gif-list/gif-list';

@Component({
  selector: 'app-trending-page',
  imports: [RouterOutlet, GifList],
  templateUrl: "./trending-page.html",
  styleUrl: './trending-page.css',
})
export default class TrendingPage {}

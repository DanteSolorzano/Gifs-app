import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { environment } from "@environments/environment";
import { GiphyResponse } from "../interfaces/giphy.interfaces";
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from "../mapper/gif.mapper";
import { map } from 'rxjs';

@Injectable( { providedIn: 'root'})
export class GifService {

    
    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);


    constructor(){
        this.loadTrengingGifs();
    }

    
    loadTrengingGifs() {

        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,  
            },
        }).subscribe( (response) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
        })

    }

    searchGifs(query: string){
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                q: query,  
            },
        }).pipe(
            map(({data}) => data),
            map((items) => GifMapper.mapGiphyItemsToGifArray(items))
        );
        
        // .subscribe( (response) => {
        //     const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
        //     console.log({search: gifs})
        // })

    }
}
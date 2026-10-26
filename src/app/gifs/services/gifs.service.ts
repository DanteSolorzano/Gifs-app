import { HttpClient } from "@angular/common/http";
import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { environment } from "@environments/environment";
import { GiphyResponse } from "../interfaces/giphy.interfaces";
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from "../mapper/gif.mapper";
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);

    return gifs
}

@Injectable( { providedIn: 'root'})
export class GifService {

    
    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    trendingGifGroup = computed<Gif[][]>(() => {
        const groups = []; 
        for (let i = 0; i < this.trendingGifs().length; i+=3){
            groups.push(this.trendingGifs().slice(i, i+3));
        }
        console.log(groups);
        return groups
    })

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))


    constructor(){
        this.loadTrengingGifs();
    }

    saveGifsToLocalStorage = effect(() => {
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem(GIF_KEY, historyString);
    })

    
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

    searchGifs(query: string):Observable<Gif[]>{
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                q: query,  
            },
        }).pipe(
            map(({data}) => data),
            map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        
            //historial
            tap(items => {
                this.searchHistory.update( history => ({    
                    ...history,
                    [query.toLocaleLowerCase()]: items,
                }));
            })
        );
        
        // .subscribe( (response) => {
        //     const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
        //     console.log({search: gifs})
        // })

    }

    getHistoryGifs( query: string):Gif[]{
        return this.searchHistory()[query] ?? [];
    }
}
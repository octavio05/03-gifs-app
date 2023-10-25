import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'sAgR2Lxn3GV9FSgoChez7XFlCeZmFDgq';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {

    if (this.loadLocalStorage())
      this.searchTag(this._tagsHistory[0])

  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {

    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();

  }

  private saveLocalStorage(): void {

    localStorage.setItem('history', JSON.stringify(this._tagsHistory));

  }

  private loadLocalStorage(): boolean {

    if (!localStorage.getItem('history')) return false;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    return true;

  }

  searchTag(tag: string): void {

    if (tag.length == 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
      .subscribe(resp => {

        this.gifList = resp.data;
        console.log({ gifs: this.gifList });

      });

  }

}

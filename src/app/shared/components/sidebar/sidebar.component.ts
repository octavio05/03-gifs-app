import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public get tags(): string[] {
    return this._gifsService.tagsHistory;
  }

  constructor(private _gifsService: GifsService) {
  }

  searchTag(tag: string): void{
    this._gifsService.searchTag(tag);
  }

}

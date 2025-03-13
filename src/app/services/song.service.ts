import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../models/song';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SongService {
  private apiUrl = 'http://localhost:8088/api/v1/songs';

  constructor(private http: HttpClient) {}
	
  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl);
  }
}

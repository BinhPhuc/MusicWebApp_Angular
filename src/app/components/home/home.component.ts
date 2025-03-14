import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song';
import { SongService } from '../../services/song.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  playlists = [
    { name: 'Chill Vibes' },
    { name: 'Workout Playlist' },
    { name: 'Coding Music' },
  ];
  public hoveredIndex: number = -1;
  public songs: Song[] = [];
  public isPlaying: boolean = false;
  public clicked: boolean = false;
  public cnt: number = 0;
  public prevSongId: number = -1;
  public currentPlay: Map<number, boolean> = new Map();

  constructor(private songService: SongService) {}
  ngOnInit(): void {
    this.songService.getAllSongs().subscribe({
      next: (data: any) => {
        debugger;
        this.songs = data;
      },
      complete: () => {
        debugger;
        console.log('complete');
      },
      error: (err: any) => {
        debugger;
        console.log(err);
      },
    });
    this.currentSong = this.songs[0];
  }
  currentSong: any = null;

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }

  nextSong() {
    const index = this.songs.indexOf(this.currentSong);
    if (index < this.songs.length - 1) {
      this.currentSong = this.songs[index + 1];
    }
  }

  prevSong() {
    const index = this.songs.indexOf(this.currentSong);
    if (index > 0) {
      this.currentSong = this.songs[index - 1];
    }
  }

  toggleFavorite(song: any) {
    song.isFavorite = !song.isFavorite;
  }

  addToQueue(song: any) {
    alert(`Thêm vào hàng chờ: ${song.title}`);
  }

  addToPlaylist(song: any) {
    alert(`Thêm vào Playlist: ${song.title}`);
  }
  selectPlaylist(playlist: any) {
    alert(`Chọn playlist: ${playlist.name}`);
  }
  playSong(fileName: string, id: number) {
    debugger;
    this.isPlaying = !this.isPlaying;
    this.currentPlay.set(id, true);
    this.clicked = !this.clicked;
    this.cnt++;
    if (this.prevSongId == -1) {
      this.prevSongId = id;
    }
    if (this.prevSongId != id) {
      this.cnt = 1;
      this.prevSongId = id;
      this.currentPlay.set(this.prevSongId, true);
    }
    const audio = document.querySelector('audio') as HTMLAudioElement;
    if (this.cnt == 1) {
      audio.src = `http://localhost:8088/api/v1/files/${encodeURIComponent(
        fileName
      )}`;
    }
    audio.play();
  }
  pauseSong(id: number) {
    this.cnt++;
    this.isPlaying = !this.isPlaying;
    this.currentPlay.set(id, false);
    const audio = document.querySelector('audio') as HTMLAudioElement;
    audio.pause();
  }
  chkPlaying(id: number) {
    return this.currentPlay.get(id);
  }
}

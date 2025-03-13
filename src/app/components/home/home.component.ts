import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song';
// import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  songs: Song[] = [];
//   constructor(private songService: SongService) {}
//   ngOnInit(): void {
//       this.songService.getAllSongs().subscribe((data) => {
//         debugger
//         this.songs = data
//         console.log(this.songs)
//       })
//   }
//   playSong(fileName: string) {
//   const audio = document.querySelector('audio') as HTMLAudioElement;
//   audio.src = `http://localhost:8080/api/v1/files/${encodeURIComponent(fileName)}`;
//   audio.play();
// }
	playSong(fileName:string) {

	}
}

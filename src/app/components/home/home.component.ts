import { Component, OnInit } from "@angular/core";
import { Song } from "../../models/song";
import { SongService } from "../../services/song.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
    playlists = [
        { name: "Chill Vibes" },
        { name: "Workout Playlist" },
        { name: "Coding Music" },
    ];
    public hoveredIndex: number = -1;
    public songs: Song[] = [];
    public isPlaying: boolean = false;
    public timesPlayed: number = 0;
    public prevSongId: number = -1;
    public currentPlay: Map<number, boolean> = new Map();
    public currentSong: Song = {
      id: 0,
      title: "",
      artist: "",
      album: "",
      genre: "",
      duration: "",
      file_name: "",
      is_favorite: false,
    };

    constructor(private songService: SongService) {}
    ngOnInit(): void {
        this.songService.getAllSongs().subscribe({
            next: (data: any) => {
                debugger;
                this.songs = data;
            },
            complete: () => {
                debugger;
                console.log("complete");
            },
            error: (err: any) => {
                debugger;
                console.log(err);
            },
        });
        this.currentSong = this.songs[0];
    }

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

    toggleFavorite(song: Song) {
        song.is_favorite = !song.is_favorite;
    }

    addToQueue(song: Song) {
        alert(`Thêm vào hàng chờ: ${song.title}`);
    }

    addToPlaylist(song: Song) {
        alert(`Thêm vào Playlist: ${song.title}`);
    }
    selectPlaylist(playlist: any) {
        alert(`Chọn playlist: ${playlist.name}`);
    }
    playSong(song: Song) {
        debugger;
        this.isPlaying = !this.isPlaying;
        this.currentPlay.set(song.id, true);
        this.timesPlayed++;
        if (this.prevSongId == -1) {
          this.prevSongId = song.id;
          this.currentSong = song;
        }
        if (this.prevSongId != song.id) {
            this.timesPlayed = 1;
            this.currentPlay.set(this.prevSongId, false);
            this.prevSongId = song.id;
            this.currentSong = song;
        }
        const audio = document.querySelector("audio") as HTMLAudioElement;
        if (this.timesPlayed == 1) {
            audio.src = `http://localhost:8088/api/v1/files/${encodeURIComponent(
              song.file_name
            )}`;
        }
        audio.play();
    }
    pauseSong(id: number) {
        debugger;
        this.timesPlayed++;
        this.isPlaying = !this.isPlaying;
        this.currentPlay.set(id, false);
        const audio = document.querySelector("audio") as HTMLAudioElement;
        audio.pause();
    }
    chkPlaying(id: number) {
        return this.currentPlay.get(id);
    }
    toggleShuffle() {
        alert("Xáo trộn");
    }
    toggleRepeat() {
        alert("Lặp lại");
    }
}

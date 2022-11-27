import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { GameResult, GAME_OPTIONS, GAME_STATUS } from "./game.model";
import { PlayingService } from "./services/playing.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  gameStatus: GAME_STATUS = GAME_STATUS.WAITING_PLAY;
  selectedOption: GAME_OPTIONS;
  systemPlay: GAME_OPTIONS;
  public GAME_OPTIONS_ENUM = GAME_OPTIONS; // direct reference

  constructor(
    private cookieService: CookieService,
    private playingService: PlayingService
  ) {}

  ngOnInit(): void {
    //this.cookieService.deleteAll();
    if (!this.cookieService.get("rps-user-id")) {
      this.cookieService.set(
        "rps-user-id",
        Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
      );
    }

    this.gameStatus = GAME_STATUS.WAITING_PLAY;
  }

  private isGameWaitingPlay() {
    return this.gameStatus === GAME_STATUS.WAITING_PLAY;
  }

  isRockSelected() {
    return this.selectedOption === GAME_OPTIONS.ROCK;
  }

  isPaperSelected() {
    return this.selectedOption === GAME_OPTIONS.PAPER;
  }

  isScissorsSelected() {
    return this.selectedOption === GAME_OPTIONS.SCISSORS;
  }

  playAgainHandler() {
    this.gameStatus = GAME_STATUS.WAITING_PLAY;
    this.selectedOption = null;
    this.systemPlay = null;
  }

  userWins() {
    return this.gameStatus === GAME_STATUS.WIN;
  }

  userLose() {
    return this.gameStatus === GAME_STATUS.LOSE;
  }

  userTies() {
    return this.gameStatus === GAME_STATUS.TIE;
  }

  waitingForPlayer() {
    return this.gameStatus === GAME_STATUS.WAITING_PLAY;
  }

  optionSelected(selectedGameOption: GAME_OPTIONS) {
    if (this.isGameWaitingPlay()) {
      this.selectedOption = selectedGameOption;

      this.playingService.sendPlay(selectedGameOption).subscribe(
        (data: GameResult) => {
          this.gameStatus = data.result;
          this.systemPlay = data.systemPlay;
        },
        (error) => {
          alert(
            "Sorry but service seems not to be available at the moment, please try it again later."
          );
        }
      );
    }
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GAME_OPTIONS } from "../game.model";

@Injectable({
  providedIn: "root",
})
export class PlayingService {
  private REST_API_SERVER = "game-core";

  constructor(private httpClient: HttpClient) {}

  public checkBackendServiceIsAvailable() {
    return this.httpClient.get(this.REST_API_SERVER + "/available");
  }

  public sendPlay(option: GAME_OPTIONS) {
    return this.httpClient.get(this.REST_API_SERVER + "/play/" + option);
  }
}

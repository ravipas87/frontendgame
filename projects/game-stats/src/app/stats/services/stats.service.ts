import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "projects/game-core/src/environments/environment";

@Injectable()
export class StatsService {
  private REST_API_SERVER = "/game-stats";

  constructor(private httpClient: HttpClient) {}

  public retrieveTop10Stats() {
    return this.httpClient.get(
      environment.apiUrl + this.REST_API_SERVER + "/stats/top"
    );
  }

  public retrieveMyStats(userId: string) {
    return this.httpClient.get(
      environment.apiUrl + this.REST_API_SERVER + "/stats/users/" + userId
    );
  }
}

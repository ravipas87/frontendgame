import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { StatsService } from "./services/stats.service";
import { Score } from "./stats.model";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.css"],
})
export class StatsComponent implements OnInit {
  topScores: Score[];
  myStats: Score = {};

  constructor(
    private readonly statsService: StatsService,
    private cookieService: CookieService
  ) {
    this.myStats.winCount = 0;
    this.myStats.loseCount = 0;
    this.myStats.tieCount = 0;
  }

  ngOnInit(): void {
    this.retrieveData();
    this.retrieveMyStats();
  }

  retrieveData() {
    this.statsService.retrieveTop10Stats().subscribe((data: Score[]) => {
      this.topScores = data;
    });
  }

  retrieveMyStats() {
    if (this.cookieService.get("rps-user-id")) {
      this.statsService
        .retrieveMyStats(this.cookieService.get("rps-user-id"))
        .subscribe(
          (data: Score) => {
            this.myStats = data;
          },
          (error) => {
            this.myStats.winCount = 0;
            this.myStats.loseCount = 0;
            this.myStats.tieCount = 0;
            this.notifyBackendServiceStatsIsnotAvailable();
          }
        );
    }
  }

  private notifyBackendServiceStatsIsnotAvailable() {
    alert("Sorry but backend for stats seems not to be available.");
  }
}

import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { StatsService } from "./services/stats.service";

import { StatsRoutingModule } from "./stats-routing.module";
import { StatsComponent } from "./stats.component";

@NgModule({
  declarations: [StatsComponent],
  providers: [CookieService, StatsService],
  imports: [CommonModule, HttpClientModule, StatsRoutingModule],
})
export class StatsModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GameComponent } from "./game/game.component";
import { loadRemoteModule } from "./utils/federation-utils";

const routes: Routes = [
  { path: "", redirectTo: "game", pathMatch: "full" },
  { path: "game", component: GameComponent },
  {
    path: "stats",
    loadChildren: () =>
      loadRemoteModule({
        remoteName: "stats",
        remoteEntry: "http://localhost:4201/remoteEntry.js",
        exposedModule: "StatsModule",
      }).then((m) => m.StatsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

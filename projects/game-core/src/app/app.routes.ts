import { Routes } from "@angular/router";
import { GameComponent } from "./game/game.component";

export const APP_ROUTES: Routes = [
  { path: "", redirectTo: "game", pathMatch: "full" },
  {
    path: "game",
    component: GameComponent,
  },
];

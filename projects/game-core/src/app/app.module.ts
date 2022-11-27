import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AppComponent } from "./app.component";
import { APP_ROUTES } from "./app.routes";
import { GameComponent } from "./game/game.component";
import { MicrofrontendService } from "./microfrontends/microfrontend.service";

export function initializeApp(
  mfService: MicrofrontendService
): () => Promise<void> {
  return () => mfService.initialise();
}

@NgModule({
  declarations: [AppComponent, GameComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: "legacy" }),
    HttpClientModule,
  ],
  providers: [
    MicrofrontendService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [MicrofrontendService],
    },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

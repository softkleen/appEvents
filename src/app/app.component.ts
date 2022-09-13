import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'folder', icon: 'home' },
    { title: 'Usuários', url: 'usuarios', icon: 'people' },
  ];
  constructor() {}


}

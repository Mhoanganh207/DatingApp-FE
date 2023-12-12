import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  logIn(){
    document.getElementById("logIn")?.classList.remove("hide");
    document.getElementById("logIn")?.classList.add("show");
    //@ts-ignore
    document.getElementById("logInBd").style.display = "block";
  }
     
}

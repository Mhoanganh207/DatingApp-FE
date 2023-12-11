import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteModule } from 'flowbite-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FlowbiteModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
    initFlowbite();
  }


  showLogin(){
    document.getElementById("logIn")?.classList.remove("hide");
    document.getElementById("logIn")?.classList.add("show");
    //@ts-ignore
    document.getElementById("logInBd").style.display = "block";
  }

  hideLogin(){
    document.getElementById("logIn")?.classList.add("hide");
    //@ts-ignore
    document.getElementById("logInBd").style.display = "none";
  }

}

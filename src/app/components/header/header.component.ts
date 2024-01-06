import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { FlowbiteModule } from 'flowbite-angular';
import { AccountService } from '../../services/account.service';
import { UserDto } from '../../models/userdto';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FlowbiteModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './header.component.html',
  providers : [AccountService]
})
export class HeaderComponent implements OnInit {

  public unauthorized : boolean = false;

  constructor(private accountService : AccountService){
    this.accountService = accountService;

  }

  ngOnInit(): void {
    initFlowbite();
  }

  public formLogIn : FormGroup = new FormGroup({
      username : new FormControl(''),
      password : new FormControl('')
  });

  unauthorizedHandle(){
     const list = document.getElementsByClassName("logIn-input")
     list[0].classList.remove("border-gray-300");
     list[0].classList.add("border-red-500","border-2");
     list[1].classList.remove("border-gray-300");
     list[1].classList.add("border-red-500","border-2")
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

  logIn(){
    const username = this.formLogIn.get("username")?.value;
    const password = this.formLogIn.get("password")?.value;
    let user = new UserDto(username,password);
    this.accountService.logIn(user).subscribe({
      next : response =>{
        console.log(response);
      },
      error : error =>{
        this.unauthorized = true;
        this.unauthorizedHandle();

      }

  })
  }

}

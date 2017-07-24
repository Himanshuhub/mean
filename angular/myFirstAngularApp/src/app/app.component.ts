import { Component } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: any[] = [
    {title: 'first task'}, 
    {title: 'second task'}
  ];
  constructor(){}
  user = new User();
  users = [];
  onSubmit(){
    this.users.push(this.user);
    this.user = new User();
    console.log("Hi I'm printing on submit button");
  };



  num: number = 1;
  logNum(){
    this.num ++;
    console.log('num is: ', this.num);    
  };
  
  color='red';
  myBoolean = true;
  myArray = [1,2,3,4,5];
  number = 10;
  name = 'Bill Gates';
  // user = {
  //   firstName: 'Darth',
  //   lastName: 'Vader'
  // }
	amount = 1.20;
	today = new Date();  
  title = 'app';
}

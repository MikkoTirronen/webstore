import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
  
  <form [formGroup] = "form">
    <fieldset>
      <legend>Login</legend>
      <div class ="form-field">
        <label>Email: </label>
        <input name= "email" formControlName ="email"/>
        <div>
      <div class ="form-field">
        <label>Password: </label>
        <input name= "password" formControlName ="password" type="password"/>
        <div>
  <div class ="form-buttons">
  <button class ="button button-primary"
  (click) ="login()">Login</button>
  </div>
  `,
})
export class LoginComponent{
  form: FormGroup;

  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password:['',Validators.required]
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  template: ` <div class="mx-auto ">
      <p>Hello</p>
    </div>
    <form [formGroup]="form">
      <fieldset>
        <Legend>Update User Info</Legend>
        <div class="form-field">
          <label>Email:</label>
          <input name="username" formControlName="username" />
        </div>
        <div class="form-field">
          <label>Password</label>
          <input name="password" formControlName="password" />
        </div>
        <div class="form-field">
          <label>Name</label>
          <input name="name" formControlName="name" />
        </div>
        <div class="form-field">
          <label>Telephone:</label>
          <input name="telephone" formControlName="telephone" />
        </div>
        <div class="form-field">
          <label>Address:</label>
          <input name="address" formControlName="address" />
        </div>
        <div class="form-field">
          <label>Email:</label>
          <input name="username" formControlName="username" />
        </div>
      </fieldset>
    </form>`,
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
}

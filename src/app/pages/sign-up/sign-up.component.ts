import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  template: `
    <section class="h-screen">
      <div class="px-6 h-full text-gray-800">
        <div
          class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
        >
          <div
            class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="w-full"
              alt="Sample image"
            />
          </div>
          <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form [formGroup]="form">
              <!-- Email input -->
              <div class="mb-6 form-field">
                <label>Email:</label>
                <input
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  formControlName="username"
                />
              </div>

              <!-- Password input -->
              <label>Password:</label>
              <div class="mb-6 form-field">
                <input
                  type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  formControlName="password"
                />
              </div>

              <label>Name:</label>
              <div class="mb-6 form-field">
                <input
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Name"
                  formControlName="name"
                />
              </div>
              <label>Telephone Number:</label>
              <div class="mb-6 form-field">
                <input
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Telephone"
                  formControlName="telephone"
                />
              </div>

              <label>Address:</label>
              <div class="mb-6 form-field">
                <input
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Address"
                  formControlName="address"
                />
              </div>

              <div class="text-center lg:text-left">
                <button
                  type="button"
                  class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  (click)= "SignUp()"
                  >
                  Sign Up
                </button>
                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                  Return to
                  <a
                    href="/login"
                    class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >Login Page</a
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  SignUp() {
    const val = this.form.value;
    console.log(val);
    if (
      val.username &&
      val.password &&
      val.name &&
      val.telephone &&
      val.address
    ) {
      this.authService
        .signUp(
          val.username,
          val.password, val.name, val.telephone, val.address
        )
        .subscribe(() => {
          console.log('User is logged in');
          this.router.navigateByUrl('/');
        });
    }
  }
  ngOnInit(): void {}
}

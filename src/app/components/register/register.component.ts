import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterDTO } from '../../dtos/register.dto';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public submitted = false;
  public showPassword = false;
  public showRetypePassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        retypePassword: ['', Validators.required],
      },
      { validator: this.matchPasswords }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const retypePassword = group.get('retypePassword')?.value;
    return password === retypePassword ? null : { mismatch: true };
  }

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleRetypePassword() {
    this.showRetypePassword = !this.showRetypePassword;
  }

  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const registerDTO: RegisterDTO = {
      email: this.registerForm.get('email')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      retype_password: this.registerForm.get('retypePassword')?.value,
    };
    console.log(registerDTO);
    this.userService.register(registerDTO).subscribe({
      next: () => {
        debugger;
        console.log('register succesfully');
        alert('Register succesfully, check email for more information');
        this.router.navigate(['/login']);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.errorMessage);
      },
    });
  }
}

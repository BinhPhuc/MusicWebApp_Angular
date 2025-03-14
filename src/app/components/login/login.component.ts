import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LoginDTO } from '../../dtos/login.dto';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  public showPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['pham.phuc.binh.271106@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginDTO: LoginDTO = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.userService.login(loginDTO).subscribe({
      next: (data: any) => {
        debugger
        alert(`Welcome ${data.username}`);
        this.router.navigate(['/home']);
      },
      complete: () => {
        debugger
        console.log('complete');
      },
      error: (error: any) => {
        debugger
        alert(error.error.errorMessage);
        console.log(error);
      },
    })
  }
}

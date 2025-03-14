import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  public showPassword = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.loginForm.controls; }

  ngOnInit() {

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    
  }

  onSubmit() {
    console.log(this.loginForm.get('email')?.value)
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log('Đăng nhập thành công!', this.loginForm.value);
      alert('Đăng nhập thành công!');
    } else {
      console.log('Form không hợp lệ!');
    }
  }
}

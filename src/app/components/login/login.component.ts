import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  error: string | null;
  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      // console.log('this.form.value => ', this.form.value);
      this.firebaseService.doSignInWithEmailAndPassword(this.form.controls[`email`].value, this.form.controls[`password`].value)
        .then(res => {
          // console.log('res => ', res);
          this.router.navigate(['/home']);
        }, err => {
          console.log('err => ', err);
          this.error = err.message;
          this.form.controls[`password`].setValue('');
        });
    }
  }

}

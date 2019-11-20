import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),
  }, { validators: [this.checkPasswords] });
  error: string | null;
  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('cpassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  submit() {
    if (this.form.valid) {
      const userData = {
        ...this.form.value
      };
      delete userData.password;
      delete userData.cpassword;
      this.firebaseService
        .doRegisterUserWithEmailAndPassword(
          this.form.controls[`email`].value,
          this.form.controls[`password`].value
        ).then(authUser => {
          console.log('authUser => ', authUser, authUser.user);
          userData.uid = authUser.user.uid;
          userData.role = 'user';
          this.firebaseService.addOrUpdateUser('Users', userData, authUser.user.uid)
            .then(doc => this.router.navigate(['/home']))
            .catch(err => { console.log('err => ', err); });

        }).catch(err => {
          console.log('err => ', err);
          this.error = err.message;
        });
    }
  }

}

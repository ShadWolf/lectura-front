import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  myForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder
  ) {
    this.myForm = this.createMyForm();
  }

  ngOnInit() {
  }
  saveData() {
    console.log(this.myForm.value);
  }

  passwordErrors() {
    const errors = this.myForm.get('passwordRetry').get('password').errors;
    for (const errorName in errors) {
      if (errors[errorName]) {
        switch (errorName) {
          case 'required':
            return null;
          case 'minlength':
            return `Must be at least ${this.myForm.get('passwordRetry').get('password').errors.minlength.requiredLength} characters long.`;
          case 'pattern' :
            return 'Debe tener A-Z a-z 0-9'
           case 'email':
            return 'Please enter an email address';
          default:
            return errors[errorName];
        }
      }
    }
}
passwordRetryErrors(){
  const errors = this.myForm.get('passwordRetry').errors;
  for (const errorName in errors) {
    if (errors[errorName]) {
      switch (errorName) {
        case 'mismatchedPasswords':
          return `Contraseñas distintas`;
        default:
          return errors[errorName];
      }
    }
  }
}
  private createMyForm() {
  return this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', Validators.required],
    passwordRetry: this.formBuilder.group({
      password: ['', [Validators.minLength(5),
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      passwordConfirmation: ['', [Validators.minLength(5),
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    }, { validator: this.matchingPasswords('password', 'passwordConfirmation') })
  });
}
  private matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): { [key: string]: any } => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}
}

import { afterNextRender, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { emailExistsValidator } from '../../async-validators/email-exists.validators';
import { RequiredTrimValidators } from '../../validators/required-trim.validators';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formData: FormGroup;
  private subscription?: Subscription;

  constructor() {
    this.formData = new FormGroup({
      email: new FormControl<string>('', {
        validators: [Validators.email],
        asyncValidators: [emailExistsValidator()],
        updateOn: 'blur',
      }),
      password: new FormControl<string>('', {
        validators: [Validators.minLength(6), RequiredTrimValidators],
      }),
    });

  }

  ngOnInit(): void {
    const savedForm = window.localStorage.getItem('saved-login-form');

    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);

      this.formData.patchValue({
        email: loadedForm.email
      })

    }

    this.subscription = this.formData.valueChanges.pipe(debounceTime(500)).subscribe({
        next: value => {
          console.log(value);
          window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}))
        }
      })

  }

  get emailCtrl() {
    return this.formData.get('email')!;
  }

  get emailIsInvalid() {
    return (
      this.emailCtrl.touched && this.emailCtrl.dirty && this.emailCtrl.invalid
    );
  }

  get passwordCtrl() {
    return this.formData.get('password')!;
  }

  get passwordIsInvalid() {
    return (
      this.passwordCtrl.touched &&
      this.passwordCtrl.dirty &&
      this.passwordCtrl.invalid
    );
  }

  onSubmit() {
    console.log(this.formData);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

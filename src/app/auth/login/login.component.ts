import { afterNextRender, Component, viewChild, } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData: FormGroup;
  private subscription?: Subscription;

  constructor(){

    this.formData = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.email
        ]
      }),
      password: new FormControl('', {
        validators: [
          Validators.minLength(6)
        ]
      }),
    })

    afterNextRender(() => {
      // this.subscription = this.formData().valueChanges?.pipe(debounceTime(500)).subscribe({
      //   next: value => {
      //     console.log(value);
      //     window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}))         
      //   }
      // })
    })
  }

  onSubmit(){
    console.log(this.formData);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

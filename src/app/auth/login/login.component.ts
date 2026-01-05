import { afterNextRender, Component, viewChild, } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private formData=  viewChild.required<NgForm>('form');
  private subscription?: Subscription;

  constructor(){
    afterNextRender(() => {
      this.subscription = this.formData().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: value => {
          console.log(value);
          window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}))         
        }
      })
    })
  }

  onSubmit(formData: NgForm){
    console.log(formData);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

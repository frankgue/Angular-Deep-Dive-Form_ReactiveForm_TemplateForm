import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValueMatchValidator(controlName1: string, controlName2: string) {
 return(
  group: AbstractControl
) => { const val1 = group.get('controlName1')?.value;
  const val2 = group.get('controlName2')?.value;

  return val1 === val2 ? null : { valuedMismatch: true };}
}

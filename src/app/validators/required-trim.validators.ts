import { AbstractControl, ValidationErrors } from '@angular/forms';

export function RequiredTrimValidators(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value || control.value.trim() === '') {
    return { requiredTrim: true };
  }

  return null;
}

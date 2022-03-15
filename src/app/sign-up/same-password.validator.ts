import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function samePasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const enteredPassword = control.parent?.get('password')?.value;
    if (enteredPassword !== control.value) {
      return {
        samePassword: {
          value: control.value,
        },
      };
    }
    return null;
  };
}

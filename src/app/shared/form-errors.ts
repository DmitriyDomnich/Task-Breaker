import { FormControl } from '@angular/forms';

export class FormErrors {
  private static errors: any = {
    email: 'Invalid email input',
    required: 'Enter the field',
    samePassword: "Passwords don't match",
    minlength(minLength: number) {
      return `At least ${minLength} symbols`;
    },
  };
  static getErrorMessages(formControl: FormControl) {
    const errorMessages = [];
    for (const errorKey in this.errors) {
      const error = formControl.getError(errorKey);
      if (error) {
        typeof this.errors[errorKey] === 'function'
          ? errorMessages.push(this.errors[errorKey](error.requiredLength))
          : errorMessages.push(this.errors[errorKey]);
      }
    }
    return errorMessages.map((errorMes, index, arr) =>
      arr.length - 1 !== index ? `${errorMes}, ` : `${errorMes}`
    );
  }
}

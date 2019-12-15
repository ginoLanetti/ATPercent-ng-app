import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-alert-box',
    templateUrl: './alert-box.component.html',
    styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent {
    @Input() inputErrors: ValidationErrors;
    @Input() ifSubmitted: boolean;

    getErrorMsg(): string {
        if (this.inputErrors) {
            if (this.inputErrors.min) {
                return `This value should not be lower than ${this.inputErrors.min.min}`;
            } else if (this.inputErrors.required) {
                return 'This field is required';
            } else if (this.inputErrors.notUnique) {
                return `Saved plots can't have the same name`;
            }
        }
    }
}

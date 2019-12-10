import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-alert-box',
    templateUrl: './alert-box.component.html',
    styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent {
    @Input() inputErrors: any;
    @Input() formErrors: any;
    @Input() ifSubmitted: boolean;

    getErrorMsg(): string {
        if (this.inputErrors){
            if (this.inputErrors.min) {
                return `This value should not be lower than ${this.inputErrors.min.min}`;
            } else if (this.inputErrors.required) {
                return 'This field is required'
            } else if (this.inputErrors.notUnique) {
                return 'Please type unique name'
            } 
        } else if (this.formErrors) {
            if (this.formErrors.sequenceMissing) {
                return 'sequence is required';

            }
        }

    }
}

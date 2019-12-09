import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-alert-box',
    templateUrl: './alert-box.component.html',
    styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent {
    @Input() errors: any;
    @Input() ifSubmitted: boolean;

    getErrorMsg(): string {
        if (this.errors.min) {
            return `This value should not be lower than ${this.errors.min.min}`;
        } else if (this.errors.required) {
            return 'This field is required'
        }

    }
}

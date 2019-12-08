import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})

export class InputComponent {
    @Input() labelName: string;
    @Input() inputType: string;
    @Input() formController: FormControl;
    @Input() errors: any;
    @Input() ifSubmitted: boolean;
}

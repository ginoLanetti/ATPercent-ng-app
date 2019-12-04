import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SequenceDataModel } from 'src/shared/models/sequence-data.model';

@Component({
    selector: 'app-main-screen',
    templateUrl: './main-screen.component.html',
    styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
    form: FormGroup;
    submitted: boolean;
    sequenceData: SequenceDataModel;

    constructor(private formBuilder: FormBuilder) {}
    ngOnInit() {
        this.buildForm();
    }
    submit(): void {
        const {window, step, seqFileContent} = this.form.value;
        this.sequenceData = new SequenceDataModel(window, step, seqFileContent);
        this.submitted = true;
        console.log(seqFileContent);
    }
    private buildForm(): void {
        this.form = this.formBuilder.group({
            window: ['', [Validators.required, Validators.min(1)]],
            step: ['', [Validators.required, Validators.min(1)]],
            seqFileContent: [null, Validators.required]
        });
    }
}

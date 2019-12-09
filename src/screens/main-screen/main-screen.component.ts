import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    valid: boolean;

    //https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=<TUTAJ GI_NUMBER SEKWENCJI>&rettype=fasta&retmode=text
    //https://rest.ensembl.org/sequence/id/<ID_SEWENCJI>?content-type=application/json
   
    constructor(private formBuilder: FormBuilder) {}
    ngOnInit() {
        this.buildForm();
    }
    submit(): void {
        this.submitted = true;
        const { window, step, seqFileContent } = this.form.value;
        if (this.form.valid) {    
            this.valid = true;    
            const stepInt = parseInt(step);
            const windowInt = parseInt(window)
            this.sequenceData = new SequenceDataModel(windowInt, stepInt, seqFileContent);  
        }
        
    }

    private buildForm(): void {
        this.form = this.formBuilder.group({
            window: ['', [Validators.required, Validators.min(1)]],
            step: ['', [Validators.required, Validators.min(1)]],
            seqFileContent: [null, Validators.required],
        });
    }
}

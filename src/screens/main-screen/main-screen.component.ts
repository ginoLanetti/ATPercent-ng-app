import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { SequenceDataModel } from 'src/shared/models/sequence-data.model';
import { Store } from '@ngxs/store';
import { SavePlot } from 'src/shared/state/plot.actions';

@Component({
    selector: 'app-main-screen',
    templateUrl: './main-screen.component.html',
    styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
    form: FormGroup;
    submitted: boolean;
    sequenceData: SequenceDataModel;
    plotNameControl: FormControl;
    //https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=<TUTAJ GI_NUMBER SEKWENCJI>&rettype=fasta&retmode=text
    //https://rest.ensembl.org/sequence/id/<ID_SEWENCJI>?content-type=application/json
    
    constructor(private store: Store, private formBuilder: FormBuilder) {}
    ngOnInit() {
        this.buildForm();
    }
    submit(): void {
        this.submitted = true;
        const { window, step, seqFileContent} = this.form.value;
        if (this.form.valid) {
            const stepInt = parseInt(step);
            const windowInt = parseInt(window)
            this.sequenceData = new SequenceDataModel({window: windowInt, step: stepInt, seqFileContent: seqFileContent});
        }
        this.plotNameControl = new FormControl('')
    }
    savePlot() {
        const plotName = this.plotNameControl.value
        const plotData = new SequenceDataModel({
            ...this.sequenceData, plotName
        })
        this.store.dispatch(new SavePlot(plotData))
    }
    private buildForm(): void {
        this.form = this.formBuilder.group({
            window: ['', [Validators.required, Validators.min(1)]],
            step: ['', [Validators.required, Validators.min(1)]],
            seqFileContent: [null, Validators.required]
        });
    }
}

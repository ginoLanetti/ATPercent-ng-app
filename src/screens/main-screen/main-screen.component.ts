import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { SequenceDataModel } from 'src/shared/models/sequence-data.model';
import { FetchingSequencesService } from 'src/shared/services/fetching-sequences.service';


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
    sequenceSources: Array<any> = [{label: 'Upload sequence file', value: 'uploaded'}, {label: 'Download form ensembl database', value: 'downloaded'}]
    downloadedData: any
   
    constructor(private formBuilder: FormBuilder, private fetchingSequences: FetchingSequencesService) {}

    ngOnInit() {
        this.buildForm();     
    }
    submit(): void {
        const { window, step, seqFileContent, sequenceSource } = this.form.value;
        this.submitted = true;
        // this.form.controls['sequenceIdNum'].reset()
        if (this.form.valid) {    
            this.valid = true;    
            const stepInt = parseInt(step);
            const windowInt = parseInt(window)
            if (sequenceSource === 'uploaded'){
                this.sequenceData = this.whenUploaded(windowInt, stepInt, seqFileContent)
            } else {
                this.sequenceData = this.whenDownloaded(windowInt, stepInt)
            }
        }
    }
    getSequence() {
        const { sequenceIdNum } = this.form.value
        this.fetchingSequences.fetchSequence(sequenceIdNum).subscribe(
        (data) => {this.downloadedData = {sequence: data.seq, label: data.desc}},
        (error) => alert('There is no such sequence in the database. Check if sequence ID is correct'))
    }
    sequenceMissingValidator: ValidatorFn = (group: FormGroup) => {
        const fileUploaded = group.get('seqFileContent').value;
        // const idDownloaded= group.get('sequenceIdNum').value;
        const idDownloaded = this.downloadedData;
        return fileUploaded || idDownloaded
          ? null
          : { sequenceMissing: true };
    };
    private whenUploaded(window: number, step: number, seqFileContent: string) {
        return new SequenceDataModel(window, step, seqFileContent);
    }
    private whenDownloaded(window: number, step: number) {
        return new SequenceDataModel(window, step, this.downloadedData.sequence.toLowerCase(), this.downloadedData.label)
    }
    private buildForm(): void {
        this.form = this.formBuilder.group({
            window: ['', [Validators.required, Validators.min(1)]],
            step: ['', [Validators.required, Validators.min(1)]],
            seqFileContent: [null, Validators.required],
            sequenceIdNum: [''],

            sequenceSource: [this.sequenceSources[0].value]}, {validator: this.sequenceMissingValidator});
    }
}

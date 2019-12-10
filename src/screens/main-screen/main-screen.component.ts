import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    sequenceSources: Array<any> = [
        {label: 'Upload sequence file', value: 'uploaded'},
        {label: 'Download form ensembl database', value: 'downloaded'}
    ];
    downloadedData: any;

    constructor(private formBuilder: FormBuilder, private fetchingSequences: FetchingSequencesService) {}

    ngOnInit() {
        this.buildForm();
    }
    submit(): void {
        const { seqFileContent, sequenceSource } = this.form.value;
        this.submitted = true;
        this.valid = true;
        const step = parseInt(this.form.value.step);
        const window = parseInt(this.form.value.window);

        sequenceSource === this.sequenceSources[0].value
            ? this.whenUploaded(window, step, seqFileContent)
            : this.whenDownloaded(window, step);
    }
    getSequence() {
        const { sequenceIdNum } = this.form.value;
        this.fetchingSequences.fetchSequence(sequenceIdNum).subscribe(
            (data) => {
                this.downloadedData = { sequence: data.seq, label: data.desc };
            },
            (error) => (
                alert('There is no such sequence in the database. Check if sequence ID is correct')
            )
        );
    }

    private whenUploaded(window: number, step: number, seqFileContent: string): void {
        if (this.form.valid) {
            this.sequenceData = new SequenceDataModel(window, step, seqFileContent);
        }
    }
    private whenDownloaded(window: number, step: number): void {
        if (this.form.valid && this.downloadedData) {
            this.sequenceData = new SequenceDataModel(window, step, this.downloadedData.sequence.toLowerCase(), this.downloadedData.label)
        }
    }
    private buildForm(): void {
        this.form = this.formBuilder.group({
            window: ['', [Validators.required, Validators.min(1)]],
            step: ['', [Validators.required, Validators.min(1)]],
            seqFileContent: [null, Validators.required],
            sequenceIdNum: [''],
            sequenceSource: [this.sequenceSources[0].value]
        });
    }
}
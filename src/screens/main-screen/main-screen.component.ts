import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SequenceDataModel } from 'src/shared/models/sequence-data.model';
import { FetchingSequencesService } from 'src/shared/services/fetching-sequences.service';
import { SequenceSources } from 'src/shared/interfaces/sequence-sources.interface';
import { DownloadedData } from 'src/shared/interfaces/downloaded-data.interface';

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
    sequenceSources: Array<SequenceSources> = [
        {label: 'Upload sequence file', value: 'uploaded'},
        {label: 'Download form ensembl database', value: 'downloaded'}
    ];
    fetchingData: boolean;
    downloadedData: DownloadedData;

    constructor(private formBuilder: FormBuilder, private fetchingSequences: FetchingSequencesService) {}

    ngOnInit() {
        this.buildForm();
        this.subscribeSequenceSourceChange();
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
        this.fetchingData = true;
        this.fetchingSequences.fetchSequence(sequenceIdNum).subscribe(
            (data) => {
                this.downloadedData = { sequence: data.seq, label: data.desc };
                this.fetchingData = false;
            },
            (error) => {
                alert('There is no such sequence in the database. Check if sequence ID is correct');
                this.fetchingData = false;
            }
        );
    }

    private whenUploaded(window: number, step: number, seqFileContent: string): void {
        if (this.form.valid) {
            this.sequenceData = new SequenceDataModel(window, step, seqFileContent);
        }
    }
    private whenDownloaded(window: number, step: number): void {
        if (this.form.valid && this.downloadedData) {
            this.sequenceData = new SequenceDataModel(window, step, this.downloadedData.sequence.toLowerCase(), this.downloadedData.label);
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

    private subscribeSequenceSourceChange(): void {
        const seqContentControl = this.form.controls.seqFileContent;
        this.form.controls.sequenceSource.valueChanges.subscribe(
            sequenceSource => {
            if (sequenceSource === this.sequenceSources[1].value) {
                seqContentControl.setValidators(null);
            } else {
                this.submitted = false;
                seqContentControl.setValidators(Validators.required);
            }
            seqContentControl.updateValueAndValidity();
        });
    }
}

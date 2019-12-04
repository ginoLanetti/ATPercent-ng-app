import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-file-loader',
    templateUrl: './file-loader.component.html',
    styleUrls: ['./file-loader.component.scss']
})
export class FileLoaderComponent {
    @Input() labelName: string;
    @Input() formController: FormControl;
    @Input() accept: string;
    file: File;

    onFileChange(event): void {
        this.file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(this.file);
        fileReader.onload = () => {
            console.log(fileReader.result);
            this.formController.setValue(fileReader.result)
        };
    }
}

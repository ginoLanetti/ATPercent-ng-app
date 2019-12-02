import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-file-loader',
    templateUrl: './file-loader.component.html',
    styleUrls: ['./file-loader.component.scss']
})
export class FileLoader {
    @Input() labelName:string
}
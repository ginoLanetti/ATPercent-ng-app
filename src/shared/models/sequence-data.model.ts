export class SequenceDataModel {
    public window: number;
    public step: number;
    public seqFileContent: string;

    constructor(window: number, step: number, seqFileContent: string) {
        this.window = window;
        this.step = step;
        this.seqFileContent = seqFileContent;
    }
}

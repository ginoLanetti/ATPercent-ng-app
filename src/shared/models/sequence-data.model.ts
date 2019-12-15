export class SequenceDataModel {
    public window: number;
    public step: number;
    public seqFileContent: string;
    public label?: string;

    constructor(window: number, step: number, seqFileContent: string, label?: string) {
        this.window = window;
        this.step = step;
        this.seqFileContent = seqFileContent;
        this.label = label;
    }
}

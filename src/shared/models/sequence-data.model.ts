export class SequenceDataModel {
    public window: number;
    public step: number;
    public seqFileContent: string;
    public plotName?: string;

    constructor(sequenceData: SequenceDataModel) {
        this.window = sequenceData.window;
        this.step = sequenceData.step;
        this.seqFileContent = sequenceData.seqFileContent;
        this. plotName = sequenceData.plotName
    
    }
}

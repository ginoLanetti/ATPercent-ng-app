export const returnSequencesAndLabels = (fileContent: string): object => {
    const patterns = {
        lineBreaks: /(\r\n)+|\r+|\n+|\t+/i,
        anySpacesOrBreaks: /\r?\n\s|\r\s|\s/g,
        spacesAround: /\r?\n|\r/g
    };
    const mixedData: Array<string> = (fileContent.toLowerCase()).split('>');
    mixedData.shift();
    const onlySequences = mixedData.map(sequence => (
        sequence.slice(sequence.search(patterns.lineBreaks)).replace(patterns.anySpacesOrBreaks, '')
    ));
    const onlyLabels: Array<string> = mixedData.map(label => (
      label.substring(0, label.search(patterns.spacesAround)).trim()
    ));
    const sequencesAndLabels = {
      sequences: onlySequences,
      labels: onlyLabels
    };
    return sequencesAndLabels;
};

// const returnATPercent = (singleSequence: string, startPosition: number, windowWidth: number) => {
//         // calculating average AT % in window in a single position
// let countAT = 0;
// for (let i = startPosition; i < (startPosition + windowWidth); i++) {
//     if ((singleSequence[i] === 'a') || (singleSequence[i] === 't')) {
//         countAT++;
//     }
// }
// return (countAT / windowWidth) * 100;
// };
// const setDataset = (labels: Array<string>, sequences: Array<string>, window: number, step: number) => {
//     const multipleDatasets = [];
//     for (let i = 0; i < this.sequences.length; i++) {
//         // creating array of positions for given sequence
//         const sequence = sequences[i];
//         const positions = [];
//         let  isIncomplete = false;
//         // this part needs double-checking
//         for (let j = 0; j < sequence.length; j += step) {
//             if (j + (window - 1) < (sequence.length - 1)) {
//                 positions.push(j);
//                 isIncomplete = true;
//             } else if (j + (window - 1) === (sequence.length - 1)) {
//                 positions.push(j);
//                 isIncomplete = false;
//             }
//         }
//         if (isIncomplete) {
//             positions.push((sequence.length) - window);
//         }
//         // creating array of AT% for each window
//         const atPercentArray = [];
//         for (const position of positions) {
//         atPercentArray.push(this.returnATPercent(sequence, position, window));
//         }
//         // creating dataset for chart rendering
//         const singleDataset = [];
//         for (let k = 0; k < positions.length; k++) {
//         singleDataset.push({x: positions[k], y: atPercentArray[k]});
//         }
//         multipleDatasets.push(new PlotDataModel(labels[i], singleDataset));

//     }
//     this.multipleDatasets = multipleDatasets;
// };

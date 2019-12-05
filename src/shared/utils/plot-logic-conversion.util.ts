import { PlotDataModel } from '../models/plot-data.model';
import { SequencesAndLabels } from '../interfaces/sequences-and-labels.interface';

export const returnSequencesAndLabels = (fileContent: string): SequencesAndLabels => {
  const patterns = {
    lineBreaks: /(\r\n)+|\r+|\n+|\t+/i,
    anySpacesOrBreaks: /\r?\n\s|\r\s|\s/g,
    spacesAround: /\r?\n|\r/g
  };
  const mixedData: Array<string> = (fileContent.toLowerCase()).split('>');
  mixedData.shift();
  const onlySequences: Array<string> = mixedData.map(sequence => (
    sequence.slice(sequence.search(patterns.lineBreaks)).replace(patterns.anySpacesOrBreaks, '')
  ));
  const onlyLabels: Array<string> = mixedData.map(label => (
    label.substring(0, label.search(patterns.spacesAround)).trim()
  ));
  const sequencesAndLabels: SequencesAndLabels = {
    sequences: onlySequences,
    labels: onlyLabels
  };
  return sequencesAndLabels;
};
export const returnATPercent = (sequence: string, startPosition: number, window: number): number => {
  // calculating average AT % for given window starting from startPosition
  let countAT = 0;
  for (let i = startPosition; i < (startPosition + window); i++) {
    const letterAOrT = (sequence[i] === 'a') || (sequence[i] === 't');
    if (letterAOrT) { countAT++; }
  }
  return (countAT / window) * 100;
};
export const returnXs = (sequence: string, window: number, step: number): Array<number> => {
  // creating array of positions for given sequence (X axis values)
  const positions = [];
  const lastWindowPosition = sequence.length - window;
  for (let position = 0; position < lastWindowPosition; position += step) {
    positions.push(position);
  }
  const notFullyCovered = positions[positions.length - 1] + window < sequence.length;
  if (notFullyCovered) { positions.push(lastWindowPosition); }
  return positions;
};

export const returnYs = (positions: Array<number>, sequence: string, window: number): Array<number> => {
  // creating array of AT% for each window for given sequence (Y axis values)
  const atPercentArray = positions.map(position => (
    returnATPercent(sequence, position, window)
  ));
  return atPercentArray;
};

export const returnPlotDataset = (labels: Array<string>, sequences: Array<string>, window: number, step: number): PlotDataModel[] => {
  // creating dataset for plot rendering
  const multipleXYDatasets = [];
  for (const [seqIndex, sequence] of sequences.entries()) {
    const xValues = returnXs(sequence, window, step);
    const yValues = returnYs(xValues, sequence, window);
    const singleXYDataset: Array<object> = xValues.map((value, valueIndex) => (
      { x: value, y: yValues[valueIndex] }
    ));
    multipleXYDatasets.push(new PlotDataModel(labels[seqIndex], singleXYDataset));
  }
  return multipleXYDatasets;
};



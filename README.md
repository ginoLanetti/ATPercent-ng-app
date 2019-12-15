# ATPercent

DNA sequences consist of four types of nucleotides (A/T/G/C). Differences in A/T and G/C content along the sequence have influence on its physicochemical properties. This app enables the user to check how A/T content changes along the given DNA sequence and to compare A/T content profiles between multiple sequences. App renders line plots based on data provided in the [FASTA](https://en.wikipedia.org/wiki/FASTA_format) text file or on sequence's ID from [Ensembl](https://www.ensembl.org/index.html) database. To start analyzing, simply choose new plot tab and enter the data drawing upon example diagram.

```
![Diagram](https://github.com/ginoLanetti/ATPercent-ng-app/tree/master/src/assets/svg/DNA.svg)
```

## Getting Started

Please make sure that you have:

- [Node.js](http://www.dropwizard.io/1.0.2/docs/) istalled. Since _npm_ has been used for managing dependencies, this is the recommended go-to package manager.
- [Angular CLI](https://github.com/angular/angular-cli#installation) installed globally:
  `npm install -g @angular/cli`
- all the dependecies needed:
  run `npm install` int the project folder

To run a dev server use `ng serve` command and navigate to `http://localhost:4200/` in your browser - any local changes will be automatically updated.

## Built With

- [Angular 8](https://angular.io/) - The web framework used
- [NGXS](https://www.ngxs.io/) - State management library and pattern

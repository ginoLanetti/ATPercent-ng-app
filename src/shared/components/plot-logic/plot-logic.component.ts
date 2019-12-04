import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlotDataModel } from '../../models/plot-data.model';

@Component({
  selector: 'app-plot-logic',
  templateUrl: './plot-logic.component.html',
})
export class PlotLogicComponent implements OnInit {
  @Input() seqFileContent: FormControl;
  @Input() window: number;
  @Input() step: number;
  labels = [];
  sequences = [];
  multipleDatasets: PlotDataModel[] = [];

  ngOnInit() {
  }

}

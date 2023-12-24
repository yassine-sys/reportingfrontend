import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-missing-files',
  templateUrl: './missing-files.component.html',
  styleUrls: ['./missing-files.component.css'],
})
export class MissingFilesComponent implements OnInit {
  flowData: { [flowName: string]: any[] } = {};
  columns: any[] = [];
  isEmptyResponse: boolean = false;
  messages1!: Message[];

  constructor(private service: ChartService) {}

  ngOnInit(): void {
    this.messages1 = [
      { severity: 'info', summary: 'Info', detail: 'No Missing Files.' },
    ];

    //   this.service.getMissingFiles().subscribe((response: any[]) => {
    //     console.log(response);
    //     // Group data by flow name
    //     response.forEach((item) => {
    //       const flowName = item.flow === 'interco' ? 'switch' : item.flow;
    //       if (!this.flowData[flowName]) {
    //         this.flowData[flowName] = [];
    //       }

    //       // Include the "Flow" value in each item
    //       this.flowData[flowName].push([item.filename, item.name_rep, flowName]);
    //     });

    //     // Check if flowData has any keys
    //     this.isEmptyResponse = Object.keys(this.flowData).length === 0;
    //   });

    //   // Create columns based on the first flow's data
    //   this.columns = ['Filename', 'Name Repository', 'Flow'];
    // }

    this.service.getMissingSeq().subscribe((response: any[]) => {
      console.log(response);
      // Group data by flow name
      response.forEach((item) => {
        const flowName = item.id_flow;
        if (!this.flowData[flowName]) {
          this.flowData[flowName] = [];
        }

        // Include the "Flow" value in each item
        this.flowData[flowName].push([
          item.id_rep,
          flowName,
          item.date_detection,
          item.missedseq,
          item.nextrcvdfile,
          item.rep_name,
          item.node,
        ]);
      });

      // Check if flowData has any keys
      this.isEmptyResponse = Object.keys(this.flowData).length === 0;
    });

    // Create columns based on the first flow's data
    this.columns = [
      'Id Rep',
      'Flow',
      'Date detection',
      'Missed Sequence',
      'Next recived file',
      'Rep Name',
      'Node',
    ];
  }
}

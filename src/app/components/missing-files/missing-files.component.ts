import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { Message } from 'primeng/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-missing-files',
  templateUrl: './missing-files.component.html',
  styleUrls: ['./missing-files.component.css'],
})
export class MissingFilesComponent implements OnInit {
  flowData: { [flowName: string]: any[] } = {};
  columns: any[] = [];
  columns2: any[] = [];
  missngFiles: any[] = [];
  isEmptyResponse: boolean = false;
  messages1!: Message[];

  constructor(private service: ChartService) {}

  ngOnInit(): void {
    //   this.messages1 = [
    //     { severity: 'info', summary: 'Info', detail: 'No Missing Files.' },
    //   ];

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

    // Create columns based on the first flow's data
    this.fetchMissingFilesRecData();
    //this.fetchMissingSeqData();
  }

  fetchMissingSeqData(): void {
    this.service.getMissingSeq().subscribe(
      (response: any[]) => {
        // Group data by flow name
        this.columns = [
          'Id Rep',
          'Flow',
          'Date detection',
          'Missed Sequence',
          'Next recived file',
          'Rep Name',
          'Node',
        ];
        response.forEach((item) => {
          const flowName = item.flowName;
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
      },
      (error) => {
        // Handle error, optionally you can display a message
        console.error('Error fetching missing sequence data:', error);
        // Set isEmptyResponse to true to ensure the other table is displayed
        this.isEmptyResponse = true;
      }
    );
  }

  fetchMissingFilesRecData(): void {
    this.service.getMissingFilesRec().subscribe(
      (response: any[]) => {
        this.missngFiles = response;
        console.log(response);

        this.columns2 = [
          'date ixtools',
          'cdr filename',
          'cdr count ixtools',
          'duration ixtools(min)',
          'date switch',
          'filename',
          'dur swtich(min)',
          'cdr count switch',
        ];
      },
      (error) => {
        // Handle error, optionally you can display a message
        console.error('Error fetching missing files data:', error);
      }
    );
  }

  exportToExcel(columns: any[], data: any[], fileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      columns,
      ...data,
    ]);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(dataBlob, fileName + '.xlsx');
  }
}

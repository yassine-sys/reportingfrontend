import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';
import { CdrMscOcs } from 'src/model/CdrMscOCs';
import { IxInterResp } from 'src/model/IxInterResp';
import { User } from 'src/model/User';

@Component({
  selector: 'app-kpi-chart',
  templateUrl: './kpi-chart.component.html',
  styleUrls: ['./kpi-chart.component.css'],
})
export class KpiChartComponent implements OnInit {
  constructor(
    private chartService: ChartService,
    private service: AuthService
  ) {}
  cdrInfo: CdrMscOcs | undefined;
  user!: User;

  ngOnInit(): void {
    this.service.getUser().subscribe((user) => {
      this.user = user;
    });

    this.chartService.getCdrsMSC().subscribe((data: CdrMscOcs) => {
      this.cdrInfo = data;
    });
  }

  formatNumber(number: number): string {
    const numberString = number.toString();
    const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return formattedNumber;
  }
}

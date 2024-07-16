import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

interface SQLFunction {
  value: string;
  label: string;
  requiresParams: boolean;
  paramCount: number;
}
@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.css',
})
export class OperationComponent implements OnInit {
  public modifiedResult: string = '';
  selectedFunctions: string[] = [];
  functionOptions: SQLFunction[] = [
    { value: 'SUM', label: 'SUM', requiresParams: false, paramCount: 0 },
    { value: 'COUNT', label: 'COUNT', requiresParams: false, paramCount: 0 },
    { value: 'MIN', label: 'MIN', requiresParams: false, paramCount: 0 },
    { value: 'MAX', label: 'MAX', requiresParams: false, paramCount: 0 },
    {
      value: 'TO_CHAR',
      label: 'TO_CHAR',
      requiresParams: true,
      paramCount: 1,
    },
    {
      value: 'TO_NUMBER',
      label: 'TO_NUMBER',
      requiresParams: true,
      paramCount: 1,
    },
    {
      value: 'TO_DATE',
      label: 'TO_DATE',
      requiresParams: true,
      paramCount: 1,
    },
    {
      value: 'COALESCE',
      label: 'COALESCE',
      requiresParams: true,
      paramCount: 2,
    },
    {
      value: 'SUBSTR',
      label: 'SUBSTR',
      requiresParams: true,
      paramCount: 2,
    },
  ];
  selectedFunction: SQLFunction | null = null;
  columnName: string = '';
  paramInputs: string[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}
  ngOnInit(): void {
    this.columnName = this.config.data.columnName;
  }

  addFunction() {
    let func: string = this.selectedFunction?.value || '';
    if (this.columnName) {
      func += '(' + this.columnName;
      if (this.paramInputs.length > 0) {
        func += ', ' + this.paramInputs.join(', ');
      }
      func += ')';
    }
    this.selectedFunctions.push(func);
    // Reset input values
    this.selectedFunction = null;
    this.columnName = '';
    this.paramInputs = [];
  }
  getOutput(): string {
    // Concatenate all selected functions to create the final SQL expression
    return this.selectedFunctions.join(' ');
  }

  getParamIndices(paramCount: number): number[] {
    return Array.from(Array(paramCount), (_, i) => i);
  }

  removeFunction(selectedFunction: SQLFunction) {
    this.selectedFunction = null;
    this.paramInputs = [];
  }

  generateSQLExpression(): string {
    let expression = '';

    if (this.selectedFunction) {
      const functionName = this.selectedFunction.value;

      if (this.selectedFunction.requiresParams) {
        expression += ' ' + functionName + '(' + this.columnName;

        if (this.paramInputs.length > 0) {
          expression += ', ' + this.paramInputs.join(', ');
        } else {
          // If no additional parameters, add default placeholders
          for (let i = 0; i < this.selectedFunction.paramCount - 1; i++) {
            expression += ', ';
            expression += 'Placeholder' + (i + 1);
          }
        }

        expression += ')';
      } else {
        // Handle functions that do not require parameters
        if (this.columnName.trim() !== '') {
          expression += ' ' + functionName + '(' + this.columnName + ')';
        } else {
          expression += ' ' + functionName;
        }
      }
    }

    return expression;
  }

  useAsColumnName() {
    this.columnName = this.generateSQLExpression();
    this.selectedFunction = null;
    this.paramInputs = [];
    console.log(this.columnName);
  }

  onSubmit() {
    const result = this.modifiedResult
      ? this.modifiedResult
      : this.generateSQLExpression();
    this.ref.close(this.generateSQLExpression());
  }
}
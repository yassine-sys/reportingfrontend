import { Component, OnInit } from '@angular/core';
import { FilteringExpressionsTree, FilteringLogic, IExpressionTree } from 'igniteui-angular';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddReportService } from 'src/app/services/add-report.service';

@Component({
  selector: 'app-filtre-operation',
  templateUrl: './filtre-operation.component.html',
  styleUrl: './filtre-operation.component.css'
})
export class FiltreOperationComponent implements OnInit {
  constructor(
    public addService: AddReportService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  public expressionTree: IExpressionTree;
  fields: any[] = [];
  filter: any;
  public modifiedResult: string = '';
  filtreValue: string;

  private mapDataType(id: number): string {
    switch (id) {
      case 1:
        return 'string'; // character varying
      case 2:
        return 'number'; // integer
      case 3:
        return 'number'; // numeric
      case 4:
        return 'number'; // float
      case 5:
        return 'boolean';
      case 6:
        return 'number'; // bigint
      default:
        return 'string'; // default to string if not found
    }
  }

  public ngOnInit(): void {
    this.filtreValue = this.config.data.filtreValue || '';
    const data = this.config.data;
    this.fields = data.flow.liste_champs.map((champ: any) => ({
      field: champ.name_base,
      dataType: this.mapDataType(champ.id_data_type),
    }));

    console.log(this.fields);
  }

  public printExpressionTree(tree: IExpressionTree): string {
    return tree ? JSON.stringify(tree, null, 2) : 'Please add an expression!';
  }

  public generateWhereClause(tree: any): string {
    if (!tree || !tree.filteringOperands || !tree.filteringOperands.length) {
      return '';
    }
  
    const logic = tree.operator && tree.operator === FilteringLogic.Or ? ' OR ' : ' AND ';
    const operatorMap: { [key: string]: string } = {
      contains: 'LIKE',
      doesNotContain: 'NOT LIKE',
      startsWith: 'LIKE',
      endsWith: 'LIKE',
      equals: '=',
      doesNotEqual: '<>',
      greaterThan: '>',
      lessThan: '<',
      greaterThanOrEqualTo: '>=',
      lessThanOrEqualTo: '<=',
      empty: 'IS NULL',
      notEmpty: 'IS NOT NULL',
      null: 'IS NULL',
      notNull: 'IS NOT NULL',
      in: 'IN',
    };
  
    const conditions = tree.filteringOperands.map((operand: any) => {
      if (operand instanceof FilteringExpressionsTree) {
        return '(' + this.generateWhereClause(operand) + ')';
      } else {
        const field = operand.fieldName;
        const operatorName = operand.condition.name;
        const operator = operatorMap[operatorName] || operatorName;
        let value = operand.searchVal;
  
        // Handle special cases for LIKE operator
        if (operator === 'LIKE') {
          if (operatorName === 'startsWith') {
            value = `${value}%`;
          } else if (operatorName === 'endsWith') {
            value = `%${value}`;
          } else {
            value = `%${value}%`;
          }
        }
  
        // Determine the data type of the field
        const dataType = this.fields.find(f => f.field === field)?.dataType;
  
        // Adjust the condition format based on the data type
        if (dataType === 'string') {
          value = `'${value}'`;
        } else if (Array.isArray(value)) {
          value = `(${value.join(', ')})`;
        } else if (dataType === 'boolean') {
          value = value ? 'TRUE' : 'FALSE';
        }
  
        return `${field} ${operator} ${value}`;
      }
    });
  
    return conditions.join(logic);
  }
  


  public onSubmit(tree: any): void {
    const filter = this.modifiedResult ? this.modifiedResult : this.generateWhereClause(tree);
    this.ref.close({ filtreValue: filter });
  }
}
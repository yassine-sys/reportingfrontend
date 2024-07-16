import { Component, OnInit } from '@angular/core';
import {
  FilteringExpressionsTree,
  FilteringLogic,
  IExpressionTree,
  IgxQueryBuilderComponent,
  IgxStringFilteringOperand,
} from 'igniteui-angular';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddReportService } from 'src/app/services/add-report.service';
@Component({
  selector: 'app-querybuilder-c',
  templateUrl: './querybuilder-c.component.html',
  styleUrl: './querybuilder-c.component.css'
})
export class QuerybuilderCComponent {
  constructor(
    public addService: AddReportService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}
  public expressionTree: IExpressionTree;

 fields: any[] = [];
  filter: any;
  public modifiedResult: string = '';

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
    const data = this.config.data;
    this.fields = data.flow.liste_champs.map((champ: any) => ({
      field: champ.name_base,
      dataType: this.mapDataType(champ.id_data_type),
    }));

    //console.log(this.fields);
  }

  public printExpressionTree(tree: IExpressionTree) {
    return tree ? JSON.stringify(tree, null, 2) : 'Please add an expression!';
  }
  public generateWhereClause(tree: any): string {
    if (!tree || !tree.filteringOperands || !tree.filteringOperands.length) {
      return '';
    }

    const logic =
      tree.operator && tree.operator === FilteringLogic.Or ? ' OR ' : ' AND ';

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
        const operator = operatorMap[operatorName] || operatorName; // Get the corresponding symbol or use the name if not found
        const value = operand.searchVal;

        let condition = '';
        if (operator === 'LIKE') {
          // For "starts with" and "ends with", include "%" wildcard character
          if (operatorName === 'startsWith') {
            condition = `${field} ${operator} '${value}%'`;
          } else if (operatorName === 'endsWith') {
            condition = `${field} ${operator} '%${value}'`;
          } else {
            condition = `${field} ${operator} '%${value}%'`;
          }
        } else if (operator === 'IN') {
          // If "IN" operation, value should be an array
          condition = `${field} ${operator} (${value.join(', ')})`;
        } else if (operand.condition.isUnary) {
          // Handle unary operations
          condition = `${field} ${operator}`;
        } else {
          condition = `${field} ${operator} ${value}`;
        }

        return condition;
      }
    });
    //this.filter = conditions.join(logic);
    return conditions.join(logic);
  }

  public onSubmit(tree: any): void {
    const filter = this.modifiedResult
      ? this.modifiedResult
      : this.generateWhereClause(tree);
      this.ref.close({ filtreValue: filter });   }
}

declare class Filter {
    comparisonOperators: string[];
    logicalOperators: string[];
    apply(set: any, settings: any): any[];
    evaluate(filter: any, element: any): boolean;
    evaluateLogicalOperator(operator: any, filter: any, element: any): boolean;
    evaluateComparisonOperator(operator: any, filter: any, element: any): boolean;
    applyFieldsFilter(element: any, fields: any): {};
}
export default Filter;

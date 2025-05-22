export interface Problem {
    description:string;
    id:string;
    isActive:boolean;
    testSets:TestSetModel[];
    title:string;
}

export interface TestSetModel {
    id:string;
    inputs:TestSetValueModel[];
    isPublic:boolean;
    name:string;
    problemId:string;
}

export interface TestSetValueModel {
    id:string;
    dataType: string;
    index: number;
    isArray: boolean;
    valueAsJson: string;
}

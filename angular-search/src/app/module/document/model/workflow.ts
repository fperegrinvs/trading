export interface Workflow {
    id: number;
    name: string;
    description: string;
    global: boolean;
    stages: WorkflowStage[];
}

export interface WorkflowStage {
    id: number;
    order: number;
    note: string;
    users: number[];
}
export interface Workflow {
    id: number;
    name: string;
    description: string;
    global: boolean;
    stages: WorkflowStage[];
    company: string;
}

export interface WorkflowStage {
    id: number;
    order: number;
    note: string;
    users: number[];
}

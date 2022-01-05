import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Workflow, WorkflowStage } from "../model/workflow";

const API_PATH = environment.api_path;

@Injectable({
    providedIn: "root"
})
export class DocumentFlowService {

    constructor(
        private http: HttpClient
    ) {

    }

    getWorkflows(): Observable<Workflow[]> {
        const apiPath = `${API_PATH}/workflow`;
        return this.http.get<Workflow[]>(apiPath);
    }

    deleteWorkflow(id: number): Observable<boolean> {
        const apiPath = `${API_PATH}/workflow/${id}`;
        return this.http.delete<boolean>(apiPath);
    }

    addWorkflow(flow: any): Observable<boolean> {
        const apiPath = `${API_PATH}/workflow`;
        const postData = {
          name: flow.name,
          description: flow.description,
          companyId: +flow.companyId,
          isGlobal: flow.isGlobal
        }
        return this.http.post<boolean>(apiPath, postData);
    }

    removeStage(flowId: number, stageId: number): Observable<boolean> {
        const apiPath = `${API_PATH}/workflow/${flowId}/stage/${stageId}`;
        return this.http.delete<boolean>(apiPath);
    }

    addStage(flowId: number, stageData: any): Observable<boolean> {
        const apiPath = `${API_PATH}/workflow/${flowId}/stage`;
        return this.http.post<boolean>(apiPath, stageData);
    }

    getFlowStages(flowId: number): Observable<WorkflowStage[]> {
        const apiPath = `${API_PATH}/workflow/${flowId}/stage`;
        return this.http.get<WorkflowStage[]>(apiPath);
    }
}

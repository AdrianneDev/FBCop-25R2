import { 
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, 
	gridConfig, GridPreset, PXFieldOptions 
} from "client-controls";

@graphInfo({
	graphType: "ICFBCustomization.Graph.Inquiry.ICFBApproveDocumentInq", 
	primaryView: "Filter"
})
export class ICFB4010 extends PXScreen {
	Filter = createSingle(ApprovedDocumentFilter);
	
	@gridConfig({ 
		preset: GridPreset.Inquiry,
		allowUpdate: false
	})
	Records = createCollection(EPOwned);
}

export class ApprovedDocumentFilter extends PXView {
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class EPOwned extends PXView {
	DocType: PXFieldState;
	RefNoteID: PXFieldState;
	DocumentOwnerID: PXFieldState;
	DocDate: PXFieldState;
	ApproveDate: PXFieldState;
	BAccountID: PXFieldState;
	BAccountID_BAccount_acctName: PXFieldState;
	Descr: PXFieldState;
	Details: PXFieldState;
	CreatedDateTime: PXFieldState;
	CuryID: PXFieldState;
	WorkgroupID: PXFieldState;
	OwnerID: PXFieldState;
	ApprovalID: PXFieldState;
	AssignmentMapID: PXFieldState;
	RuleID: PXFieldState;
	Reason: PXFieldState;
}

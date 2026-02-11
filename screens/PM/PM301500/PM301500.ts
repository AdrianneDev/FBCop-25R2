import { createSingle, PXScreen, graphInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType, createCollection, localizable, PXActionState, RowCssHandlerArgs, NoteMenuDataComponent } from "client-controls";
import { ARInvoice, CostBudget, EPApproval, Project, RevenueBudget, Task, Restriction, ProformaInvoice } from "./views";
import { ComplianceDocuments } from "../common/tabs/tab-compliance/tab-compliance";
import { PMConstants } from "../pm-constants";

@localizable
class Captions {
	static RecentInvoices = "Recent Invoices";
	static DocumentsToApprove = "Documents to Approve";
	static RequestsForInformation = "Requests For Information";
	static DailyFieldReports = "Daily Field Reports";
	static ProjectIssues = "Project Issues";
	static DrawingLogs = "Drawing Logs";
	static PhotoLogs = "Photo Logs";
	static Submittals = "Submittals";
	static Compliance = "Compliance";
	static ProductionOrders = "Production Orders";
	static ProjectInventory = "Project Inventory";
	static CostProjection = "Cost Projections";
	static ChangeOrders = "Change Orders";
	static ChangeRequests = "Change Requests";
	static ProformaInvoices = "Pro Forma Invoices";
	static ProjectTasks = "Project Tasks";
	static BudgetVsActual = "Budget vs. Actual";
	static Subcontracts = "Subcontracts";
	static PurchaseOrders = "Purchase Orders";
}

@graphInfo({graphType: "PX.Objects.PM.ProjectOverview", primaryView: "Project", })
export class PM301500 extends PXScreen {
	ViewTask: PXActionState;
	ViewRevenueBudgetInventory: PXActionState;
	ViewCostBudgetInventory: PXActionState;
	CostProjection: PXActionState;
	newMailActivity: PXActionState;
	newAssistantMailActivity: PXActionState;

	Restrictions = createCollection(Restriction);
	Project = createSingle(Project);
	Approvals = createCollection(EPApproval);
	ArInvoices = createCollection(ARInvoice);
	Tasks = createCollection(Task);
	RevenueBudgetReport = createCollection(RevenueBudget);
	CostBudgetReport = createCollection(CostBudget);
	ComplianceDocuments = createCollection(ComplianceDocuments);
	ProformaInvoices = createCollection(ProformaInvoice);

	captions: any = Captions;
	restrictedScreens: any = {};

	@handleEvent(CustomEventType.RowSelected, { view: "Restrictions" })
	onRestrictionSelected(args: RowSelectedHandlerArgs<PXViewCollection<Restriction>>) {
		args.viewModel.records.forEach(record => {
			this.restrictedScreens[record.Key.value] = record.Disabled.value;
		});
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "ProformaInvoices" })
	getProformaInvoicesRowCss(args: RowCssHandlerArgs<PXViewCollection<ProformaInvoice>>) {
		return  (args?.selector?.row?.RecordNumber.value === 0)
			? PMConstants.BoldRowCssClass
			: undefined;
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "RevenueBudgetReport" })
	getRevenueBudgetRowCss(args: RowCssHandlerArgs<PXViewCollection<RevenueBudget>>) {
		return  (args?.selector?.row?.AccountGroupID.value == null)
			? PMConstants.BoldRowCssClass
			: undefined;
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "CostBudgetReport" })
	getCostBudgetRowCss(args: RowCssHandlerArgs<PXViewCollection<CostBudget>>) {
		return  (args?.selector?.row?.AccountGroupID.value == null)
			? PMConstants.BoldRowCssClass
			: undefined;
	}

	onAfterInitialize(): void {
		const featureSet = this.features["PX.Objects.CS.FeaturesSet"];
		const isEnabled = featureSet?.FileManagement;
		if (!isEnabled) {
			return;
		}

		const topMenu: NoteMenuDataComponent
			= <NoteMenuDataComponent> this.screenService.getDataComponent("NotesMenuData");
		topMenu.filesShow = async () => {
			await this.screenService.executeCommand("ManageFiles");
			return true;
		};
	}
}

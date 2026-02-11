import {
	createCollection,
	createSingle,
	graphInfo,
	handleEvent,
	CurrencyInfo,
	CustomEventType,
	NoteMenuDataComponent,
	PXActionState,
	PXScreen,
	PXViewCollection,
	RowCssHandlerArgs
} from "client-controls";

import {
	Project,
	TaskTotals,
	ProjectProperties,
	ProjectRevenueTotals,
	Billing,
	RetainageSteps,
	Tasks,
	RevenueFilter,
	RevenueBudget,
	CostFilter,
	CostBudget,
	BalanceRecords,
	PurchaseOrders,
	Invoices,
	ChangeOrders,
	ReversingChangeOrders,
	ChangeRequests,
	Unions,
	EmployeeContract,
	ContractRates,
	EquipmentRates,
	Accounts,
	Markups,
	Answers,
	LienWaiverRecipients,
	ProjectContacts,
	ProjectProdOrders,
	ProjectEstimates,
	CreateProductionOrderFilter,
	TemplateSettings,
	TasksForAddition,
	CopyDialog,
	LoadFromTemplateDialog,
	DocumentSettings
} from "./views";

import { PMConstants } from "../pm-constants";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.PM.ProjectEntry",
	primaryView: "Project",
	showUDFIndicator: true
})
export class PM301000 extends PXScreen {
	Save: PXActionState;
	ViewTask: PXActionState;
	ViewRevenueBudgetInventory: PXActionState;
	ViewCostBudgetInventory: PXActionState;
	ViewPurchaseOrder: PXActionState;
	ViewProforma: PXActionState;
	ViewInvoice: PXActionState;
	ViewOrigDocument: PXActionState;
	ViewChangeOrder: PXActionState;
	ViewOrigChangeOrder: PXActionState;
	ViewChangeRequest: PXActionState;
	Relations_EntityDetails: PXActionState;
	ViewProdOrder: PXActionState;
	SetCurrencyRates: PXActionState;
	ViewAddressOnMap: PXActionState;
	AddTasks: PXActionState;
	LoadFromTemplate: PXActionState;
	AddNewProjectTemplate: PXActionState;

	Project = createSingle(Project);
	TaskTotals = createSingle(TaskTotals);
	ProjectProperties = createSingle(ProjectProperties);
	ProjectRevenueTotals = createSingle(ProjectRevenueTotals);
	Billing = createSingle(Billing);
	RetainageSteps = createCollection(RetainageSteps);
	Tasks = createCollection(Tasks);
	RevenueFilter = createSingle(RevenueFilter);
	RevenueBudget = createCollection(RevenueBudget);
	CostFilter = createSingle(CostFilter);
	CostBudget = createCollection(CostBudget);
	BalanceRecords = createCollection(BalanceRecords);
	PurchaseOrders = createCollection(PurchaseOrders);
	Invoices = createCollection(Invoices);
	ChangeOrders = createCollection(ChangeOrders);
	ReversingChangeOrders = createCollection(ReversingChangeOrders);
	ChangeRequests = createCollection(ChangeRequests);
	Unions = createCollection(Unions);
	EmployeeContract = createCollection(EmployeeContract);
	ContractRates = createCollection(ContractRates);
	EquipmentRates = createCollection(EquipmentRates);
	Site_Address = createSingle(Address);
	Billing_Contact = createSingle(Contact);
	Billing_Address = createSingle(Address);
	Accounts = createCollection(Accounts);
	Markups = createCollection(Markups);
	Answers = createCollection(Answers);
	LienWaiverRecipients = createCollection(LienWaiverRecipients);
	ProjectContacts = createCollection(ProjectContacts);
	ProjectProdOrders = createCollection(ProjectProdOrders);
	ProjectEstimates = createCollection(ProjectEstimates);
	CreateProductionOrderFilter = createSingle(CreateProductionOrderFilter);
	TemplateSettings = createSingle(TemplateSettings);
	TasksForAddition = createCollection(TasksForAddition);
	CopyDialog = createSingle(CopyDialog);
	LoadFromTemplateDialog = createSingle(LoadFromTemplateDialog);

	CurrencyInfo = createSingle(CurrencyInfo);
	DocumentSettings = createSingle(DocumentSettings);

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

	@handleEvent(CustomEventType.GetRowCss, { view: "BalanceRecords" })
	getItemsRowCss(args: RowCssHandlerArgs<PXViewCollection<BalanceRecords>>) {
		return args?.selector?.row?.RecordID.value < 0
			? PMConstants.BoldRowCssClass
			: undefined;
	}
}

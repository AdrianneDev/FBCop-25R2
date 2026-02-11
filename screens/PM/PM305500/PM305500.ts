import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	handleEvent,
	CustomEventType,
	RowCssHandlerArgs,
	PXViewCollection
} from "client-controls";

import { PMCostProjectionByDate, PMCostProjectionByDateLine, Contract, CommitmentInfo, PMCostProjectionByDateToSelect } from "./views";
import { PMConstants } from "../pm-constants";

@graphInfo({graphType: "PX.Objects.PM.ProjectCostProjectionByDateEntry", primaryView: "Document", })
export class PM305500 extends PXScreen {
   	@viewInfo({containerName: "Selection"})
	Document = createSingle(PMCostProjectionByDate);
   	@viewInfo({containerName: "Items"})
	Report = createCollection(PMCostProjectionByDateLine);
   	@viewInfo({containerName: "Project"})
	Project = createSingle(Contract);
	@viewInfo({containerName: "Open Commitments"})
	LineCommitments = createCollection(CommitmentInfo);
	@viewInfo({containerName: "Copy Projected Costs to Complete From"})
	CostProjectionsToCopyFrom = createCollection(PMCostProjectionByDateToSelect);

	@handleEvent(CustomEventType.GetRowCss, { view: "Report" })
	getItemsRowCss(args: RowCssHandlerArgs<PXViewCollection<PMCostProjectionByDateLine>>) {
		const lineNbr = args?.selector?.row?.LineNbr.value;
		return  (lineNbr === 0)
			? PMConstants.BoldRowCssClass
			: undefined;
	}
}
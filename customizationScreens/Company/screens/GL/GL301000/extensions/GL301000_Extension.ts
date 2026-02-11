import { PXFieldState, PXFieldOptions, PXView, createCollection, gridConfig, GridPreset, PXActionState, linkCommand } from "client-controls";
import {
	GL301000,
	Batch as Batch_Base,
	GLTran as GLTran_Base
} from "src/screens/GL/GL301000/GL301000";

export interface GL301000_Extension extends GL301000 {}
export class GL301000_Extension {
	// Custom views for tabs
	NotesLog = createCollection(ICFBNotelogs);
	FileDetails = createCollection(ICFBFileDetails);
}

// Extend the Batch view class to add custom fields
export interface Batch extends Batch_Base {}
export class Batch {
	// Reversing Date (after AutoReverseCopy)
	UsrICFBReversingDate: PXFieldState<PXFieldOptions.CommitChanges>;
	
	// Journal Entry Type and Currency fields
	UsrICFBJournalEntryType: PXFieldState;
	UsrICFBPesoDebitTotal: PXFieldState;
	UsrICFBPesoCreditTotal: PXFieldState;
	UsrICFBConvertingToPHP: PXFieldState<PXFieldOptions.CommitChanges>;
	UsrICFBConvertingToUSD: PXFieldState<PXFieldOptions.CommitChanges>;
}

// Extend the GLTran view class to add custom grid columns
export interface GLTran extends GLTran_Base {}
export class GLTran {
	UsrICFBBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	UsrICFBBAccountName: PXFieldState;
	UsrICFBPesoDebitAmt: PXFieldState;
	UsrICFBPesoCreditAmt: PXFieldState;
}

// Notes Log view for tab
@gridConfig({ preset: GridPreset.Details })
export class ICFBNotelogs extends PXView {
	Date_Date: PXFieldState;
	Date_Time: PXFieldState;
	UserID: PXFieldState;
	UserName: PXFieldState;
	Comments: PXFieldState;
}

// File Details view for Hyperlink tab
@gridConfig({ preset: GridPreset.Details })
export class ICFBFileDetails extends PXView {
	GoToUrl: PXActionState;
	
	DocumentUrl: PXFieldState;
	DocumentNotes: PXFieldState;
	
	@linkCommand("GoToUrl")
	AttachmentLink: PXFieldState<PXFieldOptions.CommitChanges>;
	
	FileLocation: PXFieldState;
}

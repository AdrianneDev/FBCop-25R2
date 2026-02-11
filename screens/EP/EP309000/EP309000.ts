import {
	CALLBACK_COMPLETED_EVENT,
	CallbackCompletedEvent,
	createCollection,
	graphInfo,
	PXScreen,
	ServerCommand
} from "client-controls";

import {
	EPClockInTimerData
} from "./views";

@graphInfo({
	graphType: "PX.Objects.EP.ClockInClockOut.EPClockInTimerMaint",
	primaryView: "AvailableTimers",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
	hideScreenToolbar: true
})
export class EP309000 extends PXScreen {
	AvailableTimers = createCollection(EPClockInTimerData);
	ActiveTimers = createCollection(EPClockInTimerData);

	readonly navtimer = "clockin-clockout__navtimer";
	readonly navtimerPause = "clockin-clockout__navtimer-pause";
	readonly navtimerStart = "clockin-clockout__navtimer-start";

	async attached() {
		await super.attached();
		await this.updateTimer();
	}

	async afterConstructor() {
		super.afterConstructor();
		const urlValues = this.getURLValues();
		if (!urlValues) return;
		this.screenService.executeCommand(new ServerCommand("InitCurrentDocument", [urlValues]));
		this.eventAggregator.subscribe(CALLBACK_COMPLETED_EVENT, (event: CallbackCompletedEvent) => {
			switch (event?.command?.toString()) {
				case "ClockIn": {
					this.clockInTimer();
					break;
				}
				case "Start": {
					this.startTimer();
					this.updateTimer();
					break;
				}
				case "Pause": {
					this.pauseTimer();
					this.updateTimer();
					break;
				}
				case "Stop": {
					this.stopTimer();
					this.updateTimer();
					break;
				}
			}
		});
	}

	async onClockInTimer() {
		await this.screenService.executeCommand(new ServerCommand("ClockIn"));
	}

	async onStartTimer() {
		await this.screenService.executeCommand(new ServerCommand("Start"));
	}

	async onPauseTimer() {
		await this.screenService.executeCommand(new ServerCommand("Pause"));
	}

	async onStopTimer() {
		await this.screenService.executeCommand(new ServerCommand("Stop"));
	}

	protected computeHeight(headers, statuses, records) {
		const bottomMargin = 16;
		let height = bottomMargin;
		for (const header of headers) {
			height += header.offsetHeight;
		}
		for (const status of statuses) {
			height += status.offsetHeight;
		}
		for (const record of records) {
			height += record.parentElement.offsetHeight;
		}
		return height;
	}

	protected formatTime(totalSeconds) {
		const oneHourInSeconds = 3600;
		const oneMinuteInSeconds = 60;
		const twoDigitsPadding = 2;
		const paddingChar = "0";
		const timeSeparatorChar = ":";
		const hours = Math.floor(totalSeconds / oneHourInSeconds);
		totalSeconds %= oneHourInSeconds;
		const minutes = Math.floor(totalSeconds / oneMinuteInSeconds);
		const seconds = Math.trunc(totalSeconds % oneMinuteInSeconds);
		return hours.toString().padStart(twoDigitsPadding, paddingChar) + timeSeparatorChar +
			minutes.toString().padStart(twoDigitsPadding, paddingChar) + timeSeparatorChar +
			seconds.toString().padStart(twoDigitsPadding, paddingChar);
	}

	protected getControlValue(record, className): HTMLInputElement {
		const control = record.getElementsByClassName(className);
		if (!control || control.length === 0) return undefined;
		const input = control[0].querySelectorAll("input[type=text]");
		if (!input || input.length === 0) return undefined;
		return input[0] as HTMLInputElement;
	}

	protected getURLValues(): string {
		const document = window.frames.top.document;
		if (document && document.location && document.location.search) {
			return document.location.search.replace("?", "");
		}
		else {
			return undefined;
		}
	}

	protected async clockInTimer() {
		const waitUILoadDelay = 50;
		let records = undefined;
		let waitLoad = true;
		do {
			waitLoad = true;
			const activeTimers = document.getElementById("dfActiveTimers");
			if (activeTimers) {
				records = activeTimers.getElementsByClassName("record-item");
				for (const record of records) {
					if (record.clientHeight) {
						waitLoad = false;
						break;
					}
				}
				if (records && records.length > 0 && !waitLoad) {
					this.updateToolbarValues();
					this.showTimer();
					this.updateTimer();
				}
			}
			await this.releaseUIControl(waitUILoadDelay);
		} while (!records || records.length === 0 || waitLoad);
	}

	protected pauseTimer() {
		this.updateToolbarValues();
		this.showTimer();
	}

	protected startTimer() {
		this.updateToolbarValues();
		this.showTimer();
	}

	protected stopTimer() {
		const timerStopped = "S";
		const toolbarStatus = window.frames.top.document.getElementById("timerStatusControl");
		toolbarStatus.innerText = timerStopped;
		const timerTime = window.frames.top.document.getElementsByClassName("clockin-clockout-time")?.[0].children[0] as HTMLElement;
		timerTime.innerText = "00:00:00";
		timerTime.setAttribute("style", "display: none");
		const timerLabel = window.frames.top.document.getElementsByClassName("clockin-clockout-label")?.[0] as HTMLElement;
		timerLabel.innerText = "";
		const navTimer = window.frames.top.document.getElementsByClassName(this.navtimer)?.[0] as HTMLElement;
		navTimer.classList.remove(this.navtimerPause);
		navTimer.classList.remove(this.navtimerStart);
		const timerPanel = window.frames.top.document.getElementsByClassName("clockin-clockout-time")?.[0] as HTMLElement;
		timerPanel.setAttribute("style", "display: none");
	}

	protected async releaseUIControl(delay) {
		await new Promise(resolve => setTimeout(resolve, delay));
	}

	protected async updateTimer() {
		const waitUILoadDelay = 50;
		const timerUpdateDelay = 100;
		const topFrame = window.frames.top.document;
		let iFrame = undefined;
		let mainFrame = undefined;
		let timersScrollArea = undefined;
		let headers = undefined;
		let recordContainers = undefined;
		let emptyFeeds = undefined;
		const isAvailableTimer = this.AvailableTimers.records.length > 0;
		const isActiveTimers = this.ActiveTimers.records.length > 0;
		const feedItemTotal = this.AvailableTimers.records.length + this.ActiveTimers.records.length + (isAvailableTimer ? 0 : 1) + (isActiveTimers ? 0 : 1);
		document.getElementById("AvailableTimerEmptyFeed").setAttribute("style", `${"display: "} ${isAvailableTimer ? "none" : "inline-block"}`);
		document.getElementById("ActiveTimersEmptyFeed").setAttribute("style", `${"display: "} ${isActiveTimers ? "none" : "inline-block"}`);
		let feedItemCount = 0;
		do {
			if (!iFrame) {
				iFrame = topFrame.getElementById("ClockInClockOutFrame");
			}
			if (!mainFrame) {
				mainFrame = window.frames.top.document.getElementById("main");
			}
			if (!headers) {
				headers = document.getElementsByClassName("qp-data-feed__top-bar");
			}
			recordContainers = document.getElementsByClassName("record-item__container");
			emptyFeeds = document.getElementsByClassName("emptyFeedContainer");
			feedItemCount = document.querySelectorAll("qp-empty-message").length + recordContainers.length;
			if (!timersScrollArea) {
				timersScrollArea = document.getElementById("timersScrollArea");
			}
			if (timersScrollArea) {
				timersScrollArea.scrollTop = timersScrollArea.scrollHeight;
			}
			await this.releaseUIControl(waitUILoadDelay);
		} while (!iFrame || !mainFrame || !headers || !timersScrollArea || feedItemCount !== feedItemTotal);
		timersScrollArea.scrollTop = 0;
		if (iFrame) {
			const iFrameWindow = (<HTMLIFrameElement>iFrame).contentWindow;
			if (iFrameWindow) {
				this.resizeIFrame(iFrame, mainFrame, headers, emptyFeeds, recordContainers);
				setInterval(() => {
					this.updateTimerText();
				}, timerUpdateDelay);
			}
		}
		if (isActiveTimers && recordContainers && recordContainers.length > 0) {
			const lastRecord = recordContainers[recordContainers.length - 1];
			lastRecord.parentElement.style.borderWidth = 0;
		}
	}

	protected resizeIFrame(iFrame, mainFrame, headers, emptyFeeds, recordContainers) {
		let height = this.computeHeight(headers, emptyFeeds, recordContainers);
		const maxHeight = mainFrame.clientHeight;
		const timerCanvas = iFrame.parentElement;
		if (height > maxHeight) {
			height = maxHeight;
		}
		timerCanvas.style.height = `${height}px`;
		iFrame.style.height = `${height}px`;
	}

	protected showTimer() {
		const timerTime = window.frames.top.document.getElementsByClassName("clockin-clockout-time")?.[0].children[0] as HTMLElement;
		const timerLabel = window.frames.top.document.getElementsByClassName("clockin-clockout-label")?.[0] as HTMLElement;
		const timerPanel = window.frames.top.document.getElementsByClassName("clockin-clockout-time")?.[0] as HTMLElement;
		timerTime.setAttribute("style", "display: block");
		timerLabel.setAttribute("style", "display: block");
		timerPanel.setAttribute("style", "display: block");
	}

	protected updateTimerText() {
		const oneSecond = 1000;
		const timerRunning = "R";
		const timerPaused = "P";
		const records = document.getElementsByClassName("record-item");
		for (const recordKey of Object.keys(records)) {
			const record = records[recordKey];
			const startDate = this.getControlValue(record, "startDateUTC");
			const timerDisplay = this.getControlValue(record, "timerDisplay");
			const timeSpent = this.getControlValue(record, "timeSpent");
			const timerStatus = this.getControlValue(record, "timerStatus");
			if (startDate && startDate.value && timerDisplay) {
				if (timerStatus.value === timerRunning) {
					let timeSeconds = Math.abs((new Date().getTime()  - new Date(startDate.value).getTime()) / oneSecond);
					if (timeSpent) {
						timeSeconds += Number(timeSpent.value);
					}
					timerDisplay.value = this.formatTime(timeSeconds);
				}
				else if (timerStatus.value === timerPaused) {
					timerDisplay.value = this.formatTime(Number(timeSpent.value));
				}
			}
		}
	}

	protected updateToolbarValues() {
		const activeTimers = document.getElementById("dfActiveTimers");
		if (activeTimers) {
			const record = activeTimers.getElementsByClassName("record-item");
			if (record && record.length > 0) {
				const startDate = this.getControlValue(record[0], "startDateUTC");
				const timeSpent = this.getControlValue(record[0], "timeSpent");
				const timerStatus = this.getControlValue(record[0], "timerStatus");
				const timerEntityName = (record[0].getElementsByClassName("entityName qp-field")[0].children[0] as HTMLElement);
				const timerDocumentNbr = (record[0].getElementsByClassName("documentNbr qp-field")[0].children[0] as HTMLElement);
				const toolbarStartDate = window.frames.top.document.getElementById("timerStartDateControl");
				const toolbarTimeSpent = window.frames.top.document.getElementById("timerTimeSpentControl");
				const toolbarStatus = window.frames.top.document.getElementById("timerStatusControl");
				const toolbarTimerLabel = window.frames.top.document.getElementById("clockin-clockout-label");
				toolbarStartDate.innerText = startDate.value;
				toolbarTimeSpent.innerText = timeSpent.value;
				toolbarStatus.innerText = timerStatus.value;
				toolbarTimerLabel.innerText = `${timerEntityName.innerText} ${timerDocumentNbr.innerText}`;
			}
		}
	}

	protected async openProjectTask() {
		await this.screenService.executeCommand("OpenProjectTask");
	}
}

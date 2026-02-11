import { BaseApiClient } from "client-controls";
import { getAbsoluteUrl } from "client-controls/utils/url-utils";

const sliceSize = 1024;

export const generatePdfPreview = async (baseApiClient: BaseApiClient, fileType: string, fileId: string, fileVersion: string) => {
	const iframeDiv = document.getElementById("pdfPreviewDiv");
	if (!iframeDiv) {
		throw new Error("Please add div element inside .html file with the id='pdfPreviewDiv' where the iframe element will be placed.");
	}

	iframeDiv.style.display = "none";

	const iframe = document.getElementById("pdfPreviewFrame");
	if (!iframe) {
		throw new Error("Please add iframe element inside .html file with the id='pdfPreviewFrame'.");
	}

	if (!baseApiClient) {
		throw new Error("baseApiClient is not defined.");
	}

	const id = iframe.getAttribute("data-id");
	if (id === `pdf-${fileId}`) {
		iframeDiv.style.display = "block";
		return;
	}

	const blobUrl = iframe.getAttribute("src");
	if (blobUrl) {
		URL.revokeObjectURL(blobUrl);
		iframe.setAttribute("src", "");
		iframe.setAttribute("data-id", "");
	}

	if (!fileType || fileType !== "pdf") {
		return;
	}

	const baseUrl = window.location.origin;
	const fileUrl = getAbsoluteUrl(`/ui/file/${fileId}/${fileVersion}`);

	baseApiClient.get(`${baseUrl}${fileUrl}`).then(async e => {
		if (e) {
			const blob = await streamToBlob(e.body, "application/pdf");
			const blobUrl = URL.createObjectURL(blob);
			iframe.setAttribute("src", blobUrl);
			iframe.setAttribute("data-id", `pdf-${fileId}`);
			iframeDiv.style.display = "block";
		}
	});
};

const streamToBlob = async (stream: ReadableStream, contentType = "") => {
	const byteCharacters = atob(await streamToBase64(stream));
	return toBlob(byteCharacters, contentType);
};

const toBlob = async (byteCharacters: string, contentType = "") => {
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	return new Blob(byteArrays, { type: contentType });
};

const streamToBase64 = async (stream: ReadableStream): Promise<string> => {
	const reader = stream.getReader();
	let result = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		}
		const chunks = [];
		for (let i = 0; i < value.length; i += sliceSize) {
			const chunk = value.subarray(i, i + sliceSize);
			chunks.push(String.fromCharCode(...chunk));
		}
		result += chunks.join("");
	}

	return btoa(result);
};

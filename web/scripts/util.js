
export function getURL() {
	return window.location.href.slice(0, window.location.href.length - window.location.pathname.length);
}

export function getResource(resource, callback) {
	console.log("Getting resource " + resource);
	const xhr = new XMLHttpRequest();
	xhr.addEventListener("readystatechange", () => {
		if (xhr.readyState == 4) {
			callback(xhr.response);
		} else {
			console.log("ReadyState " + xhr.readyState);
		}
	})
	xhr.open("GET", getURL() + resource);
	xhr.responseType="json"
	xhr.send();
}

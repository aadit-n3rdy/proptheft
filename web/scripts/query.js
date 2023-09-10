import {getURL, getResource} from "./util.js"

window.addEventListener("load", () => {
	document.getElementById("button-fetch").addEventListener("click", triggerUpdateTable);
})

export function triggerUpdateTable() {
	console.log("Triggered update table");
	getResource("/api/query", updateTable);
}

function updateTable(data) {

	if (data == null) {
		console.log("Invalid data");
		return;
	}

	console.log("Updating table");

	const table = document.getElementById("content-table");
	console.log(table);

	// Clear table first
	table.innerHTML = `<tr>
		<th>ID</th>
		<th>Num1</th>
		<th>Name</th>
	</tr>`;

	for (const row of data) {
		const n = document.createElement("tr");
		n.classList.add("content-table-data")
		n.innerHTML = `
				<td>${row.id}</td>
				<td>${row.num1}</td>
				<td>${row.name}</td>
			`;
		table.appendChild(n);
		console.log(n);
	}
}

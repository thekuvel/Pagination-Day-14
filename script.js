let url = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";
let cardContainer = document.querySelector("#cardContainer");
let pageNumberContainer = document.querySelector("#pageNumber");
let tableBody = document.querySelector("#table-body");
let currentPage = 1;
let dataArray =[];
let totalPage = 0;

async function getData(){
	let res = await fetch(url);
	data = await res.json();
	return data;
}

function renderPage(dataArray, startIndex,endIndex){
	cardContainer.innerHTML = '';
	dataArray.slice(startIndex,endIndex).map((country)=>{
	let cardElement = document.createElement("div");
	cardElement.setAttribute("class","card")
	cardElement.innerHTML = `
			<p>Id:${country.id}</p>
			<p>Name:${country.name}</p>
			<p>Email:${country.email}</p>
	`
	cardContainer.appendChild(cardElement);
	})
}

function nextPage(){
	console.log(currentPage)
	currentPage++;
	console.log("after ++",currentPage)
	if(currentPage<=totalPage){
		startIndex = (currentPage-1)*5;
		endIndex = startIndex+5;
		renderPage(dataArray,startIndex,endIndex);
		renderTableBody(dataArray,startIndex,endIndex);
		renderPageNumbers(currentPage)
	}else{
		currentPage=totalPage;
	}
	
}

function previousPage(){
	currentPage--;
	if(currentPage>0){	
		startIndex = (currentPage-1)*5;
		endIndex = startIndex+5;
		renderPage(dataArray,startIndex,endIndex)
		renderTableBody(dataArray,startIndex,endIndex);
		renderPageNumbers(currentPage)
	}
	else{
		currentPage = 1;
	}
}

function firstPage(){
	currentPage = 1;
	startIndex = (currentPage-1)*5;
	endIndex = startIndex+5;
	renderPage(dataArray,startIndex,endIndex);
	renderTableBody(dataArray,startIndex,endIndex);
	renderPageNumbers(currentPage)
}

function lastPage(){
	currentPage = totalPage;
	startIndex = (totalPage-1)*5;
	endIndex = startIndex+5;
	renderPage(dataArray,startIndex,endIndex);
	renderTableBody(dataArray,startIndex,endIndex);
	renderPageNumbers(currentPage)
}

// dynamic page numbers
function renderPageNumbers(currentPage){
	let [page1,page2,page3]=[currentPage,currentPage+1,currentPage+2];
	pageNumberContainer.innerHTML = `
		<button class="cellSpace" onclick="cell(${page1})">${currentPage}</button>
		<button class="cellSpace" onclick="cell(${page2})">${currentPage+1}</button>
		<button class="cellSpace" onclick="cell(${page3})">${currentPage+2}</button>
	`
}

function cell(pageNumber){
	currentPage = pageNumber;
	startIndex = (currentPage-1)*5;
	endIndex = startIndex+5;
	renderPage(dataArray,startIndex,endIndex);
	renderTableBody(dataArray,startIndex,endIndex);
	console.log(currentPage);
}

function renderTableBody(dataArray,startIndex,endIndex){
	tableBody.innerHTML = ""
	dataArray.slice(startIndex,endIndex).map((person)=>{
		let row = tableBody.insertRow();
		let c1 = row.insertCell(0);
		let c2 = row.insertCell(1);
		let c3 = row.insertCell(2);
		c1.innerText = person.id;
		c2.innerText = person.name;
		c3.innerText = person.email;
	})
	
}

async function pageNation(){
	dataArray = await getData();
	console.log(dataArray);
	renderPage(dataArray,0,5);
	totalPage = (dataArray.length)/5;
	console.log(totalPage);
	renderPageNumbers(currentPage);
	renderTableBody(dataArray,0,5)
}

pageNation();
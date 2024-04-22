let adhyay = document.getElementById('adhyay');
let shlok = document.getElementById('shlok');



let currentPage = 1;

function toggleClass(e, toggleClassName) {
  if(e.className.includes(toggleClassName)) {
    e.className = e.className.replace(' ' + toggleClassName, '');
  } else {
    e.className += ' ' + toggleClassName;
  }
}

function movePage(e, page) {
  if (page == currentPage) {
    currentPage+=2;
    toggleClass(e, "left-side");
    toggleClass(e.nextElementSibling, "left-side");
    
  }
  else if (page = currentPage - 1) {
    currentPage-=2;
    toggleClass(e, "left-side");
    toggleClass(e.previousElementSibling, "left-side");
  }
  
}

// chakra

let preprocessing = sukta => {
	sukta = sukta.replace(/↵/g," ");
	sukta = sukta.replace(/[१२३४५६७८९०]/g,"");
	sukta = sukta.replace(/[1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM?,.()*&^%$#@!<>:+_]/g,"");
	sukta = sukta.replace(/\"/g,"").replace(/\'/g,"").replace(/;/g," ").replace(/-/g," ").replace(/॥/g,"||").replace(/।/g,"|");
			
	let shloka = sukta.split("||").filter(x=>x!="");
	let pankti = shloka.map(x=>x.split("|")).filter(x=>x!="");
	let shabda = pankti.map(x=>x.map(x=>x.split(" ").filter(x=>x!="")));
	let nada = shabda.map(x=>x.map(x=>x.map(x=>akshara("sanskrit")(x))));
	return nada;			
}

let arr = preprocessing('वसुदेव सुतं देवं कंस चाणूर मर्दनम ।देवकी परमानन्दं कृष्णं वन्दे जगात्गुरुम ॥ २-४८॥ २-२३॥').join('');

arr = arr.split(",");
arr = arr.reverse();

let wheel = new Array(5).fill(1).map((x,i)=>{
  x = document.createElement('div');
  x.className = 'mantra';
  document.getElementById('chakra').appendChild(x);
});

for(let j = 0; j< 5 ;j++){
let cells = new Array(arr.length).fill(1).map((x,i)=>{
  x = document.createElement('div');
  x.className = 'part';
  x.innerText = arr[i];
  document.getElementsByClassName('mantra')[j].appendChild(x);
 });
}

// book

// let chepter = document.getElementById('chepter');
// let chshlok = document.getElementById('ch-shlok');

// // book start

// let currentPage = 1;

// function toggleClass(e, toggleClassName) {
//   if (e.className.includes(toggleClassName)) {
//     e.className = e.className.replace(' ' + toggleClassName, '');
//   } else {
//     e.className += ' ' + toggleClassName;
//   }
// }

// function movePage(e, page) {
//   if (page == currentPage) {
//     currentPage += 2;
//     toggleClass(e, "left-side");
//     toggleClass(e.nextElementSibling, "left-side");

//   }
//   else if (page = currentPage - 1) {
//     currentPage -= 2;
//     toggleClass(e, "left-side");
//     toggleClass(e.previousElementSibling, "left-side");
//   }
// }



const getshlok = (chapterNumber, shlokNumber) => {
  fetch(`https://bhagavadgitaapi.in/slok/${chapterNumber}/${shlokNumber}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      shlok.innerHTML = `<div class="shlok">${data.slok}</div>
                      <div class="tej mt-4">${data.tej.author}</div>
                          <div class="tej mt-1">${data.tej.ht}</div>
                          <div class="tej mt-4">${data.siva.author}</div>
                          <div class="tej mt-1">${data.siva.et}</div> 
                           <div class="tej mt-1">${data.siva.ec}</div>`;
    })
    .catch((err) => console.log(err));
}

//book end4
const view = async () => {
  await fetch('https://bhagavadgitaapi.in/chapters', {
    method: "GET",
    mode: 'cors',
    headers: {}
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((ele) => {
        adhyay.innerHTML += `<div class="d-flex justify-content-between mt-4">
        <div class="des col-6" >
            <div class="ch-num">अध्याय : ${ele.chapter_number}</div>
            <div class="adhyayer-name">नाम :${ele.name}</div>
            <div class="ch-meaning">अध्यायार्थः : ${ele.meaning.hi}</div>
            <div class="ch-verse">श्लोक संख्या : ${ele.verses_count}</div>
        </div>
        <div class="col-4">
        <lable class="ms-auto">Enter shlok number</lable>
        <input type="number" class="shlok-number mybtn w-50px bg-transparent text-white" oninput="getshlok(${ele.chapter_number}, this.value)"></div></div>`

      });
    })
    .catch((err) => {
      console.log("err chet", err);
    });
}

view();
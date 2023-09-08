const lis = JSON.parse(data).data;
let progress = document.getElementById("persent");
let links = document.querySelector(".links");
let linksContainer = document.getElementById("links-container"),
  massage = document.querySelector(".massage");
let scan = document.querySelector("#btn-2"),
  testAgain = document.getElementById("btn-0");
let view = document.querySelector("#btn-1");
let loader = document.getElementById("inner_circle");
var sty = getComputedStyle(loader).getPropertyValue("animation");
// let u = new URL(window.location);
// console.log(u);
// console.log(sty);
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
function fetch_api() {
  scan.style.display = "none";
  loader.style.animation = "wheel 0.5s infinite";

  for (var i = 0; i <= 100; i++) {
    var index = Math.floor(Math.random() * (lis.length - 1));

    var link = lis[index]["link"];
    var name =lis[index]["name"];
    try{

    
    fetch("https://bdix_tester-1-n2631061.deta.app/check", {
      method: "POST",

      headers: myHeaders,

      body: JSON.stringify({
        name:name,
        url: link,
      }),
      redirect: "follow",
    })
      .then((res) => {
        
        // if (!res.ok) {
        //   throw new Error("Network error");
        // }
        return res.json();
      })
      .then((data) => {
        
        if (progress.value <= 99) {
          progress.value += 1;
        } else {
          progress.style.display = "none";
          loader.style.animation = "none";
          
        }
        console.log(data)
        
        if(data.message===200){
          linksContainer.innerHTML += `<a href="${data.item.url}" target='_blank'>${data.item.name}</a>`;

        }else{
          // linksContainer.innerHTML+=`<a class="error" href="${data}" target='_blank'>${data} not working</a>`
        }
      })}
      catch(e)
      {
        linksContainer.innerText += `Network Error!`;
        massage.innerHTML = `Network Error! ${e}`;
        loader.style.animation = "none";
        
      };
  }
}
testAgain.addEventListener("click", () => {
  window.location.reload();
});

scan.addEventListener("click", fetch_api);
view.addEventListener("click", () => {
  console.log(linksContainer.innerText.length)
  if (linksContainer.innerHTML.length > 11){
    view.style.display="none"
    testAgain.style.display = "block";
    links.classList.toggle("active");
    

  }else{

    scan.classList.toggle("active");
    progress.classList.toggle("active");
  }
});

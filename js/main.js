const lis = JSON.parse(data).data;
let progress = document.getElementById("persent");
let links = document.querySelector(".links");
let linksContainer = document.getElementById("links-container"),
  massage = document.querySelector(".massage");
let scan = document.querySelector("#btn-2"),
  testAgain = document.getElementById("btn-0"),
  current = document.getElementById("current");
let view = document.querySelector("#btn-1");
let loader = document.getElementById("inner_circle");
var sty = getComputedStyle(loader).getPropertyValue("animation");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
async function fetch_api() {
  scan.style.display = "none";
  loader.style.animation = "wheel 0.5s infinite";

  for (var i = 0; i <= 100; i++) {
    var index = Math.floor(Math.random() * (lis.length - 1));

    var link = lis[index]["link"];
    var name = lis[index]["name"];

    let data = await fetch("https://bdix_tester-1-n2631061.deta.app/check", {
      method: "POST",

      headers: myHeaders,

      body: JSON.stringify({
        name: name,
        url: link,
      }),
      redirect: "follow",
    });
    current.innerText = `currentURL:${link}`;

    let res = await data.json();
    console.log(res);

    if (progress.value <= 99) {
      progress.value += 1;
    } else {
      progress.style.display = "none";
      loader.style.animation = "none";
    }

    if (res.message === 200) {
      linksContainer.innerHTML += `<a href="${res.item.url}" target='_blank'>${res.item.name}</a>`;
    }
  }
}

testAgain.addEventListener("click", () => {
  window.location.reload();
});

scan.addEventListener("click", fetch_api);
view.addEventListener("click", () => {
  // console.log(linksContainer.innerText.length)
  if (linksContainer.innerHTML.length > 11) {
    view.style.display = "none";
    testAgain.style.display = "block";
    links.classList.toggle("active");
  } else {
    scan.classList.toggle("active");
    progress.classList.toggle("active");
  }
});

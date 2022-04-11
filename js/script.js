const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Elon Musk",
  "Jeff Bezos",
  "Bernard Arnault",
  "Bill Gates",
  "Warren Buffett",
  "Larry Page",
  "Sergey Brin",
  "Steve Ballmer",
  "Larry Ellison",
  "Gautam Adani",
];

// Store listitems

const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM

function createList() {
  [...richestPeople]
    .map((element) => ({
      value: element,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <section class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </section>
      `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEvent();
}

/* add events */

function addEvent() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((elem) => {
    elem.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((elem) => {
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("drop", drop);
  });
}

/* events functions */

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragOver(e) {
  e.preventDefault();
}
function dragLeave() {
  this.classList.remove("over");
}
function dragEnter() {
  this.classList.add("over");
}
function drop() {
  const dragEndIndex = this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");

  function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector(".draggable");
    const itemTwo = listItems[toIndex].querySelector(".draggable");

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
  }
}

// check items order

check.addEventListener("click", checkOrder);

function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      item.classList.remove("right");
      item.classList.add("wrong");
    } else {
      item.classList.remove("wrong");
      item.classList.add("right");
    }
  });
}

"use strict";

let copyTab = [];
let points = 0;
const chosenItems = document.getElementById("chosenItems");
let res = document.getElementById("result");
let confirm = document.getElementById("confirm");
let ingredient = document.querySelectorAll(".ingredient");

const order = {
  ingredients: ["toffee", "jelly", "marshmallows"],
  actualOrder: [],
  chosen: [],
  allOrders: [],

  // Arrays with particular orders
  copyTab1: [],
  copyTab2: [],
  copyTab3: [],
  copyTab4: [],
  copyTab5: [],

  // Display orders
  displayBox: function () {
    for (let x = 1, y = 1000; x < 6; x++, y += 1500) {
      let usedOrder = this.allOrders[x - 1];
      let currentOrder = document.getElementById(`order${x}`);

      let displayIng = function () {
        for (let i of usedOrder) {
          currentOrder.innerHTML += `${i}<br>`;
          copyTab.push(i);
          if (copyTab.length === 4) {
            order[`copyTab${x}`] = copyTab;
            copyTab = [];
          }
        }
      };

      setTimeout(() => {
        displayIng();
        currentOrder.style.display = "block";
        let clock = document.getElementById(`clock${x}`);
        clock.style.display = "block";
        this.timeCount(clock, 10, currentOrder);
      }, y);
    }
  },
  yesAnswer: function () {
    document.getElementById(
      "points"
    ).textContent = `Your score: ${points} points`;
    if (points >= 40) {
      alert("You have won. Reload the page to play again");
      document.querySelector(".bottom-part").style.pointerEvents = "none";
    }
  },

  // Source: https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript [13.11.2020]
  compare: function (array1, array2) {
    if (array1.length != array2.length) return false;
    for (var i = 0, l = array1.length; i < l; i++) {
      // Check if we have nested arrays
      if (array1[i] instanceof Array && array2[i] instanceof Array) {
        // recurse into the nested arrays
        if (!array1[i].equals(array2[i])) {
          return false;
        }
      } else if (array1[i] != array2[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;
  },

  timeCount: function (clock, sek, z) {
    clock.textContent = `${sek}`;
    if (sek >= 1) {
      setTimeout(function () {
        order.timeCount(clock, --sek, z);
      }, 1e3);
    } else {
      z.style.backgroundColor = "rgba(255, 163, 121,0.5)";
      z.innerHTML = "<p class='you-failed'>Time <br><span>is up</span><p>";
      if (this.checkFailed() === true) {
        document.querySelector(".bottom-part").style.pointerEvents = "none";
        if(points < 40){
           alert("You have failed. Reload the page to play again");
           }
      }
    }
  },

  checkFailed: () => {
    for (let x = 1; x < 6; x++) {
      if (document.querySelector(".time") === null) {
        return true;
      }
    }
  },
};

function mouseoverAct() {
  document.querySelector("#toffee").style.cursor = "pointer";
  document.querySelector("#jelly").style.cursor = "pointer";
  document.querySelector("#marshmallows").style.cursor = "pointer";
  confirm.addEventListener(
    "mouseover",
    () => (confirm.style.cursor = "pointer")
  );
}

// List items in an array and display them
function listItems() {
  for (let z = 1; z < 6; z++) {
    let x, randomIng;
    for (x = 1; x < 5; x++) {
      randomIng = Math.trunc(Math.random() * 3);
      order.actualOrder.push(order.ingredients[randomIng]);
    }
    order.allOrders.push(order.actualOrder);
    order.actualOrder = [];
  }
  order.displayBox();
}

// Add clicked ingredient to display list
function addToArray() {
  for (let item of order.ingredients) {
    document.getElementById(item).addEventListener("click", () => {
      order.chosen.push(item);
      chosenItems.innerHTML += `${item}<br>`;
    });
  }
  order.chosen = [];
}

// After clicking confirmation button
function confirmOrder() {
  document.getElementById("confirm").addEventListener("click", () => {
    let num = [];

    for (let x = 1; x < 6; x++) {
      let currentOrder = document.getElementById(`order${x}`);
      if (
        currentOrder.innerHTML ===
        '<p class="you-failed">Time <br><span>is up</span></p><p></p>'
      ) {
        order[`copyTab${x}`] = [];
      }
      let repo = order.compare(
        order.chosen.sort(),
        order[`copyTab${x}`].sort()
      );
      if (repo === true) {
        num.push(x);
        if (num.length === 1) {
          currentOrder.style.display = "none";
          order[`copyTab${x}`] = [];
          points += 10;
          order.yesAnswer();
        } else if (num.length > 1) {
          document.getElementById(`order${num[0]}`).style.display = "none";
          order[`copyTab${num[0]}`] = [];
          order.yesAnswer();
        }
      }
    }

    chosenItems.innerHTML = "";
    num = [];
    order.chosen = [];
  });
}
function start() {
  addToArray();
  listItems();
  confirmOrder();
}
start();

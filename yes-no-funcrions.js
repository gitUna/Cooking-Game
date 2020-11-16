yesRandomAnswers: function () {
    let a1 = "You are right";
    let a2 = "That was easy one";
    let a3 = "Nice, that's what we were waiting for";
    let a4 = "Great job!";
    let a5 = "You will definitely keep your job!";
    let x = Math.trunc(Math.random() * 5 + 1);
    res.textContent = eval(`a${x}`);
    res.style.color = "#039590";
    res.classList.remove("resultAnimation");
  },
  noRandomAnswers: function () {
    let a1 = "You are terrible cook";
    let a2 = "No, no, no!";
    let a3 = "Is this a joke?";
    let a4 = "What are you doing? Think!";
    let a5 = "I start to worry";
    let x = Math.trunc(Math.random() * 5 + 1);
    res.textContent = eval(`a${x}`);
    res.style.color = "#ff3b38";
    res.classList.remove("resultAnimation");
  },
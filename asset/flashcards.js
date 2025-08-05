var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});

document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  contentArray = [];
});

document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "block";
});

document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "none";
});

flashcardMaker = (text, delThisIndex) => {
  const flashcard = document.createElement("div");
  const question = document.createElement('div');
  const answer = document.createElement('div');
  const del = document.createElement('i');

  flashcard.className = 'flashcard';
  question.className = 'question';
  answer.className = 'answer';

  question.textContent = text.my_question;
  answer.textContent = text.my_answer;
  answer.style.display = 'none';

  del.className = "fas fa-minus";
  del.addEventListener("click", (e) => {
    e.stopPropagation();
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    window.location.reload();
  });

  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(del);

  flashcard.addEventListener("click", (e) => {
    // Chỉ toggle khi không bấm nút xóa
    if (e.target === del) return;
    answer.style.display = answer.style.display === "none" ? "block" : "none";
  });

  document.querySelector("#flashcards").appendChild(flashcard);
}

contentArray.forEach(flashcardMaker);

addFlashcard = () => {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");

  let flashcard_info = {
    'my_question' : question.value,
    'my_answer'  : answer.value
  }

  contentArray.push(flashcard_info);
  localStorage.setItem('items', JSON.stringify(contentArray));
  flashcardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
  question.value = "";
  answer.value = "";
}
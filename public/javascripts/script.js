// Cached Element References
// Event Listeners
// Using fetch to make HTTP request from the browser to the OMDB web server

let currentCardIndex = 0;

function showCurrentCard() {
    if (document.querySelectorAll(".card-item").length) {
        document.querySelectorAll(".card-item").forEach(element => {
            if (element.id === `card${currentCardIndex}`) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        });
    } else {
        if (document.querySelector(".card")) {
            document.querySelector(".card").innerText = "Add some cards to the deck!";
        }
    }
}

function setNextCard() {
    if (currentCardIndex < document.querySelectorAll(".card-item").length - 1) {
        currentCardIndex ++;
        // todo: reset the button
        document.querySelectorAll(".filp").forEach(element => {
            element.classList.add("hidden");
        })
        document.querySelectorAll(".show-answer").forEach(element => {
            element.classList.remove("hidden");
        })
        showCurrentCard();
    } else {
        document.querySelector(".card").innerText = "Congrats! You reviewed all the cards!";
    }
}

function showAnswer() {
    document.querySelectorAll(".hidden").forEach(element => {
        element.classList.remove("hidden");
    })
    document.querySelectorAll(".show-answer").forEach(element => {
        element.classList.add("hidden");
    })
}

showCurrentCard();

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

async function setNextCard() {
    if (currentCardIndex < document.querySelectorAll(".card-item").length - 1) {
        currentCardIndex++;
        showCurrentCard();
    } else {
        document.querySelector(".card").innerText = "Congrats! You reviewed all the cards!";
    }
}

async function setNextCardWithUser() {
    if (currentCardIndex < document.querySelectorAll(".card-item").length - 1) {
        await updateReviewLog();
        currentCardIndex++;
        showCurrentCard();
    } else {
        await updateReviewLog();
        document.querySelector(".card").innerText = "Congrats! You reviewed all the cards!";
    }
}

async function updateReviewLog() {
    const today = new Date();
    const dueDate = new Date(today.setSeconds(today.getSeconds() + 30)).toISOString();
    const userId = document.querySelector("input[name='userId']").value;
    const cardId = document.querySelector(`input[name='card${currentCardIndex}Id']`).value;

    const userReviewLogId = await fetch("/userReviewLogs", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            userId,
            cardId
        })
    }).then(res => res.json())
    .then(data => data._id);

    const response = await fetch(`/userReviewLogs/${userReviewLogId}/edit`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            userReviewLogId: userReviewLogId,
            reviewTime: today,
            dueTime: dueDate
        })
    });

    if (response.ok) {
        console.log('Review log updated successfully.');
    } else {
        console.error('Failed to update review log.');
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

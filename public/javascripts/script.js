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

        document.querySelectorAll(".filp").forEach(element => {
            element.classList.add("hidden");
        })
        document.querySelectorAll(".show-answer").forEach(element => {
            element.classList.remove("hidden");
        })

        const today = new Date()
        const dueDate = new Date(today.setSeconds(today.getSeconds() + 30)).toISOString();

        const userId = document.querySelector("input[name='userId']").value;
        const cardId = document.querySelector(`input[name='card${currentCardIndex - 1}Id']`).value;
    
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
                reviewTime: today,  // should be push into reviewDate array
                dueTime: dueDate // {dueDate: "Sat Apr 13 2024 10:53:47 GMT-0500 (Central Daylight Time)"}
            })
        });

        // const data = await response.json()
        if (response.ok) {
            console.log('Review log updated successfully.');
        } else {
            console.error('Failed to update review log.');
        }

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

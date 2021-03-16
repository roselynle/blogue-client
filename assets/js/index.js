// Function for tracking the character count
const subjectCount = document.querySelector("#subjectCount");
const inputCount = document.querySelector("#inputCount");
let postSubject = document.getElementById("subject");
let postInput = document.getElementById("journalInput");

function countCharacters() {
    let subjectMaxLength = 100;
    let inputMaxLength = 2000;
    let subjectLength = postSubject.value.length;
    let inputLength = postInput.value.length;

    if (subjectLength <= subjectMaxLength) {
        subjectCount.textContent = `${subjectLength}/ ${subjectMaxLength}`;
    }

    if (inputLength <= inputMaxLength) {
        inputCount.textContent = `${inputLength}/ ${inputMaxLength}`;
    }
}
postSubject.addEventListener("keyup", countCharacters);
postInput.addEventListener("keyup", countCharacters);

// Submitting a new form
const form = document.querySelector("#new-post-form");
form.addEventListener("submit", submitPost);

function submitPost(e) {
    e.preventDefault();

    const postData = {
        subject: e.target.subject.value,
        journalInput: e.target.journalInput.value,
        gif: e.target.giphy.value,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch("http://localhost:3000/posts", options) //check url??
        .then((r) => r.json())
        .then(appendPost)
        .catch(console.warn);
}

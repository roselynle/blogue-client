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
    const currentDate = new Date();
    const dateTimeStamp = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1 // because january starts at 0
    }/${currentDate.getFullYear()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;

    const postData = {
        subject: e.target.subject.value,
        journalInput: e.target.journalInput.value,
        gif: e.target.giphy.value,
        date: dateTimeStamp,
    };

    console.log(postData);

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

// Append new post to the page
function appendPosts(posts) {
    posts.forEach((post) => appendPost(post));
}

let parent = document.getElementById("postsContainer");
function appendPost(data) {
    const postsDiv = document.createElement("div");

    // headers for the subject names
    const header = document.createElement("h3");
    header.textContent = data.subject;

    // paragraphs for the journal content
    const contents = document.createElement("p");
    contents.textContent = data.journalInput;

    // imgs for the gif
    const newImg = document.createElement("img");
    newImg.src = postData.gif;

    // div for emoji icons (from font awesome perhaps? like, dislike and laugh reaction)
    const reactionDiv = document.createElement("div");

    // div for comments
    const commentDiv = document.createElement("div");

    // Appending each element to the new postsDiv, and then append this new div to existing postsContainer
    postsDiv.appendChild(header);
    postsDiv.appendChild(contents);
    postsDiv.appendChild(newImg);
    postsDiv.appendChild(reactionDiv);
    postsDiv.appendChild(commentDiv);
    postsContainer.append(postsDiv);
}

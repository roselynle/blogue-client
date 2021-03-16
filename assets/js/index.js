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

    fetch("https://bloguefp.herokuapp.com/", options) //check url?? also do we need to put this in a function to export?
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

    // paragraphs for the date
    const date = document.createElement("p");
    date.textContent = data.date;

    // imgs for the gif
    const newImg = document.createElement("img");
    newImg.src = postData.gif;
    newImg.style.display = "block";
    newImg.style.margin = "0 auto";
    newImg.alt = "";

    // div for emoji icons
    const reactionDiv = document.createElement("div");
    const commentIcon = `<i class="fas fa-comment fa-3x"></i>`;
    const likeIcon = `<i class="fas fa-thumbs up fa-3x"></i>`;
    const dislikeIcon = `<i class="fas fa-thumbs down fa-3x"></i>`;
    const laughIcon = `<i class="far fa-laugh-squint fa-3x"></i>`;
    reactionDiv.className = `icons`;
    reactionDiv.innerHTML = commentIcon + likeIcon + dislikeIcon + laughIcon;

    // div for comments
    const commentDiv = document.createElement("div");

    // appending each element to the new postsDiv, and then append this new div to existing postsContainer
    postsDiv.appendChild(header);
    postsDiv.appendChild(contents);
    postsDiv.appendChild(newImg);
    postsDiv.appendChild(reactionDiv);
    postsDiv.appendChild(commentDiv);
    parent.append(postsDiv);
}

// Add a GIF
const gifButton = document.getElementById("gif-button");
gifButton.addEventListener("click", sendApiRequest);

function sendApiRequest(e) {
    e.preventDefault();
    let apikey = "DV4iN2mItn9xsI2WSKzWWKpTaNpw9H9n";
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=3&q=`;
    let str = document.getElementById("giphy").value.trim(); // giphy is the id for the searchbox
    url = url.concat(str);
    console.log(url);

    fetch(url)
        .then((r) => r.json())
        .then((content) => {
            let gifimg = document.createElement("img");
            gifimg.src =
                content.data[
                    Math.floor(content.data.length * Math.random())
                ].images.downsized.url; // choose a random gif from data array, if this doesn't work use the first one content.data[0].images.downsized.url
            gifimg.classList.add("imgFormat");
            let gifContainer = document.getElementById("gifContainer");
            gifContainer.append(gifimg);
            gifContainer.insertAdjacentElement("afterbegin", gifimg); // gif image will show up in teh make a post section
        })
        .then(appendPost) // check if correct - essentially we need to append this gif to a new post
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {
    submitPost,
    appendPost,
    appendPosts,
};

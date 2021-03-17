// ******************** Function for tracking the character count ********************
const subjectCount = document.querySelector("#subjectCount");
const inputCount = document.querySelector("#inputCount");
let postSubject = document.getElementById("subject");
let postInput = document.getElementById("journalInput");

function countCharacters() {
    let subjectMaxLength = 100;
    let inputMaxLength = 500;
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

// ******************** Submitting a new form ********************
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

    const options = {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch("http://localhost:3000/", options) //check url?? also do we need to put this in a function to export?
        .then(resp => resp.json())
        .then(appendPost)
        .catch(console.warn);
}

// ******************** Append all new post to the page ********************
function appendPosts(posts) {
    posts.forEach((post) => appendPost(post));
}

// ******************** Function to append together a single post from submitted data ********************
let parent = document.getElementById("postsContainer");
function appendPost(data) {
    const postsDiv = document.createElement("div");
    postsDiv.setAttribute("class", "newPostDiv");

    // headers for the subject names
    const header = document.createElement("h4");
    header.textContent = data.subject;

    // paragraphs for the journal content
    const contents = document.createElement("p");
    contents.textContent = data.journalInput;

    // small text for the date
    const date = document.createElement("small");
    date.textContent = data.date;

    // // imgs for the gif
    // const newImg = document.createElement("img");
    // newImg.src = data.gif;
    // newImg.style.display = "block";
    // newImg.style.margin = "0 auto";

    // // div for emoji icons
    const reactionDiv = document.createElement("div");
    const commentIcon = `<i class="fas fa-comment fa-3x"></i>`;
    const loveIcon = `<i class="fas fa-heart fa-3x"></i>`;
    const cryIcon = `<i class="fas fa-sad-tear fa-3x"></i>`;
    const laughIcon = `<i class="far fa-laugh-squint fa-3x"></i>`;
    reactionDiv.innerHTML = commentIcon + loveIcon + cryIcon + laughIcon;

    // create form for comments
    const commentDiv = document.createElement("div");
    const formComment = document.createElement("form");
    //create text input to type comment
    const formCommentInput = document.createElement("input");
    formCommentInput.setAttribute("type", "text");
    formCommentInput.setAttribute("name", "comments");
    formCommentInput.setAttribute("palceholder", "comments");
    formCommentInput.setAttribute("class", "formCommentInput");
    //set id to the post to use later
    formComment.setAttribute("id", data.id);
    //create submit button
    const formCommentSubmitButton = document.createElement("input");
    formCommentSubmitButton.setAttribute("type", "submit");
    formCommentSubmitButton.setAttribute("class", "formCommentSubmitButton");
    //append form together
    formComment.append(formCommentInput);
    formComment.append(formCommentSubmitButton);
    // add event listener to comment submit button
    formComment.addEventListener("submit", submitComment); // function below
    commentDiv.appendChild(formComment);

    // appending each element to the new postsDiv, and then append this new div to existing postsContainer
    postsDiv.appendChild(header);
    postsDiv.appendChild(contents);
    //postsDiv.appendChild(newImg);
    postsDiv.appendChild(reactionDiv);
    postsDiv.appendChild(commentDiv);
    parent.append(postsDiv);
}

// ******************** Function for users to submit comments to posts ********************
function submitComment(e) {
    e.preventDefault();
    const commentData = {
        id: e.target.getAttribute("id"),
        comment: e.target.comments.value, // this is comming from above line 102
    };

    const options = {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch("https://bloguefp.herokuapp.com/", options)
        .then((r) => r.json())
        .catch(console.warn);

    commentsFunction(commentData, e.target);
    e.target.comments.value = "";
}

// ******************** Create function for new replies ********************

function commentsFunction(commentData, formComment) {
    const newCommentContainer = document.createElement("div");
    const newCommentMessage = document.createElement("p");
    newCommentMessage.textContent = `${commentData.comment}`;
    newCommentContainer.append(newCommentMessage);
    formComment.append(newCommentContainer);
}

// ******************** Function to handle emoji ********************
// do i need a function for each seperate emoji?
const emoji = document.querySelector(""); // to add event listener on emoji? use a tag instead of i tag to make it a link?
emoji.addEventListener("click", emojiReact);

function emojiReact(id, reaction) {
    e.preventDefault();

    const emojiData = {
        // need id of the post and what emoji was clicked on?
        id: id,
        emoji: emoji,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(emojiData),
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch("https://bloguefp.herokuapp.com/", options)
        .then((r) => r.json())
        .then(emojiCounter)
        .catch(console.warn);
}

function emojiCounter(data) {} // this function is not finished

// ******************** Add a GIF ********************
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
                ].images.downsized.url; // choose a random gif, if this doesn't work use the first one e.g. content.data[0].images.downsized.url
            gifimg.classList.add("imgFormat");
            let gifContainer = document.getElementById("gifContainer");
            gifContainer.append(gifimg);
            gifContainer.insertAdjacentElement("afterbegin", gifimg); // gif image will show up as a preview in the make a post section
        })
        .then(appendEntry)
        .catch((err) => {
            console.log(err);
        });
}

// ******************** Get all posts as soon as app is loaded ********************
function getAllPosts() {
    fetch("http://localhost:3000/")
        .then((r) => r.json())
        .then(appendPosts)
        .catch(console.warn);
}

getAllPosts();

// ********************  Function exporting for testing ********************
module.exports = {
    submitPost,
    appendPost,
    appendPosts,
};

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1]);

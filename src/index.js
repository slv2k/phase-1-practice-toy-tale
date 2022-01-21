// add toy info to card
// h2 tag with toy's name
// img tag with src of toy's image attribute + class name "toy-avatar"
// p tag with how many likes that toy has
// button tag with a class like-btn and has an id attribute set to
// toy's id number

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyObj => addToyToDom(toyObj))
}

const mainDiv = document.querySelector("#toy-collection");

function likeBtn(e) {
  let likeCount = parseInt(e.target.previousElementSibling.innerText) + 1
  return likeCount;
}

function addToyToDom(toys) {
  toys.forEach(toy => {
    const toyDiv = document.createElement('div');
    toyDiv.classList.add("card");

    const toyH2 = document.createElement('h2');
    toyH2.textContent = toy.name;
    toyDiv.append(toyH2);

    const toyImg = document.createElement('img');
    toyImg.src = toy.image;
    toyImg.classList.add("toy-avatar");
    toyDiv.append(toyImg);

    const toyP = document.createElement('p');
    toyP.textContent = toy.likes;
    toyDiv.append(toyP);

    const toyBtn = document.createElement('button');
    toyBtn.classList.add("like-btn");
    toyBtn.innerText = "Like";
    toyBtn.id = toy.id;
    toyDiv.append(toyBtn);

    toyBtn.addEventListener('click', function(e) {
      toyP.textContent = likeBtn(e);
    })

    mainDiv.append(toyDiv);
  })
}

function createToy(name, url) {
  let toyContainer = [];
  let newToy = {
      "id": function() {
          fetch("http://localhost:3000/toys")
          .then(res => res.json())
          .then((data) => {
            return data.length + 1;
        })
      },
      "name": name,
      "url": url,
      "likes": 0
  };
  toyContainer = [
    newToy
  ];

  addToyToDom(toyContainer);
}

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys();
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    createToy(e.target.name.value, e.target.image.value);
  })
});
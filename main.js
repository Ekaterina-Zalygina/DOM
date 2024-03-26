import { fetchGet, fetchPost } from "./api.js";
import { CommentsSample, LikesUser, ReplyToСomment } from "./render.js";

// "use strict";
const buttonElement = document.getElementById("add-form-button");
const ListElement = document.getElementById("comments")
const inputNameElement = document.getElementById("input-name")
const inputTextElement = document.getElementById("add-form-text")
const TimeElement = document.getElementById("Time")
const LikeButtons = document.querySelectorAll("like-button")
const LikesCounter = document.getElementById("likes-counter")
const loading = document.getElementById('loading')

// fetchGet()


let Comments = []
//   {
//     name: "Глеб Фокин",
//     date: "12.02.22 12:18",
//     text: "Это будет первый комментарий на этой странице",
//     like: 3,
//     isLiked: false
//   },
//   {
//     name: "Варвара Н.",
//     date: "13.02.22 19:22",
//     text: "Мне нравится как оформлена эта страница! ❤",
//     like: 75,
//     isLiked: false
//   }
// ];

fetchGet().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {

        let myDate = new Date();
        let fullDate = myDate.toLocaleDateString() + ' ' + myDate.toLocaleTimeString()
        myDate.toLocaleDateString();
        myDate.toLocaleTimeString();

        return {
            name: comment.author.name,
            date: fullDate,
            text: comment.text,
            likes: comment.likes,
            isLiked: false
        }
    })
    Comments = appComments
    CommentsSample({Comments, ListElement, ReplyToСomment})
    loading.style.display = "none"
    inputTextElement.value = ""
    inputNameElement.value = ""
}).catch((error) => {
    if (error.message === "Failed to fetch") {
        alert("Сервер поломался, попробуйте позже")
        loading.textContent = "Комментарии не загрузились";
        return
    }
    alert(error.message)
})

fetchGet()
CommentsSample({Comments, ListElement, ReplyToСomment})

const jsonComments = JSON.stringify(Comments);
console.log(jsonComments)

// const CommentsNew = JSON.parse(jsonComments);
// console.log(CommentsNew)

LikesUser()
ReplyToСomment()

CommentsSample({Comments, ListElement, ReplyToСomment});

const initEventListeners = () => {
    const LikesElements = document.querySelectorAll('.like-button')
    console.log(LikesElements)

    for (const LikesElement of LikesElements) {
        LikesElement.addEventListener('click', () => {
            console.log(LikesElement.dataset.likes)
        })
    }
}

// Удаление комментария 
// в  const renderCommentsSample в случае чего вставить строчку <button class="delete-button" data-index="index">Удалить</button> , т.к в функции она почему-то не комметировалась, чтобы не потерять, написала сюда как заметку 

// const initDeleteButtonsListeners  = () => {
//   const DeleteButtonElements = document.querySelectorAll('.delete-button')

//   for(const DeleteButtonsElements of DeleteButtonElements) {
//     DeleteButtonsElements.addEventListener('click', () => {
//       const index = DeleteButtonsElements.dataset.index
//       Comments.splice(index, 1)
//       renderCommentsSample();
//     })
//   }
// }

initEventListeners();
// initDeleteButtonsListeners();

buttonElement.addEventListener("click", () => {

    inputNameElement.style.backgroundColor = "";
    inputTextElement.style.backgroundColor = "";
    //  console.log(inputNameElement)
    if (inputNameElement.value.trim() === "") {
        inputNameElement.style.backgroundColor = "red";
        return;
    };

    if (inputTextElement.value.trim() === "") {
        inputTextElement.style.backgroundColor = "red";
        return;
    };

    buttonElement.disabled = true;
    buttonElement.textContent = "Комментарий добавляется...";


    fetchPost({ name: inputNameElement.value, text: inputTextElement.value })
        .then((response) => {

            if (response.status === 400) {
                buttonElement.textContent = ""
                throw new Error("Вы ввели имя короче 3-х символов");
            }
            if (response.status === 500) {
                buttonElement.textContent = ""
                throw new Error("Ошибка сервера");
            }

            if (response.status === 201) {
                return response.json()
            }

        })
        .then((responseData) => {
            return fetchGet();
        })
        .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            inputTextElement.value = " "
            inputNameElement.value = " "
            CommentsSample({Comments, ListElement, ReplyToСomment})
        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            // alert("Упс, что-то пошло не так")
            loading.style.display = "none";

            if (error.message === "Вы ввели имя короче 3-х символов") {
                alert("Вы ввели имя и комментарий короче 3-х символов")
            }

            if (error.message === "Ошибка сервера") {
                alert("Сервер сломался, попробуйте позже")
            }

            if (error.message === "Failed to fetch") {
                buttonElement.textContent = "Написать"
                alert("Отсутствует подключение к интернету, попробуйте позже")
            }
            console.warn(error)
        })

    CommentsSample({Comments, ListElement, ReplyToСomment})
    buttonElement.disabled = false;




    // fetchPost();
    // fetchGet();
    // renderCommentsSample();
    // initEventListeners();
    // initDeleteButtonsListeners();

    // })
    // console.log("It works!");
})

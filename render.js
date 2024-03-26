export function CommentsSample({Comments, ListElement, ReplyToСomment}) {
    const CommentsHTML = Comments.map((comment, index) => {
      return `<li class="comment" id="comment">
    <div class="comment-header">
    <div>${comment.name}</div>
    <div>${comment.date}</div>
    </div>
    <div class="comment-body">
    <div class="comment-text" data-index="${index}">
    ${comment.text}
    </div>
    </div>
    <div class="comment-footer">
    <div class="likes">
    <span class="likes-counter" id="LikesCounter">${comment.likes}</span>
    <button class="like-button ${comment.isLiked ? '-active-like' : ""}" id="LikeButton" data-index="${index}"></button>
    </div>
    </div>
    </li>`
    }).join('');

    ListElement.innerHTML = CommentsHTML

    LikesUser();
    ReplyToСomment();
}

export function LikesUser() {

    const LikeButtons = document.querySelectorAll(".like-button")
    for (const LikeButton of LikeButtons)
        LikeButton.addEventListener("click", (event) => {
            event.stopPropagation()
            const index = LikeButton.dataset.index;

            if (Comments[index].isLiked === false) {
                Comments[index].isLiked = true;
                Comments[index].likes++;
            }
            else {
                Comments[index].isLiked = false;
                Comments[index].likes--;
            }
            CommentsSample({Comments, ListElement})
        })

}

export function ReplyToСomment() {
const CommUser = document.querySelectorAll(".comment-text")
for (const CommUsers of CommUser)
  CommUsers.addEventListener("click", () => {
    const index = CommUsers.dataset.index;
    const inputTextElement = document.getElementById("add-form-text");
    const CaseTextComment = document.querySelectorAll(".comment-body");
    inputTextElement.value = `${Comments[index].name}:\n${Comments[index].text}`;
    CommentsSample({Comments, ListElement});
  })
}


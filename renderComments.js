// import { LikesUser, ReplyToСomment } from "./main.js"

export const renderCommentsSample = ({ Comments, ListElement, LikesUser, ReplyToСomment }) => {
    const CommentsHTML = Comments
        .map((comment, index) => {
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

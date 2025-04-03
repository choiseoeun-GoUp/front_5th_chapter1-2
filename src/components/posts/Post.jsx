/** @jsx createVNode */
import { createVNode } from "../../lib";
import { toTimeFormat } from "../../utils/index.js";
import { globalStore } from "../../stores/globalStore.js";

export const Post = ({
  id,
  author,
  time,
  content,
  likeUsers,
  activationLike = false,
}) => {
  const { loggedIn, currentUser } = globalStore.getState();
  const { postLike } = globalStore.actions;

  const isActivationLike =
    Array.isArray(likeUsers) &&
    likeUsers.some((user) => user.username === currentUser?.username);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center mb-2">
        <div>
          <div className="font-bold">{author}</div>
          <div className="text-gray-500 text-sm">{toTimeFormat(time)}</div>
        </div>
      </div>
      <p>{content}</p>
      <div className="mt-2 flex justify-between text-gray-500">
        <span
          className={`like-button cursor-pointer${isActivationLike ? " text-blue-500" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            if (loggedIn) {
              postLike(id);
            } else {
              alert("로그인 후 이용해주세요");
            }
          }}
        >
          좋아요 {likeUsers.length}
        </span>
        <span>댓글</span>
        <span>공유</span>
      </div>
    </div>
  );
};

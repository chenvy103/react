import React from "react";
import "./App.css";
import { store } from "./store";

import { userActions } from "./modules/users/userActions";
import { postActions } from "./modules/posts/postActions";
import { commentActions } from "./modules/comments/commentActions";
import { friendsActions } from "./modules/friends/friendsActions";
import { wallActions } from "./modules/wall/wallActions";
import { friendWallActions } from "./modules/friendWall/friendWallActions";

import {users} from './testData/users'
import {posts} from './testData/posts'
import {comments} from './testData/comments'

function App() {
  store.subscribe(() => {
    console.log("New state", store.getState());
  });

  console.log("Loading users");
  store.dispatch(
    userActions.loadUsersAction({
      users,
    })
  );
  console.log("Loading posts");
  store.dispatch(
    postActions.loadPostsAction({
      posts,
    })
  );
  console.log("Loading comments");
  store.dispatch(
    commentActions.loadCommentsAction({
      comments,
    })
  );
  console.log("Loading friends");
  store.dispatch(
    friendsActions.loadFriendsAction({
      userIds: [2, 3],
    })
  );
  console.log("Loading wall posts");
  store.dispatch(
    wallActions.loadWallPostsAction({
      postIds: [1, 2, 3, 4, 5],
    })
  );
  console.log("Loading Anne's posts");
  store.dispatch(
    friendWallActions.loadFriendWallPostsAction({
      postIds: [1, 3, 4],
      userId: 2,
    })
  );

  return (
    <div>
      <div>Store contents</div>
      <div>
        <pre>{JSON.stringify(store.getState(), null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;

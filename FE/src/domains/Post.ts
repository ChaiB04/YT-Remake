import User from '../domains/User'
import PostType from '../enums/PostType'

class Post {
    id?: string;
    title?: string;
    picture?: Uint8Array;
    content?:  string | undefined;
    description?: string;
    user?: User;
    postType?: PostType;
  
    constructor(
      id?: string,
      title?: string,
      picture?: Uint8Array,
      content?: string,
      description?: string,
      user?: User,
      postType?: PostType
    ) {
      this.id = id;
      this.title = title;
      this.picture = picture;
      this.content = content;
      this.description = description;
      this.user = user;
      this.postType = postType;
    }
  }

  export default Post
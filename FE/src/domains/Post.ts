import User from '../domains/User'
import PostType from '../enums/PostType'

class Post {
    id?: string;
    title?: string;
    picture?: Uint8Array;
    content?: string;
    description?: string;
    creator?: User;
    postType?: PostType;
    tags?: string[]
  
    constructor(
      id?: string,
      title?: string,
      picture?: Uint8Array,
      content?: string,
      description?: string,
      creator?: User,
      postType?: PostType,
      tags?: string[]
    ) {
      this.id = id;
      this.title = title;
      this.picture = picture;
      this.content = content;
      this.description = description;
      this.creator = creator;
      this.postType = postType;
      this.tags = tags;
    }
  }

  export default Post
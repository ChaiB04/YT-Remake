class Post {
    id?: string;
    title?: string;
    picture?: number[];
    content?: BigUint64Array;
    description?: string;
    user?: User;
    postType?: PostType;
  
    constructor(
      id?: string,
      title?: string,
      picture?: number[],
      content?: BigUint64Array,
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
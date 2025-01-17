export interface User {
    id: string;
    username: string;
    email: string;
    password:string,
    profilePicture: string;
    bio: string;
    followers: string[];
    following: string[];
    privacy: {
      isPrivate: boolean;
      showEmail: boolean;
    };
    twoFactorEnabled: boolean;
  }
  
  
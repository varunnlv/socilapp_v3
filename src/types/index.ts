// Define types for various data structures used in the application

// Type for defining a navigation link
export type INavLink = {
  imgURL: string;   // URL for the image associated with the navigation link
  route: string;    // Route to navigate to when the link is clicked
  label: string;    // Label or text associated with the navigation link
};

// Type for updating user information
export type IUpdateUser = {
  userId: string;         // ID of the user to update
  name: string;           // New name for the user
  bio: string;            // New biography for the user
  imageId: string;        // ID of the user's image
  imageUrl: URL | string; // URL or string representing the user's image
  file: File[];           // New file for the user's image
};

// Type for creating a new post
export type INewPost = {
  userId: string;       // ID of the user creating the post
  caption: string;      // Caption or description for the post
  file: File[];         // File(s) associated with the post (e.g., images)
  location?: string;    // Optional location information for the post
  tags?: string;        // Optional tags associated with the post
};

// Type for updating an existing post
export type IUpdatePost = {
  postId: string;       // ID of the post to update
  caption: string;      // New caption or description for the post
  imageId: string;      // ID of the post's image
  imageUrl: URL;        // URL representing the updated image for the post
  file: File[];         // New file(s) associated with the post (e.g., updated images)
  location?: string;    // Optional updated location information for the post
  tags?: string;        // Optional updated tags associated with the post
};

// Type for updating an existing post with minimal data
export type IUpdatePost2 = {
  postId: string;       // ID of the post to update
  caption: string;      // New caption or description for the post
};

// Type representing a user
export type IUser = {
  id: string;           // Unique ID of the user
  name: string;         // Name of the user
  username: string;     // Username of the user
  email: string;        // Email address of the user
  imageUrl: string;     // URL of the user's profile image
  bio: string;          // Biography or description of the user
};

// Type for creating a new user
export type INewUser = {
  name: string;         // Name of the new user
  email: string;        // Email address of the new user
  username: string;     // Username of the new user
  password: string;     // Password of the new user
};

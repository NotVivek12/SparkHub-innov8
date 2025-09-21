
## Base URL
```
http://localhost:5000/api
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

## Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Array of specific error messages (optional)"]
}
```

## Success Response Format
```json
{
  "success": true,
  "message": "Success message",
  "data": {
    // Response data
  }
}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new student or teacher account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@university.edu",
  "password": "password123",
  "role": "student", 
  "studentId": "STU001", 
  "university": "University Name",
  "department": "Computer Science",
  "year": 3, 
  "expertise": ["Web Development", "AI/ML"], 
  "bio": "Brief bio", 
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@university.edu",
      "role": "student",
      // ... other user fields
    },
    "token": "jwt_token_here"
  }
}
```

### Login User
**POST** `/auth/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "john@university.edu",
  "password": "password123"
}
```

**Response:** Same as registration response.

### Get Current User
**GET** `/auth/me`

Get current authenticated user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      // User profile data
    }
  }
}
```

### Update Profile
**PUT** `/auth/profile`

Update user profile information.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Updated Name",
  "bio": "Updated bio",
  "phone": "+1234567890",
  // ... other updateable fields
}
```

### Change Password
**PUT** `/auth/change-password`

Change user password.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentPassword": "current_password",
  "newPassword": "new_password"
}
```

---

## Ideas Endpoints

### Get Ideas
**GET** `/ideas`

Retrieve ideas with filtering and pagination. Public endpoint with optional authentication.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `status` - Filter by status (authenticated users only)
- `privacy` - Filter by privacy level ("public", "private")
- `search` - Search in title, problem, solution, tags
- `sortBy` - Sort field (default: "createdAt")
- `sortOrder` - Sort order ("asc", "desc", default: "desc")
- `featured` - Show only featured ideas ("true")

**Response:**
```json
{
  "success": true,
  "data": {
    "ideas": [
      {
        "_id": "idea_id",
        "title": "Revolutionary App Idea",
        "problem": "Problem description",
        "solution": "Solution description",
        "category": "Mobile Apps",
        "privacyLevel": "public",
        "creator": {
          "name": "Creator Name",
          "avatar": "avatar_url"
        },
        "upvoteCount": 15,
        "views": 100,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "current": 1,
      "pages": 5,
      "total": 50,
      "limit": 10
    }
  }
}
```

### Get Single Idea
**GET** `/ideas/:id`

Get detailed information about a specific idea.

**Response:**
```json
{
  "success": true,
  "data": {
    "idea": {
      // Complete idea object with all fields
      "milestones": [],
      "updates": [],
      "upvotes": []
    },
    "userSpecificData": {
      "hasUpvoted": false // Only if authenticated
    }
  }
}
```

### Submit Idea
**POST** `/ideas`

Submit a new idea (Students only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "My Revolutionary Idea",
  "problem": "Detailed problem description",
  "solution": "Brief solution (max 280 chars)",
  "secretSauce": "What makes this unique",
  "targetAudience": "Who benefits from this",
  "requiredHelp": ["Technical Mentorship", "Business Advice"],
  "privacyLevel": "public", // "public" or "private"
  "category": "AI/ML",
  "tags": ["artificial intelligence", "automation"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Idea submitted successfully",
  "data": {
    "idea": {
      // Complete idea object
    }
  }
}
```

### Update Idea
**PUT** `/ideas/:id`

Update an existing idea (Creator only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:** Same fields as submit idea.

### Delete Idea
**DELETE** `/ideas/:id`

Delete an idea (Creator only).

**Headers:** `Authorization: Bearer <token>`

### Toggle Upvote
**POST** `/ideas/:id/upvote`

Upvote or remove upvote from an idea.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Idea upvoted",
  "data": {
    "upvoted": true,
    "upvoteCount": 16
  }
}
```

---

## Comments Endpoints

### Get Comments for Idea
**GET** `/comments/ideas/:ideaId/comments`

Get comments for a specific idea.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `sortBy` - Sort field (default: "createdAt")
- `sortOrder` - Sort order ("asc", "desc", default: "desc")
- `includeReplies` - Include replies ("true", "false", default: "true")

**Response:**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "_id": "comment_id",
        "content": "Great idea! I love the approach.",
        "author": {
          "name": "Commenter Name",
          "avatar": "avatar_url",
          "role": "student"
        },
        "likeCount": 5,
        "replyCount": 2,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "userSpecificData": {
          "hasLiked": false,
          "canEdit": false,
          "canDelete": false
        }
      }
    ],
    "pagination": {
      "current": 1,
      "pages": 3,
      "total": 25,
      "limit": 20
    }
  }
}
```

### Add Comment
**POST** `/comments/ideas/:ideaId/comments`

Add a comment to an idea.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "This is my comment on the idea",
  "parentComment": "parent_comment_id" // Optional, for replies
}
```

### Update Comment
**PUT** `/comments/:id`

Update a comment (Author only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "Updated comment content"
}
```

### Delete Comment
**DELETE** `/comments/:id`

Delete a comment (Author or Admin only).

**Headers:** `Authorization: Bearer <token>`

### Toggle Comment Like
**POST** `/comments/:id/like`

Like or unlike a comment.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Comment liked",
  "data": {
    "liked": true,
    "likeCount": 6
  }
}
```

### Get Replies
**GET** `/comments/:commentId/replies`

Get replies for a specific comment.

**Query Parameters:** Same as get comments.

---

## Data Models

### User Roles
- `student` - Can submit ideas, comment, upvote
- `teacher` - Can mentor students, comment, upvote (requires verification)
- `admin` - Full access to all features

export interface State {
    usersState: UserState;
    commentsState: CommentState;
}

export interface UserState {
    users: User[];
}

export interface User {
    id: number;
    avatar: string;
    name: string;
}

export interface CommentState {
    comments: CommentData[];
    currentPage: number;
    totalPages: number;
    dataLoaded: boolean;
}

export interface CommentData {
    pagination: {
        page: number;
        size: number;
        total_pages: number;
    };
    data: CommentType[];
}

export interface CommentType {
    id: number;
    created: Date;
    author: number;
    likes: number;
    parent: number | null;
    text: string;
    replies?: CommentType[];
}

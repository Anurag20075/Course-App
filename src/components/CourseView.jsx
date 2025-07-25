import React, { useState } from "react";
import {
  Play,
  ThumbsUp,
  MessageSquare,
  Clock,
  Star,
  User,
  Menu,
  X,
  Send,
  BookOpen,
  Award,
} from "lucide-react";

const CourseViewPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(342);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      time: "2 hours ago",
      text: "Great explanation of React hooks! This really helped me understand useState better.",
    },
    {
      id: 2,
      user: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      time: "5 hours ago",
      text: "The examples are very practical. Looking forward to the next lesson on useEffect.",
    },
    {
      id: 3,
      user: "Emma Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      time: "1 day ago",
      text: "Could you cover more advanced patterns in future lessons? This is excellent so far!",
    },
  ]);

  const lessons = [
    {
      title: "Introduction to React Hooks",
      duration: "12:45",
      completed: true,
    },
    { title: "Understanding useState", duration: "18:32", completed: true },
    { title: "Working with useEffect", duration: "22:18", completed: false },
    { title: "Custom Hooks Deep Dive", duration: "25:41", completed: false },
    {
      title: "useContext and State Management",
      duration: "19:56",
      completed: false,
    },
    {
      title: "Performance with useMemo & useCallback",
      duration: "16:33",
      completed: false,
    },
    { title: "Advanced Hook Patterns", duration: "28:12", completed: false },
    { title: "Testing React Hooks", duration: "21:07", completed: false },
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "You",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        time: "Just now",
        text: newComment,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js" />

      <style>
        {`
    :root {
      --primary-color: #6366f1;
      --primary-light: #e0e7ff;
      --success-color: #10b981;
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-200: #e5e7eb;
      --gray-300: #d1d5db;
      --gray-400: #9ca3af;
      --gray-500: #6b7280;
      --gray-600: #4b5563;
      --gray-700: #374151;
      --gray-800: #1f2937;
      --gray-900: #111827;
    }

    body {
      background-color: var(--gray-50);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .sidebar {
      position: fixed;
      top: 0;
      right: 0;
      left: auto;
      height: 100vh;
      width: 320px;
      background: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      z-index: 1050;
      overflow-y: auto;
      margin-top: 100px;
    }

    .sidebar.show {
      transform: translateX(0);
    }

    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1040;
    }

    .main-content {
      margin-right: 0;
      transition: margin-right 0.3s ease;
    }

    @media (min-width: 992px) {
      .sidebar {
        transform: translateX(0);
      }

      .main-content {
        margin-left: 0;
        margin-right: 320px;
      }
    }

    .lesson-item {
      cursor: pointer;
      border-bottom: 1px solid var(--gray-100);
      transition: background-color 0.2s;
    }

    .lesson-item:hover {
      background-color: var(--gray-50);
    }

    .lesson-item.active {
      background-color: var(--primary-light);
      border-right: 4px solid var(--primary-color);
    }

    .lesson-completed,
    .lesson-pending {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lesson-completed {
      background-color: var(--success-color);
      color: white;
    }

    .lesson-pending {
      background-color: var(--gray-200);
      color: var(--gray-600);
    }

    .video-container {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 56.25%;
      background: #000;
      border-radius: 0.5rem;
      overflow: hidden;
    }

    .video-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }

    .play-button {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s;
      border: none;
    }

    .play-button:hover {
      background-color: #5856eb;
    }

    .like-btn {
      border: 1px solid var(--gray-300);
      background: var(--gray-50);
      color: var(--gray-600);
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      transition: all 0.2s;
    }

    .like-btn.liked {
      background: var(--primary-light);
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    .comment-bubble {
      background-color: var(--gray-50);
      border-radius: 0.5rem;
      padding: 0.75rem;
    }

    .badge-custom {
      background-color: var(--primary-light);
      color: var(--primary-color);
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .avatar-sm {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .avatar-lg {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
    }
  `}
      </style>

      <div className="min-vh-100">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay d-lg-none"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}

        {/* Main Content */}
        <div className="main-content">
          <div className="container-fluid py-4" style={{ maxWidth: "1200px" }}>
            {/* Course Info Panel */}

            {/* Video Player */}
            <div className="card shadow-sm mb-4">
              <div className="card-body p-0">
                <div className="video-container">
                  <div className="video-placeholder">
                    <div className="text-center">
                      <button className="play-button text-white mb-3">
                        <Play size={32} style={{ marginLeft: "4px" }} />
                      </button>
                      <h5 className="text-white mb-2">
                        {lessons[currentLesson].title}
                      </h5>
                      <p className="text-light mb-0">
                        {lessons[currentLesson].duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="card shadow-sm mb-4">
              
            </div> */}
            {/* Engagement Section */}
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-start">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
                    alt="Instructor"
                    className="avatar-lg me-4"
                  />{" "}
                  <div className="flex-grow-1">
                    <h2 className="fw-bold text-dark mb-3">
                      React Hooks Masterclass
                    </h2>
                    <p className="text-muted mb-4">
                      Master React Hooks from basics to advanced patterns. Learn
                      useState, useEffect, custom hooks, and performance
                      optimization techniques used in production applications.
                    </p>
                    <div className="d-flex align-items-center flex-wrap gap-4">
                      <div className="d-flex align-items-center">
                        <User size={16} className="me-1 text-muted" />
                        <small className="text-muted">Dr. Alex Rodriguez</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <Star
                          size={16}
                          className="me-1 text-warning"
                          fill="currentColor"
                        />{" "}
                        <small className="text-muted">
                          4.8 (1,234 reviews)
                        </small>
                      </div>
                      <span className="badge-custom">Web Development</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                {/* Like Button */}
                <div className="d-flex align-items-center pb-4 border-bottom mb-4">
                  <button
                    onClick={handleLike}
                    className={`like-btn btn d-flex align-items-center me-4 ${
                      liked ? "liked" : ""
                    }`}
                  >
                    <ThumbsUp
                      size={16}
                      className="me-2"
                      fill={liked ? "currentColor" : "none"}
                    />
                    <span className="fw-medium">{likeCount}</span>
                  </button>
                  <div className="d-flex align-items-center text-muted">
                    <MessageSquare size={16} className="me-2" />
                    <span>{comments.length} Comments</span>
                  </div>
                </div>

                {/* Add Comment */}
                <div className="pb-4 border-bottom mb-4">
                  <div className="d-flex">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                      alt="Your avatar"
                      className="avatar me-3"
                    />
                    <div className="flex-grow-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="form-control mb-2"
                        rows="3"
                        style={{ resize: "none" }}
                      />
                      <div className="d-flex justify-content-end">
                        <button
                          onClick={handleAddComment}
                          className="btn btn-primary d-flex align-items-center"
                        >
                          <Send size={16} className="me-2" />
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="d-flex flex-column gap-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="d-flex">
                      <img
                        src={comment.avatar}
                        alt={comment.user}
                        className="avatar me-3"
                      />
                      <div className="flex-grow-1">
                        <div className="comment-bubble">
                          <div className="d-flex align-items-center mb-2">
                            <span className="fw-medium text-dark me-2">
                              {comment.user}
                            </span>
                            <small className="text-muted">{comment.time}</small>
                          </div>
                          <p className="text-dark mb-0">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "show" : ""} mt-`}>
        <div className="p-4 border-bottom ">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="mb-0 fw-semibold text-dark">Course Lessons</h5>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="btn-close d-lg-none"
              aria-label="Close"
            />
          </div>
        </div>
        <div className="pb-5">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentLesson(index);
                setSidebarOpen(false);
              }}
              className={`lesson-item p-3 ${
                currentLesson === index ? "active" : ""
              }`}
            >
              <div className="d-flex align-items-center">
                <div
                  className={
                    lesson.completed
                      ? "lesson-completed me-3"
                      : "lesson-pending me-3"
                  }
                >
                  {lesson.completed ? (
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <Play size={16} />
                  )}
                </div>
                <div className="flex-grow-1">
                  <h6
                    className={`mb-1 ${
                      currentLesson === index ? "text-primary" : "text-dark"
                    }`}
                  >
                    {lesson.title}
                  </h6>
                  <div className="d-flex align-items-center text-muted">
                    <Clock size={12} className="me-1" />
                    <small>{lesson.duration}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseViewPage;

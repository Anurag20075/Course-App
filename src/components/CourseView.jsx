import React, { useState, useEffect } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Clock,
  Star,
  User,
  Play,
  MessageCircle,
  Send,
} from "lucide-react";

// Course data (simulating the imported data)
const CourseViewData = [
  {
    id: "1",
    title: "React for Beginners",
    instructor: "Web Boss",
    avatar: "/avatars/wes.png",
    description:
      "Learn the fundamentals of React, the popular JavaScript library for building user interfaces. This comprehensive course covers components, state management, hooks, and modern React patterns.",
    tags: ["React", "Frontend"],
    videoUrl: "https://youtu.be/nbIZ4vwDULk?si=Y90bu1muHZ3Hugxn",
    duration: "3h 20m",
    rating: 4.5,
    progress: 0.3,
    likes: 124,
    comments: [
      {
        id: 1,
        name: "Alice",
        text: "Really helpful intro to React!",
        timestamp: "2 days ago",
      },
      {
        id: 2,
        name: "Bob",
        text: "Can you make one for Redux too?",
        timestamp: "1 week ago",
      },
    ],
  },
  {
    id: "2",
    title: "Mastering JavaScript",
    instructor: "Kyle Simpson",
    avatar: "/avatars/kyle.png",
    description:
      "A deep dive into modern JavaScript features and techniques. Master closures, prototypes, async/await, and advanced ES6+ features.",
    tags: ["JavaScript", "Advanced"],
    videoUrl: "https://youtu.be/N16A258rXJU?si=ZqKU7CHzZ6FZZVCv",
    duration: "5h 15m",
    rating: 4.7,
    progress: 0.8,
    likes: 231,
    comments: [
      {
        id: 1,
        name: "Charlie",
        text: "I finally understand closures!",
        timestamp: "3 days ago",
      },
    ],
  },
  {
    id: "3",
    title: "Intro to Python Programming",
    instructor: "Angela Yu",
    avatar: "/avatars/angela.png",
    description:
      "Start your programming journey with Python basics. Learn variables, functions, loops, and object-oriented programming concepts.",
    tags: ["Python", "Backend"],
    videoUrl: "https://youtu.be/dfIxO1bOyqk?si=Hu95u2MFQQnZ_zeb",
    duration: "4h 40m",
    rating: 4.6,
    progress: 0.1,
    likes: 190,
    comments: [
      {
        id: 1,
        name: "Dana",
        text: "Very beginner friendly!",
        timestamp: "5 days ago",
      },
    ],
  },
  {
    id: "4",
    title: "Spring Boot Crash Course",
    instructor: "Dan Vega",
    avatar: "/avatars/dan.png",
    description:
      "Learn how to build REST APIs using Spring Boot. Cover dependency injection, JPA, security, and deployment strategies.",
    tags: ["Java", "Spring Boot"],
    videoUrl: "https://youtu.be/9sUBVbQY4b8?si=Jr3fpcUuLMLa4HHn",
    duration: "3h 50m",
    rating: 4.3,
    progress: 0.6,
    likes: 158,
    comments: [
      {
        id: 1,
        name: "Eve",
        text: "Exactly what I needed for my project!",
        timestamp: "1 day ago",
      },
    ],
  },
  {
    id: "5",
    title: "Tailwind CSS from Scratch",
    instructor: "Brad Traversy",
    avatar: "/avatars/brad.png",
    description:
      "A modern utility-first CSS framework for fast UI development. Learn responsive design, components, and customization.",
    tags: ["CSS", "Frontend"],
    videoUrl: "https://youtu.be/ohIAiuHMKMI?si=FQg1K8AMH_KnFsxj",
    duration: "2h 30m",
    rating: 4.8,
    progress: 0.9,
    likes: 289,
    comments: [
      {
        id: 1,
        name: "Frank",
        text: "Now I prefer Tailwind over Bootstrap!",
        timestamp: "4 hours ago",
      },
    ],
  },
];

// Simulate React Router params
const useParams = () => {
  const [currentCourseId, setCurrentCourseId] = useState("1");
  return { id: currentCourseId, setCurrentCourseId };
};

const CourseViewPage = () => {
  const { id: courseId, setCurrentCourseId } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [userReaction, setUserReaction] = useState(null); // 'like' or 'dislike'
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Find current course
    const currentCourse = CourseViewData.find((c) => c.id === courseId);
    if (currentCourse) {
      setCourse(currentCourse);
      setComments(currentCourse.comments || []);
      setLikes(currentCourse.likes || 0);

      // Get related courses (exclude current course)
      const related = CourseViewData.filter((c) => c.id !== courseId).slice(
        0,
        6
      );
      setRelatedCourses(related);
    }
  }, [courseId]);

  const getEmbeddedUrl = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
      }
      if (
        parsed.hostname.includes("youtube.com") &&
        parsed.searchParams.has("v")
      ) {
        return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
      }
      return url; // fallback for already-embedded URLs
    } catch {
      return url;
    }
  };

  const handleLike = () => {
    if (userReaction === "like") {
      setUserReaction(null);
      setLikes(likes - 1);
    } else {
      setUserReaction("like");
      setLikes(userReaction === "dislike" ? likes + 1 : likes + 1);
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      setUserReaction(null);
      setLikes(userReaction === "like" ? likes - 1 : likes);
    } else {
      setUserReaction("dislike");
      if (userReaction === "like") {
        setLikes(likes - 1);
      }
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        name: "You",
        text: newComment,
        timestamp: "just now",
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleCourseSelect = (courseId) => {
    setCurrentCourseId(courseId);
    setUserReaction(null); // Reset reaction for new course
  };

  if (!course) {
    return (
      <>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <style jsx>{`
          .spinner-border {
            width: 3rem;
            height: 3rem;
          }
        `}</style>
        <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading course...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Bootstrap CSS */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
        rel="stylesheet"
      />

      {/* Custom CSS for YouTube-like styling */}
      <style jsx>{`
        .video-player {
          background: linear-gradient(135deg, #1f2937, #111827);
          aspect-ratio: 16/9;
        }

        .course-thumbnail {
          background: linear-gradient(135deg, #1f2937, #111827);
          aspect-ratio: 16/9;
          width: 160px;
          height: 90px;
        }

        .duration-overlay {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          font-size: 0.75rem;
          padding: 2px 4px;
          border-radius: 2px;
        }

        .avatar-gradient {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        }

        .progress-red {
          background-color: #dc3545;
        }

        .sidebar-item:hover {
          background-color: #f8f9fa;
        }

        .sidebar-item:hover .course-title {
          color: #0d6efd;
        }

        .like-btn.active {
          background-color: #e3f2fd;
          color: #1976d2;
        }

        .dislike-btn.active {
          background-color: #ffebee;
          color: #d32f2f;
        }

        .comment-avatar {
          background: linear-gradient(135deg, #16a085, #3498db);
        }

        .user-avatar {
          background: linear-gradient(135deg, #27ae60, #3498db);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="min-vh-100 bg-light">
        <div className="container-fluid py-4">
          <div className="row g-3">
            {/* Main Course Section - Left Side */}
            <div className="col-lg-8">
              {/* Video Player */}
              <div className="video-player rounded d-flex align-items-center justify-content-center mb-4">
                <iframe
                  src={getEmbeddedUrl(course.videoUrl)}
                  title={course.title}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-100 h-100"
                ></iframe>
              </div>

              {/* Course Info Card */}
              <div className="card mb-4">
                <div className="card-body">
                  {/* Title and Tags */}
                  <div className="mb-3">
                    <h2 className="card-title mb-3">{course.title}</h2>
                    <div className="d-flex flex-wrap gap-2">
                      {course.tags.map((tag, index) => (
                        <span key={index} className="badge bg-primary fs-6">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Instructor Info */}
                  <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                    <div className="d-flex align-items-center">
                      <div
                        className="avatar-gradient rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: "48px", height: "48px" }}
                      >
                        <User size={24} className="text-white" />
                      </div>
                      <div>
                        <h6 className="mb-0">{course.instructor}</h6>
                        {/* <small className="text-muted">Course Instructor</small> */}
                      </div>
                    </div>

                    {/* <button className="btn btn-primary">
                      {course.progress === 1
                        ? "Review Course"
                        : "Continue Learning"}
                    </button> */}
                  </div>

                  {/* Like/Dislike Buttons */}
                  <div className="d-flex gap-2 mb-3 pb-3 border-bottom">
                    <button
                      onClick={handleLike}
                      className={`btn btn-outline-secondary d-flex align-items-center gap-2 like-btn ${
                        userReaction === "like" ? "active" : ""
                      }`}
                    >
                      <ThumbsUp size={16} />
                      <span>{likes}</span>
                    </button>
                    <button
                      onClick={handleDislike}
                      className={`btn btn-outline-secondary d-flex align-items-center gap-2 dislike-btn ${
                        userReaction === "dislike" ? "active" : ""
                      }`}
                    >
                      <ThumbsDown size={16} />
                    </button>
                  </div>

                  {/* Description */}
                  <div>
                    <h6 className="mb-2">About this course</h6>
                    <p className="text-muted mb-0">{course.description}</p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <MessageCircle size={20} className="text-muted" />
                    <h5 className="mb-0">Comments ({comments.length})</h5>
                  </div>

                  {/* Add Comment */}
                  <div className="d-flex gap-3 mb-4">
                    <div
                      className="user-avatar rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <User size={16} className="text-white" />
                    </div>
                    <div className="flex-grow-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="form-control mb-3"
                        rows="3"
                      />
                      <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="btn btn-primary d-flex align-items-center gap-2"
                      >
                        <Send size={16} />
                        <span>Post</span>
                      </button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="d-flex flex-column gap-3">
                    {comments.map((comment) => (
                      <div key={comment.id} className="d-flex gap-3">
                        <div
                          className="comment-avatar rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <User size={16} className="text-white" />
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <h6 className="mb-0">{comment.name}</h6>
                            <small className="text-muted">
                              {comment.timestamp}
                            </small>
                          </div>
                          <p className="mb-0 text-muted">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Courses Sidebar - Right Side (YouTube Style) */}
            <div className="col-lg-4">
              <div className="d-flex flex-column gap-2">
                {relatedCourses.map((relatedCourse) => (
                  <div
                    key={relatedCourse.id}
                    onClick={() => handleCourseSelect(relatedCourse.id)}
                    className="d-flex gap-2 p-2 rounded cursor-pointer sidebar-item"
                    style={{ cursor: "pointer" }}
                  >
                    {/* Thumbnail */}
                    <div className="position-relative flex-shrink-0">
                      <div className="course-thumbnail rounded d-flex align-items-center justify-content-center">
                        <Play size={32} className="text-white opacity-75" />
                      </div>
                      {/* Duration overlay */}
                      <div className="duration-overlay">
                        {relatedCourse.duration}
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="flex-grow-1 py-1" style={{ minWidth: 0 }}>
                      <h6 className="mb-1 small line-clamp-2 course-title">
                        {relatedCourse.title}
                      </h6>
                      <p
                        className="mb-1 text-muted"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {relatedCourse.instructor}
                      </p>
                      <div
                        className="d-flex align-items-center gap-3 text-muted"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <div className="d-flex align-items-center gap-1">
                          <Star size={12} className="text-warning" />
                          <span>{relatedCourse.rating}</span>
                        </div>
                        <span>{relatedCourse.likes} likes</span>
                      </div>
                      {/* Progress indicator for started courses */}
                      {relatedCourse.progress > 0 && (
                        <div className="mt-2">
                          <div className="progress" style={{ height: "2px" }}>
                            <div
                              className="progress-bar progress-red"
                              style={{
                                width: `${relatedCourse.progress * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Load more button */}
                <div className="pt-3">
                  <button className="btn btn-link w-100 text-primary">
                    Show more courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseViewPage;

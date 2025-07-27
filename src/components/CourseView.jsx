import React, { useState, useEffect } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Star,
  User,
  Play,
  MessageCircle,
  Send,
} from "lucide-react";

// Sample Course Data
const CourseViewData = [
  {
    id: "1",
    title: "React for Beginners",
    instructor: "Wes Bos",
    avatar: "/avatars/wes.png",
    description:
      "Learn the fundamentals of React, the popular JavaScript library for building user interfaces. This comprehensive course covers components, state management, hooks, and modern React patterns.",
    tags: ["React", "Frontend"],
    videoUrl: "https://youtu.be/zzVa5cvQK6w?si=zxI5IOXRBXCpqsCq",
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
  // ... (Other courses remain unchanged for brevity)
];

// Simulated React Router useParams
const useParams = () => {
  const [currentCourseId, setCurrentCourseId] = useState("1");
  return { id: currentCourseId, setCurrentCourseId };
};

// Converts YouTube URL to embed format
const convertToEmbedUrl = (url) => {
  if (url.includes("youtube.com/watch")) {
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else {
    return url;
  }
};

const CourseViewPage = () => {
  const { id: courseId, setCurrentCourseId } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [userReaction, setUserReaction] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const current = CourseViewData.find((c) => c.id === courseId);
    if (current) {
      setCourse(current);
      setComments(current.comments || []);
      setLikes(current.likes || 0);
      setRelatedCourses(CourseViewData.filter((c) => c.id !== courseId));
    }
  }, [courseId]);

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
      if (userReaction === "like") setLikes(likes - 1);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          name: "You",
          text: newComment,
          timestamp: "just now",
        },
      ]);
      setNewComment("");
    }
  };

  const handleCourseSelect = (id) => {
    setCurrentCourseId(id);
    setUserReaction(null);
  };

  if (!course) return <p>Loading...</p>;

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style jsx>{`
        .video-player {
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          overflow: hidden;
        }
        .course-thumbnail {
          background: #111827;
          aspect-ratio: 16/9;
          width: 160px;
          height: 90px;
        }
        .like-btn.active {
          background-color: #e3f2fd;
          color: #1976d2;
        }
        .dislike-btn.active {
          background-color: #ffebee;
          color: #d32f2f;
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="container-fluid py-4 bg-light min-vh-100">
        <div className="row g-3">
          {/* Left Side - Main Course */}
          <div className="col-lg-8">
            {/* Embedded Video */}
            <div className="video-player mb-4">
              <iframe
                src={convertToEmbedUrl(course.videoUrl)}
                title={course.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                width="100%"
                height="100%"
              ></iframe>
            </div>

            {/* Course Info Card */}
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="mb-3">{course.title}</h2>
                <div className="mb-3">
                  {course.tags.map((tag, i) => (
                    <span key={i} className="badge bg-primary me-2">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between small text-muted mb-1">
                    <span>Progress</span>
                    <span>{Math.round(course.progress * 100)}%</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${course.progress * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white me-3"
                      style={{ width: "48px", height: "48px" }}
                    >
                      <User size={20} />
                    </div>
                    <div>
                      <h6 className="mb-0">{course.instructor}</h6>
                      <small className="text-muted">Instructor</small>
                    </div>
                  </div>
                  <button className="btn btn-primary">
                    {course.progress >= 1
                      ? "Review Course"
                      : "Continue Learning"}
                  </button>
                </div>

                {/* Like/Dislike */}
                <div className="d-flex gap-2 mb-3">
                  <button
                    className={`btn btn-outline-secondary d-flex align-items-center gap-2 like-btn ${
                      userReaction === "like" ? "active" : ""
                    }`}
                    onClick={handleLike}
                  >
                    <ThumbsUp size={16} />
                    <span>{likes}</span>
                  </button>
                  <button
                    className={`btn btn-outline-secondary d-flex align-items-center gap-2 dislike-btn ${
                      userReaction === "dislike" ? "active" : ""
                    }`}
                    onClick={handleDislike}
                  >
                    <ThumbsDown size={16} />
                  </button>
                </div>

                {/* Description */}
                <div>
                  <h6 className="mb-2">About this course</h6>
                  <p className="text-muted">{course.description}</p>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <MessageCircle size={20} />
                  <h5 className="mb-0">Comments ({comments.length})</h5>
                </div>

                {/* Add Comment */}
                <div className="d-flex gap-3 mb-4">
                  <div
                    className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <User size={16} />
                  </div>
                  <div className="flex-grow-1">
                    <textarea
                      className="form-control mb-2"
                      rows="3"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button
                      className="btn btn-primary"
                      disabled={!newComment.trim()}
                      onClick={handleAddComment}
                    >
                      <Send size={16} className="me-1" />
                      Post
                    </button>
                  </div>
                </div>

                {/* Comment List */}
                <div className="d-flex flex-column gap-3">
                  {comments.map((c) => (
                    <div key={c.id} className="d-flex gap-3">
                      <div
                        className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <User size={16} />
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h6 className="mb-0">{c.name}</h6>
                          <small className="text-muted">{c.timestamp}</small>
                        </div>
                        <p className="mb-0 text-muted">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Related Courses */}
          <div className="col-lg-4">
            <h5 className="mb-3">Related Courses</h5>
            <div className="d-flex flex-column gap-3">
              {relatedCourses.map((rc) => (
                <div
                  key={rc.id}
                  className="d-flex gap-2 p-2 border rounded cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCourseSelect(rc.id)}
                >
                  <div className="position-relative">
                    <div className="course-thumbnail rounded d-flex align-items-center justify-content-center">
                      <Play size={24} className="text-white" />
                    </div>
                    <div className="duration-overlay">{rc.duration}</div>
                  </div>
                  <div>
                    <h6 className="mb-1 line-clamp-2">{rc.title}</h6>
                    <small className="text-muted">{rc.instructor}</small>
                    <div className="d-flex gap-2 small text-muted mt-1">
                      <span>
                        <Star size={12} className="text-warning me-1" />
                        {rc.rating}
                      </span>
                      <span>{rc.likes} likes</span>
                    </div>
                    {rc.progress > 0 && (
                      <div className="progress mt-1" style={{ height: "3px" }}>
                        <div
                          className="progress-bar bg-danger"
                          style={{ width: `${rc.progress * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseViewPage;

import { useState, useEffect } from "react";

function CourseView() {
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Alex Morgan",
      avatar: "https://placehold.co/40x40",
      time: "2 hours ago",
      text: "This section was super helpful! Thanks for the clear explanation.",
    },
    {
      id: 2,
      name: "Jamie Chen",
      avatar: "https://placehold.co/40x40",
      time: "5 hours ago",
      text: "The visuals made it easier to understand. Great job!",
    },
    {
      id: 3,
      name: "Samantha Lee",
      avatar: "https://placehold.co/40x40",
      time: "1 day ago",
      text: "I think there could be a bit more detail on the second example.",
    },
  ]);
  const [likes, setLikes] = useState(1250);
  const [isLiked, setIsLiked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const lessons = [
    { title: "Introduction to the Course", duration: "3:15" },
    { title: "Setting Up Your Development Environment", duration: "8:45" },
    { title: "Understanding Core Concepts", duration: "12:30" },
    { title: "Building Your First Project", duration: "18:20" },
    { title: "Advanced Techniques and Patterns", duration: "22:10" },
    { title: "Testing and Debugging", duration: "15:45" },
    { title: "Deployment and Optimization", duration: "10:30" },
    { title: "Course Recap and Next Steps", duration: "6:15" },
  ];

  const courseInfo = {
    title: "Mastering Modern Web Development",
    instructor: {
      name: "Dr. Sarah Mitchell",
      avatar: "https://placehold.co/60x60",
    },
    duration: "2h 45m",
    category: "Web Development",
    difficulty: "Intermediate",
    description:
      "A comprehensive course covering the latest tools, frameworks, and best practices in modern web development. From setting up your environment to deploying scalable applications, this course will equip you with the skills needed to build high-quality web applications.",
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    const newComment = {
      id: comments.length + 1,
      name: "You",
      avatar: "https://placehold.co/40x40",
      time: "Just now",
      text: comment,
    };
    setComments([newComment, ...comments]);
    setComment("");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header - Mobile */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
        <h1 className="text-lg font-bold truncate">{courseInfo.title}</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-64 lg:w-72 bg-white shadow-sm p-4 md:h-screen md:sticky top-0 overflow-y-auto`}
        >
          <h2 className="text-lg font-semibold mb-4">Course Contents</h2>
          <nav>
            <ul className="space-y-2">
              {lessons.map((lesson, index) => (
                <li key={index}>
                  <button
                    onClick={() => setSelectedLesson(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all flex justify-between items-center ${
                      selectedLesson === index
                        ? "bg-indigo-100 text-indigo-700 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span>{lesson.title}</span>
                    <span className="text-sm text-gray-500">
                      {lesson.duration}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {/* Course Info */}
          <section className="mb-6 bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {courseInfo.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={courseInfo.instructor.avatar}
                  alt={courseInfo.instructor.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">
                  {courseInfo.instructor.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                <span>Duration: {courseInfo.duration}</span>
                <span>•</span>
                <span>Category: {courseInfo.category}</span>
                <span>•</span>
                <span>Difficulty: {courseInfo.difficulty}</span>
              </div>
            </div>
            <p className="text-gray-700">{courseInfo.description}</p>
          </section>

          {/* Video Player */}
          <section className="mb-6 aspect-video bg-black rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto mb-2"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <p className="text-lg font-medium">Video Player Placeholder</p>
              </div>
            </div>
          </section>

          {/* Engagement Section */}
          <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 mt-6">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 px-4 py-2 rounded-full transition-colors ${
                  isLiked
                    ? "bg-indigo-100 text-indigo-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h15v-11a3 3 0 0 0-3-3z" />
                  <path d="M18 9v11h-15v-11a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3z" />
                </svg>
                <span>{likes}</span>
              </button>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Comments</h3>
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
                  rows="3"
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Post Comment
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{c.name}</h4>
                        <span className="text-sm text-gray-500">{c.time}</span>
                      </div>
                      <p className="text-gray-700 mt-1">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
export default CourseView;

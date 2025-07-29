import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, Play, CheckCircle } from "lucide-react";
import { FaStarHalfAlt } from "react-icons/fa";

export default function CourseDetailedPage() {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/course-view");
  };
  return (
    <div className="min-vh-100 bg-dark font-sans">
      <div className="bg-gradient text-white py-5 px-3">
        <div className="container">
          <div className="row align-items-start gy-4">
            <div className="col-md-7 col-lg-8">
              <div className="d-flex gap-2 mb-3">
                <span className="badge bg-primary">Web Development</span>
                <span className="badge bg-primary">JavaScript</span>
              </div>
              <h1 className="display-5 fw-bold">
                Complete JavaScript Course 2023: From Zero to Expert!
              </h1>
              <div className="d-flex align-items-center gap-3 small">
                <div className="d-flex align-items-center">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-warning"
                    >
                      <Star
                        size={20}
                        className="text-warning"
                        fill="currentColor"
                      />
                    </span>
                  ))}
                  <span className="material-symbols-outlined text-warning">
                    <FaStarHalfAlt size={20} color="#f5c518" />
                  </span>
                  <span className="ms-1 fw-large">4.8</span>
                </div>
                {/* <div className="d-flex align-items-center">
                  <span className="material-symbols-outlined text-white-50 small me-1">
                    person
                  </span>
                  <span>34,567 students</span>
                </div> */}
              </div>
            </div>
            <div className="col-md-5 col-lg-4">
              <div className="bg-white rounded shadow overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt="Course Thumbnail"
                  className="img-fluid object-fit-cover"
                  style={{ height: "16rem", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            {/* <div className="bg-white rounded shadow-sm p-4 mb-4">
              <h2 className="h5 border-bottom pb-2 mb-3">Instructor</h2>
              <div className="row g-3">
                <div className="col-auto">
                  <img
                    src="https://images.unsplash.com/photo-1544168190-79c17527004f"
                    className="rounded-circle border border-primary"
                    width="96"
                    height="96"
                    alt="Instructor"
                  />
                </div>
                <div className="col">
                  <h5 className="mb-1">John Smith</h5>
                  <p className="mt-2">
                    Web developer and instructor with over 10 years of
                    experience. Passionate about teaching and making complex
                    concepts easy to understand. Author of bestselling courses
                    on JavaScript, React, and web development.
                  </p>
                  ``
                </div>
              </div>
            </div> */}
            <div className="bg-white rounded shadow-sm p-4 mb-4">
              <h2 className="h5 border-bottom pb-2 mb-3">Course Overview</h2>
              <p>
                This comprehensive JavaScript course will take you from absolute
                beginner to advanced developer. You'll learn all the modern
                JavaScript features including ES6+, build real-world projects,
                understand how JavaScript works behind the scenes, and prepare
                for technical interviews.
              </p>
            </div>
            {/* <div className="bg-white rounded shadow-sm p-4 mb-4">
              <h2 className="h5 border-bottom pb-2 mb-3">Requirements</h2>
              <ul className="list-unstyled">
                {[
                  "No programming experience needed - I'll teach you everything you need to know",
                  "Basic understanding of HTML and CSS is a plus but not required",
                  "A computer (Windows, macOS, or Linux) with internet connection",
                  "Enthusiasm and determination to learn programming",
                ].map((item, index) => (
                  <li key={index} className="d-flex">
                    <span className="material-symbols-outlined text-primary me-2">
                      <ArrowRight size={20} strokeWidth={2} color="black" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div> */}

            <div className="bg-white rounded shadow-sm p-4">
              <h2 className="h5 border-bottom pb-2 mb-3">Student Comments</h2>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <span className="material-symbols-outlined text-warning me-1">
                    <Star
                      size={20}
                      className="text-warning"
                      fill="currentColor"
                    />
                  </span>
                  <span className="fw-semibold">4.8 course rating</span>
                  <span className="mx-2 text-muted">•</span>
                  <span className="text-muted">2,845 ratings</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: "1rem" }}>
              <div className="bg-white rounded shadow overflow-hidden">
                <div
                  className="position-relative bg-dark"
                  style={{ height: "12rem" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4"
                    className="w-100 h-100 object-fit-cover opacity-50"
                    alt="Course preview"
                  />
                  <button
                    className="position-absolute top-50 start-50 translate-middle btn btn-light rounded-circle"
                    style={{ width: "3.5rem", height: "3.5rem" }}
                  >
                    <span className="material-symbols-outlined text-primary fs-3">
                      <Play size={28} className="text-primary" />
                    </span>
                  </button>
                  <div className="position-absolute bottom-0 end-0 bg-dark bg-opacity-75 text-white small px-2 py-1">
                    Preview this course
                  </div>
                </div>

                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-baseline mb-2">
                    <div>
                      <span className="fs-4 fw-bold">$0</span>
                    </div>
                    {/* <span className="badge bg-warning text-dark">75% off</span> */}
                  </div>
                  {/* <div className="text-danger small d-flex align-items-center mb-3">
                    <span className="material-symbols-outlined me-1 small">
                      schedule
                    </span>
                    3 days left at this price!
                  </div> */}
                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={handleclick}
                  >
                    Enroll Now
                  </button>
                  {/* <p className="text-center text-muted small mb-3">
                    30-Day Money-Back Guarantee
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// import {  } from "lucide-react";

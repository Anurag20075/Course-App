import { useEffect, useState } from "react";
import { Container, Form, FormGroup, Input, Spinner, Label } from "reactstrap";
import axios from "axios";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const AddCourse = () => {
    useEffect(() => {
        document.title = "Add Course";
    }, []);

    const [course, setCourse] = useState({
        title: "",
        author: "",
        tags: "",
        description: "",
        imageLink: "",
        videoLink: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCourse((prevCourse) => ({
            ...prevCourse,
            [id]: value,
        }));
    };

    const handleForm = (e) => {
        e.preventDefault();
        if (
            !course.title ||
            !course.author ||
            !course.author ||
            !course.description ||
            !course.imageLink ||
            !course.videoLink
        ) {
            toast.warn("Please fill out all fields");
            return;
        }
        const payload = {
            ...course,
            id: undefined, // remove id for new course
            rating: 0,
            tags: course.tags
                ? course.tags.split(",").map((tag) => tag.trim()) // convert string → array
                : [],
        };
        postDataToServer(payload);
    };

    const postDataToServer = (data) => {
        console.log(data);
        setIsSubmitting(true);
        axios.post(`${base_url}/courses`, data).then(
            (response) => {
                toast.success("Course added successfully");
                console.log(response);
                setIsSubmitting(false);
                setCourse({
                    title: "",
                    author: "",
                    tags: "",
                    description: "",
                    imageLink: "",
                    videoLink: "",
                });
            },
            (error) => {
                console.log(error);
                toast.error("Something went wrong");
                setIsSubmitting(false);
            }
        );
    };

    const clearForm = () => {
        setCourse({
            title: "",
            author: "",
            tags: "",
            description: "",
            imageLink: "",
            videoLink: "",
        });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <div
                className="w-100 p-4 bg-white border rounded-4 shadow"
                style={{ maxWidth: "700px" }}
            >
                <h2 className="text-center mb-4 fw-semibold">Add New Course</h2>
                <Form onSubmit={handleForm}>
                    <FormGroup className="mb-3">
                        <Label for="title" className="form-label fw-bold">
                            Title
                        </Label>
                        <Input
                            type="text"
                            id="title"
                            className="form-control"
                            placeholder="Enter course title"
                            value={course.title}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Label for="author" className="form-label fw-bold">
                            Author
                        </Label>
                        <Input
                            type="text"
                            id="author"
                            className="form-control"
                            placeholder="Enter author's name"
                            value={course.author}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    {/* Tags */}

                    <FormGroup className="mb-3">
                        <Label for="tags" className="form-label fw-bold">
                            Tags
                        </Label>
                        <Input
                            type="text"
                            id="tags"
                            className="form-control"
                            placeholder="Enter course Tags eg. AI, Cloud, Web Development"
                            value={course.tags}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Label for="description" className="form-label fw-bold">
                            Description
                        </Label>
                        <Input
                            type="textarea"
                            id="description"
                            className="form-control"
                            placeholder="Enter course description"
                            value={course.description}
                            onChange={handleInputChange}
                            style={{ height: "120px" }}
                        />
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Label for="imageLink" className="form-label fw-bold">
                            Image URL
                        </Label>
                        <Input
                            type="text"
                            id="imageLink"
                            className="form-control"
                            placeholder="Enter image URL"
                            value={course.imageLink}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Label for="imageLink" className="form-label fw-bold">
                            Video URL
                        </Label>
                        <Input
                            type="text"
                            id="videoLink"
                            className="form-control"
                            placeholder="Enter Video URL"
                            value={course.videoLink}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <div className="text-center">
                        <Button
                            type="submit"
                            variant="dark"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner size="sm" /> Submitting...
                                </>
                            ) : (
                                "Add Course"
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline-dark"
                            className="ms-3"
                            onClick={clearForm}
                            outline
                        >
                            Clear
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default AddCourse;

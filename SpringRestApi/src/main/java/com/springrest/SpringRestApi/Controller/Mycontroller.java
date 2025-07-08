package com.springrest.SpringRestApi.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springrest.SpringRestApi.Entity.Courses;
import com.springrest.SpringRestApi.Services.CourseServices;

@RestController  
@RequestMapping("/courses")  
@CrossOrigin(origins = "http://localhost:5173")
public class Mycontroller {

    @Autowired
    private CourseServices courseService;

    @GetMapping
    public List<Courses> getCourses() {	 
        return this.courseService.getCourses();
    }

    @GetMapping("/{courseId}")
    public Courses getCourse(@PathVariable String courseId) {
        return this.courseService.getCourse(Long.parseLong(courseId));
    }

    @PostMapping
    public Courses addCourse(@RequestBody Courses course) {
        return this.courseService.addCourse(course);
    }

    @PutMapping
    public Courses updateCourse(@RequestBody Courses course) {
        return this.courseService.updateCourse(course);
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<HttpStatus> deleteCourse(@PathVariable String courseId) {
        try {
            this.courseService.deleteCourse(Long.parseLong(courseId));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/about")
    public String about() {
        return "This is the About page for the Spring Boot API";
    }
    @GetMapping("/contact")
    public String Contact() {
        return "This is the Contact page for the Spring Boot API";
    }
}

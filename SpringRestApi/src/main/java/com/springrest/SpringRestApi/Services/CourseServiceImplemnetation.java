package com.springrest.SpringRestApi.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springrest.SpringRestApi.Dao.CourseDao;
import com.springrest.SpringRestApi.Entity.Courses;

@Service
public class CourseServiceImplemnetation implements CourseServices {
    
    @Autowired
    private CourseDao courseDao;

    @Override
    public List<Courses> getCourses() {
        return courseDao.findAll();
    }

    @Override
    public Courses getCourse(long courseId) {
        return courseDao.findById(courseId).orElseThrow(() -> 
            new RuntimeException("Course not found with id: " + courseId)
        );
    }

    @Transactional
    @Override
    public Courses addCourse(Courses course) {
        return courseDao.save(course);
    }

    @Transactional
    @Override
    public Courses updateCourse(Courses course) {
        return courseDao.save(course);
    }

    @Transactional
    @Override
    public void deleteCourse(Long courseId) {
        Courses entity = courseDao.findById(courseId).orElseThrow(() -> 
            new RuntimeException("Course not found with id: " + courseId)
        );
        courseDao.delete(entity);
    }
}

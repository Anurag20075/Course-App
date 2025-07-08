package com.springrest.SpringRestApi.Services;

import java.util.List;

import com.springrest.SpringRestApi.Entity.Courses;

public interface CourseServices {
	public List<Courses>getCourses();
	
	public Courses getCourse(long courseId);

	public Courses addCourse(Courses course);

	public Courses updateCourse(Courses course);

	public void deleteCourse(Long courseId);
}

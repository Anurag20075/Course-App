package com.springrest.SpringRestApi.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.springrest.SpringRestApi.Entity.Courses;  
public interface CourseDao  extends JpaRepository<Courses, Long>{
	
}

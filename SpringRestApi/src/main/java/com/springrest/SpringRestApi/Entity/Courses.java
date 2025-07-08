	package com.springrest.SpringRestApi.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
@Entity
public class Courses {

			@Id
			private long id;
			private String title;
			private String description;
			public Courses() {
			  
			}
			public Courses(long id, String title, String description) {
				super();
				this.setId(id);
				this.setTitle(title);
				this.setDescription(description);
			}
			public long getId() {
				return id;
			}
			public void setId(long id) {
				this.id = id;
			}
			public String getTitle() {
				return title;
			}
			public void setTitle(String title) {
				this.title = title;
			}
			public String getDescription() {
				return description;
			}
			public void setDescription(String description) {
				this.description = description;
			}
			@Override
			public String toString() {
				return "Course [id=" + id + ", title=" + title + ", description=" + description + "]";
			}
		}

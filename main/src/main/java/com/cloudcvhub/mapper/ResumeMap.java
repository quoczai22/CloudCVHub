package com.cloudcvhub.mapper;

import com.cloudcvhub.dto.Request.ResumeRequest;
import com.cloudcvhub.dto.Response.ResumeResponse;
import com.cloudcvhub.model.Resume;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ResumeMap {

    @Mapping(source = "content", target = "description")
    Resume toResume(ResumeRequest resumeRequest);

    @Mapping(source = "description", target = "content")
    @Mapping(target = "state", expression = "java(resume.getDeleted() ? \"DELETED\" : \"ACTIVE\")")
    ResumeResponse toResponse(Resume resume);

    @Mapping(source = "content", target = "description")
    void updateResume(ResumeRequest resumeRequest, @MappingTarget Resume resume);

}

package com.cloudcvhub.mapper;

import com.cloudcvhub.dto.Response.ResumeVersionResponse;
import com.cloudcvhub.model.ResumeVersion;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ResumeVersionMap {

    ResumeVersionResponse toResponse(ResumeVersion resumeVersion);
}

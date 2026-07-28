package com.cloudcvhub.mapper;

import com.cloudcvhub.dto.Request.RegisterRequest;
import com.cloudcvhub.dto.Response.UserResponse;
import com.cloudcvhub.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMap {

    @Mapping(source = "fullName", target = "fullname")
    @Mapping(target = "password", ignore = true)
    User toUser(RegisterRequest request);

    UserResponse toResponse(User user);
}

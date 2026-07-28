package com.cloudcvhub.mapper;

import com.cloudcvhub.dto.Response.ShareLinkResponse;
import com.cloudcvhub.model.ShareLink;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ShareLinkMap {

    @Mapping(source = "token", target = "shareCode")
    @Mapping(source = "expiredAt", target = "expiresAt")
    @Mapping(target = "shareUrl", expression = "java(\"/share/\" + shareLink.getToken())")
    @Mapping(target = "hasPassword", expression = "java(shareLink.getPasswordHash() != null && !shareLink.getPasswordHash().isBlank())")
    @Mapping(target = "state", expression = "java(shareLink.getActive() ? \"ACTIVE\" : \"INACTIVE\")")
    ShareLinkResponse toResponse(ShareLink shareLink);
}

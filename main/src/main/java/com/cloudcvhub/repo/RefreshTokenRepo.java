package com.cloudcvhub.repo;

import com.cloudcvhub.model.User;
import com.cloudcvhub.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface RefreshTokenRepo extends  JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUser(User user); // thu hoi toan bo token sau khi user dang xuat
}

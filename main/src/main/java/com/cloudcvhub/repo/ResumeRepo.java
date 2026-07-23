package com.cloudcvhub.repo;

import com.cloudcvhub.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface ResumeRepo extends JpaRepository<Resume,Long> {
    List<Resume> findByUserIdAndIsDeletedFalse(Long userId); // lay danh sach CV cua user chua bi xoa mem
    Optional<Resume> findByIdAndUserIdAndIsDeletedFalse(Long id, Long userId);
}

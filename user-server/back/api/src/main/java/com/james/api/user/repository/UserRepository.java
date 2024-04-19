package com.james.api.user.repository;
import com.james.api.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUsername(String username);

    @Query("select count(id) as count from users where username = :username")
    Integer existsByUsername(String username); //boolean 타입은 쿼리매소드 작성불가 => count로 대체

//    @Modifying
//    @Query("update users set :id")
//    public void modifyTokenById(@Param("id") Long id);
}

package com.james.api.user.service;
import com.james.api.common.component.Messenger;
import com.james.api.common.service.CommandService;
import com.james.api.common.service.QueryService;
import com.james.api.user.model.User;
import com.james.api.user.model.UserDto;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Optional;
public interface UserService extends CommandService<UserDto>, QueryService<UserDto> {
    // command
    Messenger modify(UserDto user);
    // query
    Messenger login(UserDto param);
    Boolean existsByUsername(String username);
    Optional<User> findUsersByRole(String role);
    Optional<User> findUserByUsername(String username);
    Boolean logout(String accessToken);
    Optional<UserDto> findUserInfo(String username);

    default User dtoToEntity(UserDto dto){
        return User.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .name(dto.getName())
                .age(dto.getAge())
                .email(dto.getEmail())
                .address(dto.getAddress())
                .phone(dto.getPhone())
                .asset(dto.getAsset())
                .mbti(dto.getMbti())
                .InvestmentPropensity(dto.getInvestmentPropensity())
                .role(dto.getRole())
                .build();
    }


    default UserDto entityToDto(User ent) {
        return UserDto.builder()
                .id(ent.getId())
                .username(ent.getUsername())
                .password(ent.getPassword())
                .name(ent.getName())
                .age(ent.getAge())
                .email(ent.getEmail())
                .address(ent.getAddress())
                .phone(ent.getPhone())
                .asset(ent.getAsset())
                .mbti(ent.getMbti())
                .InvestmentPropensity(ent.getInvestmentPropensity())
                .role(ent.getRole())
                .regDate(ent.getRegDate().toString())
                .modDate(ent.getModDate().toString())
                .build();
    }



}



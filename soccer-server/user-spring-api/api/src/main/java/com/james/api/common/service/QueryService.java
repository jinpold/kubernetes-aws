package com.james.api.common.service;

import com.james.api.common.component.PageRequestVo;
import org.springframework.data.domain.Example;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface QueryService<T> {

    List<T> findAll() throws SQLException;
    Optional<T> findById(Long id);
    Long count();
    boolean existsById(Long id);}

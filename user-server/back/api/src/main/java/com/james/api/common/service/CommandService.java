package com.james.api.common.service;

import com.james.api.article.model.ArticleDto;
import com.james.api.common.component.Messenger;

public interface CommandService<T> {

    Messenger save (T t);
    Messenger deleteById (Long id);
    Messenger modify (T t);
}

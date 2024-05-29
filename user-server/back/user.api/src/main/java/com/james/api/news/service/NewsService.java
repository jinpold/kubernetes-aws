//package com.james.api.news.service;
//import com.james.api.news.model.News;
//import com.james.api.news.model.NewsDto;
//
//import java.io.IOException;
//import java.util.List;
//
//
//public interface NewsService {
//
//    List<News> save(List<News> NewsS) throws IOException;
//
//    default News dtoToEntity(NewsDto dto) {
//        return News.builder()
//                .id(dto.getId())
//                .subject(dto.getSubject())
//                .content(dto.getContent())
//                .build();
//    }
//    default NewsDto entityToDto(News news){
//        return NewsDto.builder()
//                .id(news.getId())
//                .subject(news.getSubject())
//                .content(news.getSubject())
//                .build();
//    }
//}




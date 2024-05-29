//package com.james.api.news.service;
//import com.james.api.news.model.News;
//import com.james.api.news.model.NewsDto;
//import com.james.api.news.repository.NewsRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
//import org.jsoup.nodes.Element;
//import org.jsoup.select.Elements;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Iterator;
//import java.util.List;
//
//@RequiredArgsConstructor
//@Service
//@Slf4j
//public class NewsServiceImpl implements NewsService {
//
//    private final NewsRepository newsRepository;
//
//    public List<NewsDto> findAll() {
//        return newsRepository.findAll().stream().map(i->entityToDto(i)).toList();
//    }
//
//    @Override
//    public List<News> save(List<News> NewsS) throws IOException {
//        List<News> ls = new ArrayList<>();
//        for (int page = 1; page <= 10; page++) {
//            Document doc = Jsoup.connect("https://www.koreanbar.or.kr/pages/search/search1.asp?sido1=&gun1=&dong1=&special1_1=&special1=1&searchtype=mname&searchstr=&page=" + page).timeout(10 * 1000).get();
//            Elements elems = doc.select("div.board_listW");
//            Iterator<Element> name = elems.iterator();
//            Iterator<Element> subject = elems.select("td.subject").iterator();
//
//            while (name.hasNext() && subject.hasNext()) {
//                String nameS = name.next().selectFirst("a").text();
//                String subjectS = subject.next().text();
//                String subjectSS = subjectS.replaceAll("\\(.*?\\)", "");
//
//                News news = News.builder()
//
//                ls.add(news);
//
//                System.out.println("뉴스: " +  );
//                System.out.println("주가 제목: " + subjectSS);
//                System.out.println("주가 정보: " + );
//                System.out.println("----------");
//            }
//
//            newsRepository.saveAll(ls);
//        }
//        return ls;
//    }
//}

package com.james.api.crawler.service;
import com.james.api.crawler.model.Crawler;
import java.io.IOException;
import java.util.List;
import java.util.Map;


public interface CrawlerService {
    List<Crawler> findNews() throws IOException;
}
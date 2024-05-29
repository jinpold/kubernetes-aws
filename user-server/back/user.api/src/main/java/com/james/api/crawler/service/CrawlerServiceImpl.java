package com.james.api.crawler.service;
import com.james.api.crawler.model.Crawler;
import com.james.api.crawler.repository.CrawlerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.List;


@RequiredArgsConstructor
@Service
public class CrawlerServiceImpl implements CrawlerService {
    private final CrawlerRepository crawlerRepository;

    @Override
    public List<Crawler> findNews() throws IOException {
        return crawlerRepository.findNews();
    }
}
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SeChartPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news'); // 실제 API 엔드포인트로 변경 필요
        setNews(response.data);
      } catch (error) {
        console.error('뉴스 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', color: '#333', maxWidth: '800px', margin: 'auto' }}>
      <div>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>NEWS</h1>
      </div>
      <div className="news-container" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', backgroundColor: '#fff', height: '600px', overflowY: 'scroll' }}>
        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{}</h2>
              <p style={{ fontSize: '14px', color: '#666' }}>{}</p>
            </div>
          ))
        ) : (
          <p>뉴스 데이터를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
}
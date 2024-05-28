'use client'

import { useEffect, useRef } from 'react';

export default function SeChartPage() {

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = "/pages/jusik/SE/news/test.html";
    }
  }, []);

  return (
    <div>
      <div>
        dfdfdf
      </div>
      <div className="border" 
           style={{ margin: 'auto', position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        <iframe ref={iframeRef} width="1600px" height="100%"></iframe>
      </div>
    </div>
  );
}
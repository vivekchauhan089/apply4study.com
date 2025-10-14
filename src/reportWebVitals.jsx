const sendToGA = (metric) => {
  if (!window.gtag) return;

  window.gtag('event', metric.name, {
    event_category: 'Web Vitals',
    // Convert to integers if needed
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_label: metric.id,
    non_interaction: true,
  });
};

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(sendToGA);
      getFID(sendToGA);
      getFCP(sendToGA);
      getLCP(sendToGA);
      getTTFB(sendToGA);

      /*getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);*/
    });
  }
};

export default reportWebVitals;

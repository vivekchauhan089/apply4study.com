import React from 'react';
import './StatsSection.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const statsData = [
  {
    icon: 'bi-mortarboard',
    number: 1.3,
    suffix: 'M+',
    label: 'Students Helped',
    color: '#0d6efd'
  },
  {
    icon: 'bi-globe',
    number: 140000,
    suffix: '+',
    label: 'Global Programs',
    color: '#dc3545'
  },
  {
    icon: 'bi-bank',
    number: 1500,
    suffix: '+',
    label: 'Institutions Globally',
    color: '#20c997'
  },
  {
    icon: 'bi-flag',
    number: 150,
    suffix: '+',
    label: 'Nationalities',
    color: '#fd7e14'
  },
  {
    icon: 'bi-person',
    number: 10,
    suffix: '+',
    label: 'Years of Expertise',
    color: '#6610f2'
  }
];

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <div className="stats-section light-background section">
      <h2 className="text-center mb-5">
        The Fastest and Easiest Way<br />to Successfully Study Abroad
      </h2>
      <div className="stats-grid" ref={ref}>
        {statsData.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <div className="icon-box" style={{ backgroundColor: stat.color }}>
              <i className={`bi ${stat.icon}`}></i>
            </div>
            <h3 style={{ color: stat.color }}>
              {inView ? <CountUp end={stat.number} duration={2} suffix={stat.suffix} /> : 0}
            </h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;

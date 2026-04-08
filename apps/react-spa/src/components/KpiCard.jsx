import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KpiCard({ data, index }) {
  const isPositive = data.change > 0;
  const maxVal = Math.max(...data.sparkline);

  return (
    <div className={`card kpi-card animate-in stagger-${index + 1}`}>
      <div className="kpi-card-header">
        <span className="kpi-card-label">{data.label}</span>
        <span className={`kpi-card-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{data.change}%
        </span>
      </div>
      <div className="kpi-card-value">{data.value}</div>
      <div className="kpi-card-period">{data.period}</div>
      <div className="kpi-sparkline">
        {data.sparkline.map((val, i) => (
          <div
            key={i}
            className="kpi-sparkline-bar"
            style={{ height: `${(val / maxVal) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

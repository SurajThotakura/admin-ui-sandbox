import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { topProducts } from '../data/mockData';

const TrendIcon = ({ trend }) => {
  if (trend === 'up') return <span className="product-trend up"><TrendingUp size={13} /></span>;
  if (trend === 'down') return <span className="product-trend down"><TrendingDown size={13} /></span>;
  return <span className="product-trend stable"><Minus size={13} /></span>;
};

export default function TopProducts() {
  return (
    <div className="card animate-in stagger-6">
      <div className="card-header">
        <div>
          <div className="card-title">Top Products</div>
          <div className="card-subtitle">By page views this week</div>
        </div>
        <button className="card-action">All products</button>
      </div>
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th style={{ width: 36 }}>#</th>
              <th>Product</th>
              <th>Views</th>
              <th>Conv. Rate</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p) => (
              <tr key={p.rank}>
                <td>
                  <div className={`product-rank${p.rank <= 3 ? ' gold' : ''}`}>
                    {p.rank}
                  </div>
                </td>
                <td>
                  <div className="product-name">{p.name}</div>
                  <div className="product-category">{p.category}</div>
                </td>
                <td style={{ fontVariantNumeric: 'tabular-nums' }}>{p.views}</td>
                <td className="product-conversion">
                  {p.conversions}
                  <TrendIcon trend={p.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

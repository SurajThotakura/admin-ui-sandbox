export const trafficData = [
  { day: 'Mon', visitors: 245000, pageViews: 892000 },
  { day: 'Tue', visitors: 268000, pageViews: 945000 },
  { day: 'Wed', visitors: 232000, pageViews: 812000 },
  { day: 'Thu', visitors: 289000, pageViews: 1023000 },
  { day: 'Fri', visitors: 312000, pageViews: 1145000 },
  { day: 'Sat', visitors: 398000, pageViews: 1456000 },
  { day: 'Sun', visitors: 356000, pageViews: 1298000 },
];

export const kpiCards = [
  {
    id: 'visitors',
    label: 'Active Users',
    value: '2.1M',
    change: +12.4,
    period: 'vs last week',
    sparkline: [65, 72, 68, 80, 74, 92, 85],
  },
  {
    id: 'orders',
    label: 'Transactions',
    value: '48,291',
    change: +8.7,
    period: 'vs last week',
    sparkline: [40, 45, 42, 55, 50, 62, 58],
  },
  {
    id: 'revenue',
    label: 'Revenue (USD)',
    value: '$2.4M',
    change: +5.2,
    period: 'vs last week',
    sparkline: [50, 48, 55, 52, 60, 58, 65],
  },
  {
    id: 'returns',
    label: 'Error Rate',
    value: '3.2%',
    change: -0.4,
    period: 'vs last week',
    sparkline: [20, 22, 18, 19, 17, 16, 15],
  },
];

export const topProducts = [
  { rank: 1, name: 'User Auth Module', category: 'Identity', views: '1.2M', conversions: '18.4%', trend: 'up' },
  { rank: 2, name: 'API Gateway', category: 'Infrastructure', views: '980K', conversions: '22.1%', trend: 'up' },
  { rank: 3, name: 'Webhook Service', category: 'Integration', views: '845K', conversions: '15.7%', trend: 'down' },
  { rank: 4, name: 'Rate Limiter', category: 'Security', views: '723K', conversions: '31.2%', trend: 'up' },
  { rank: 5, name: 'Cache Layer', category: 'Performance', views: '698K', conversions: '12.8%', trend: 'stable' },
  { rank: 6, name: 'Data Pipeline', category: 'Analytics', views: '654K', conversions: '19.3%', trend: 'up' },
  { rank: 7, name: 'Log Aggregator', category: 'Observability', views: '612K', conversions: '24.6%', trend: 'down' },
];

export const siteHealthMetrics = [
  { label: 'Uptime', value: '99.97%', status: 'good' },
  { label: 'Avg Load Time', value: '1.8s', status: 'good' },
  { label: 'Error Rate', value: '0.12%', status: 'good' },
  { label: 'Cache Hit Ratio', value: '94.2%', status: 'warning' },
  { label: 'API Latency', value: '142ms', status: 'good' },
  { label: 'Failed Auth Attempts', value: '68.4%', status: 'critical' },
];

export const regionData = [
  { region: 'North America', orders: 12400, revenue: '$8.2M', share: 24 },
  { region: 'Europe', orders: 9800, revenue: '$6.8M', share: 19 },
  { region: 'APAC', orders: 8200, revenue: '$5.9M', share: 16 },
  { region: 'Latin America', orders: 6100, revenue: '$4.1M', share: 12 },
  { region: 'Middle East', orders: 5400, revenue: '$3.6M', share: 10 },
  { region: 'Other', orders: 6391, revenue: '$5.9M', share: 19 },
];

export const recentAlerts = [
  { id: 1, type: 'warning', message: 'API request rate approaching 90% of threshold limit', time: '12 min ago' },
  { id: 2, type: 'info', message: 'Scheduled maintenance window: Apr 8, 02:00–04:00 UTC', time: '1 hr ago' },
  { id: 3, type: 'critical', message: 'Auth success rate dropped below 98% — investigation needed', time: '2 hr ago' },
  { id: 4, type: 'success', message: 'v2.4.1 feature deployment completed successfully to production', time: '3 hr ago' },
  { id: 5, type: 'info', message: 'A/B test "simplified-nav-v2" reached statistical significance', time: '5 hr ago' },
];

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useSkillCategoryScore } from '../hooks/useSkillCategoryScore';

export default function SkillScoreChart() {
  const data = useSkillCategoryScore();

  return (
    <div className="w-full h-80 bg-white dark:bg-gray-900 rounded-xl shadow p-4 mt-12">
      <h2 className="text-xl font-bold mb-4">
        カテゴリ別スキルスコア（グラフ）
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 40, right: 20, top: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 'dataMax + 20']} />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip formatter={(value: number) => value.toFixed(2) + '点'} />
          <Bar
            dataKey="total"
            fill="#2563eb"
            barSize={24}
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

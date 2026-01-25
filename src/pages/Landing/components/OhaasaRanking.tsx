import { useEffect, useState } from "react";

type RankingItem = {
  rank: number;
  sign: string;
};

const OhaasaRanking = () => {
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ohaasa")
      .then((res) => res.json())
      .then((data) => {
        setRanking(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>오늘의 운세 순위 불러오는 중…</p>;
  }

  if (ranking.length === 0) {
    return <p>오늘의 운세 정보를 가져오지 못했어요 😢</p>;
  }

  return (
    <ul>
      {ranking.map((item) => (
        <li key={item.rank}>
          {item.rank}위 · {item.sign}
        </li>
      ))}
    </ul>
  );
};

export default OhaasaRanking;

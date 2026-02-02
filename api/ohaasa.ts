import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";

type HoroscopeDetail = {
  ranking_no: string;
  horoscope_st: string;
};

type HoroscopeEntry = {
  onair_date: string;
  detail: HoroscopeDetail[];
};

// 전역 캐시
let cachedData: { rank: number; signId: string }[] | null = null;
let lastFetchedKey: string | null = null;

// 7시 기준 날짜 계산 함수
const getOhaasaDayKey = () => {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9
  if (kst.getHours() < 7) {
    kst.setDate(kst.getDate() - 1);
  }
  return kst.toISOString().slice(0, 10); // "YYYY-MM-DD"
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const todayKey = getOhaasaDayKey();

    // 이미 오늘 데이터 가져왔으면 캐시 사용
    if (cachedData && lastFetchedKey === todayKey) {
      // console.log("캐시 사용:", todayKey);
      return res.status(200).json(cachedData);
    }

    // console.log("오하아사 운세 새로 갱신:", todayKey);

    const url = "https://www.asahi.co.jp/data/ohaasa2020/horoscope.json";
    const response = await axios.get<HoroscopeEntry[]>(url);

    // 최신 날짜 1개만
    const latest = response.data.sort(
      (a, b) => Number(b.onair_date) - Number(a.onair_date),
    )[0];

    const result = latest.detail.map((item) => ({
      rank: Number(item.ranking_no),
      signId: item.horoscope_st,
    }));

    // 캐시 저장
    cachedData = result;
    lastFetchedKey = todayKey;

    res.status(200).json(result);
  } catch (e) {
    console.error("ohaasa crawl error:", e);
    res.status(200).json(cachedData ?? []);
  }
}

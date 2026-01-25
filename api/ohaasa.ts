import axios from "axios";
import * as cheerio from "cheerio";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = "https://www.tv-asahi.co.jp/goodmorning/uranai/";

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(response.data);

    const ranking: { rank: number; sign: string }[] = [];

    $(".rank-box li").each((index, el) => {
      const sign = $(el).find("span").first().text().trim();

      ranking.push({
        rank: index + 1,
        sign,
      });
    });

    res.status(200).json(ranking);
  } catch (error) {
    console.error(error);
    res.status(200).json([]); // ❗ 프론트 map 안 터지게
  }
}

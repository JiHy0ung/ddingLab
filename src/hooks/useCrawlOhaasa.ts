// import axios from "axios";
// import * as cheerio from "cheerio";

// export async function crawlOhaasaRanking() {
//   const url = "https://www.tv-asahi.co.jp/goodmorning/uranai/";

//   const res = await axios.get(url, {
//     headers: {
//       "User-Agent": "Mozilla/5.0",
//     },
//   });

//   const $ = cheerio.load(res.data);

//   const result: {
//     rank: number;
//     sign: string;
//     label: string;
//   }[] = [];

//   $(".rank-box li").each((index, el) => {
//     const rank = index + 1;

//     const sign = $(el)
//       .find("span")
//       .first()
//       .text()
//       .trim();

//     const label = $(el)
//       .find("a")
//       .attr("data-label");

//     result.push({
//       rank,
//       sign,
//       label: label ?? "",
//     });
//   });

//   return result;
// }

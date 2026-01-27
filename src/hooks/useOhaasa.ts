import { useEffect, useState } from "react";
import axios from "axios";

export type OhaasaRank = {
  rank: number;
  signId: string;
};

export const useOhaasa = () => {
  const [data, setData] = useState<OhaasaRank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<OhaasaRank[]>("/api/ohaasa")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("ohaasa fetch error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading };
};

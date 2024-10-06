import { useEffect, useState } from 'react';

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        setData(response);
      } catch (err) {
        setErr(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, err, loading };
}

import { useEffect } from "react";
import { useParams } from "react-router";

const ShortUrlPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    if (!shortcode) return;

    window.location.replace(
      `${import.meta.env.VITE_API_URL}/api/v1/get_url/${shortcode}`
    );
  }, [shortcode]);

  return <h2>Redirecting...</h2>;
};

export default ShortUrlPage;
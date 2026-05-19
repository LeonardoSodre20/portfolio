import { useState, useEffect } from "react";

export function useTyping(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = words[wi];
    const delay = del ? speed / 2 : ci === cur.length ? pause : speed;
    const t = setTimeout(() => {
      if (!del && ci < cur.length) {
        setDisplay(cur.slice(0, ci + 1));
        setCi((c) => c + 1);
      } else if (!del) {
        setDel(true);
      } else if (del && ci > 0) {
        setDisplay(cur.slice(0, ci - 1));
        setCi((c) => c - 1);
      } else {
        setDel(false);
        setWi((w) => (w + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);

  return display;
}

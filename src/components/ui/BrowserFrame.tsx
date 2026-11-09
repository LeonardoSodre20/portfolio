interface BrowserFrameProps {
  src: string;
  alt: string;
}

export function BrowserFrame({ src, alt }: BrowserFrameProps) {
  return (
    <div className="browser-frame">
      <div className="browser-frame__bar" aria-hidden="true">
        <span /><span /><span />
      </div>
      <img src={src} alt={alt} className="browser-frame__img" />
    </div>
  );
}

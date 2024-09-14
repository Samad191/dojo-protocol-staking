// takes and render image in <img /> tag

// define type of Image props
type ImageProps = {
  src: string;
  alt: string;
  sx?: React.CSSProperties;
  loading?: "eager" | "lazy";
};

const Image = ({ src, alt, sx, loading }: ImageProps) => {
  return <img src={src} alt={alt} style={sx} loading={loading} />;
};

export default Image;

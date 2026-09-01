export default function imageLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const basePath = process.env.NODE_ENV === 'production' ? '/jikji' : '';
  return `${basePath}${src}`;
}

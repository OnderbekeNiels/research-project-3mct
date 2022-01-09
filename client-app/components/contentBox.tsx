export default function ContentBox({ children, className }: any) {
  return <article className={`p-4 bg-gray-200 shadow-sm rounded-3xl ${className}`}>{children}</article>;
}

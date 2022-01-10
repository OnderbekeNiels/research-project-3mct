export default function ContentBox({ children, className, onClick=()=>{} }: any) {
  return <article onClick={() => onClick()} className={`p-4 bg-gray-200 shadow-sm rounded-3xl ${className}`}>{children}</article>;
}

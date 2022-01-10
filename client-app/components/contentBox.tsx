export default function ContentBox({ children, className, onClick=()=>{} }: any) {
  return <article onClick={() => onClick()} className={`p-4 bg-white shadow-md rounded-3xl ${className}`}>{children} </article>;
}

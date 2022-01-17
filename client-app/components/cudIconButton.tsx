export default function CudIconButton({children, onClick, className}: any){
    return (
      <button onClick={(e)=> {onClick(e)}} className={`rounded-full bg-gray-100 p-2 hover:bg-gray-800 hover:text-white transition-all duration-200 ease-out ${className}`}>
          {children}
      </button>
    );
}
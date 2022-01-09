export interface TagType{
    tagName: string,
    link?: string
}


export default function Tag({tagName}: TagType) {
  return(
  <button className="p-2 bg-orange-50 rounded-md text-xs">
    <p className="font-semibold text-orange-600">{tagName}</p>
  </button>)
}

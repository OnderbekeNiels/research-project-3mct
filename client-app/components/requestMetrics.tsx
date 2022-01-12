import { useRecoilState } from "recoil";
import { requestState } from "../utils/store";

export default function RequestMetrics() {

    const [request, setRequest] = useRecoilState(requestState);
  return (
    <aside className="fixed bottom-8 left-0 right-0 p-4 bg-gray-800/75 backdrop-blur-lg w-full max-w-xl mx-auto text-white rounded-md z-50">
      <h1 className="text-lg text-center mb-2 font-semibold">GraphQL fetch</h1>
      <div className="grid grid-cols-2 text-center">
        <p>Request name: {request.requestName}</p>
        <p>Response time: {request.requestTime} ms</p>
        <p>Response size: {Math.round(request.requestSize * 100) / 100} kB</p>
        <p>Request nesting level: {request.requestNestingLevel} trees</p>
      </div>
    </aside>
  );
}

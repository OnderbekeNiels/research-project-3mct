import { useRecoilState } from "recoil";
import { requestState } from "../utils/store";

interface RequestMetricsArgs {
  isVisible: boolean
}

export default function RequestMetrics({isVisible}: RequestMetricsArgs) {

    const [request, setRequest] = useRecoilState(requestState);
  return (
    <>
      <aside className={`fixed top-24 left-0 right-0 p-4 bg-gray-800/75 backdrop-blur-lg w-full max-w-xl mx-auto text-white rounded-md z-50 transition-all delay-100 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <h1 className="text-lg text-center mb-2 font-semibold">
          GraphQL fetch
        </h1>
        <div className="grid grid-cols-2 text-center mb-4">
          <p>Request name: {request.requestName}</p>
          <p>Mount till loaded: {request.responseTime} ms</p>
          <p>
            Response size: {Math.round(request.responseSize * 100) / 100} kB
          </p>
          <p>
            Request nesting level: {request.requestNestingLevel} tree
            {request.requestNestingLevel > 1 && "s"}
          </p>
        </div>
      </aside>
    </>
  );
}

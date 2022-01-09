export default function Header() {
  return (
    <header className="grid place-items-center p-5 shadow-md bg-white/50 backdrop-blur-md text-gray-900">
      <div className="max-w-5xl w-full flex items-center justify-center">
        <div className="flex items-center justify-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10"
            viewBox="0 0 40.517 48"
          >
            <g
              id="Group_1"
              data-name="Group 1"
              transform="translate(-22.6 -14.9)"
            >
              <path
                id="Path_10"
                data-name="Path 10"
                d="M56.854,83.459V70.6h4.268V87.727H22.6V70.6h4.268V83.459Z"
                transform="translate(0 -24.827)"
                fill="#bcbbbb"
              />
              <path
                id="Path_11"
                data-name="Path 11"
                d="M38.443,44.554l20.952,4.379.887-4.212L39.33,40.341Zm2.771-9.977,19.4,9.035,1.774-3.88-19.4-9.09-1.774,3.935Zm5.376-9.533L63.053,38.734l2.716-3.27L49.307,21.773l-2.716,3.27ZM57.233,14.9,53.8,17.45,66.545,34.632l3.436-2.55ZM38,54.309H59.395V50.041H38Z"
                transform="translate(-6.864)"
                fill="#f48023"
              />
            </g>
          </svg>
          <div className="text-xl">
            <p className="inline">stack</p>
            <p className="ml-1 font-bold inline">overflow</p>
          </div>
        </div>
      </div>
    </header>
  );
}


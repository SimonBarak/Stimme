import React from "react";
import PropTypes from "prop-types";

interface Props {
  isLoading: boolean;
}

const Loading: React.FC<Props> = ({ isLoading }) => {
  return (
    <div
      className={`${
        isLoading ? "inline-block" : "hidden"
      } loading w-36 relative flex justify-between items-center px-1`}
    >
      <div className="w-3 h-3 md:w-5 md:h-5 lg:w-10 lg:h-10 rounded-full "></div>
      <div className="w-3 h-3 md:w-5 md:h-5 lg:w-10 lg:h-10 rounded-full "></div>
    </div>
  );
};

export default Loading;

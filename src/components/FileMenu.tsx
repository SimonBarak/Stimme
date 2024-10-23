import React from "react";
import PropTypes from "prop-types";
import { Button } from "@radix-ui/themes";

interface Props {}

const FileMenu: React.FC<Props> = ({}) => {
  return (
    <div className="border-b">
      <div className="label p-4">Download</div>
      <div className="flex flex-wrap gap-2 py-2 px-4">
        <Button variant="solid" className="px-2 py-2 bg-slate-200 rounded-lg">
          SSML
        </Button>
        <Button variant="solid" className="px-2 py-2 bg-slate-200 rounded-lg">
          JSON
        </Button>
      </div>
    </div>
  );
};

export default FileMenu;

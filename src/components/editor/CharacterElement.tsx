import { RenderElementProps } from "slate-react";

const CharacterElement = ({ element, children }: RenderElementProps) => {
  const { voice } = element;
  if (voice) {
    const emotion = element.emotion ?? "normal";
    return (
      <div className="flex flow-row mb-5">
        <div className="flex items-center text-sm opacity-50 w-20">
          {emotion != "normal" ? (
            <div className="-">{`${element.voice} ${emotion}`}</div>
          ) : (
            <div className="-">{`${element.voice}`}</div>
          )}
        </div>
        <div className="flex-1 ml-4">{children}</div>
      </div>
    );
  } else {
    return (
      <div className="flex flow-row mb-5 ml-10">
        <div className="flex items-center"></div>
        <div className="flex-1">{children}</div>
      </div>
    );
  }
};

export default CharacterElement;

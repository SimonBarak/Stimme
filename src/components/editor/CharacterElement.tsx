import { CustomRenderElementProps } from "../stimmeEditor";

const CharacterElement = (props: CustomRenderElementProps) => {
  const voice = props.element.voice;
  const voiceClass = voice.toLowerCase();
  return (
    <div className={`flex flow-row mb-5 voice-label ${voiceClass}`}>
      <p {...props.attributes} className="flex-1 ml-4">
        {props.children}
      </p>
    </div>
  );
};

// const CharacterElement = ({ element, children }: RenderElementProps) => {
//   const voice = element.type;

//   if (voice) {
//     const voiceClass = voice.toLowerCase();
//     return (
//       <div className={`flex flow-row mb-5 voice-label ${voiceClass}`}>
//         <div className="flex-1 ml-4">{children}</div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="flex flow-row mb-5 ml-10">
//         <div className="flex items-center"></div>
//         <div className="flex-1">{children}</div>
//       </div>
//     );
//   }
// };

export default CharacterElement;

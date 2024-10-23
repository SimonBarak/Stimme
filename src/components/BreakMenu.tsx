import { Button } from "@radix-ui/themes";

interface BreakMenuProps {
  insertSpecialCharacter: (input: number) => void;
}

const BreakMenu: React.FC<BreakMenuProps> = ({ insertSpecialCharacter }) => {
  const brakes = [0.2, 0.4, 0.8, 1, 2, 4, 6, 8, 12, 20];

  return (
    <div className="pb-6">
      <div className="label p-4">Breaks</div>

      <div className="flex flex-wrap gap-1 px-4">
        {brakes.map((value) => (
          <Button
            className="w-9 h-9 bg-slate-200 rounded text-center text-xs"
            variant="solid"
            onClick={() => insertSpecialCharacter(value)}
            key={value}
          >
            {value}
          </Button>
        ))}
      </div>

      {/* {brakes.map( (break) => (<Button onClick={() => insertSpecialCharacter(8)} variant="outline">
          8s
        </Button>)})} */}
    </div>
  );
};

export default BreakMenu;

import Image from "next/image";
import { ReactNode } from "react";
import { Edit3 } from "react-feather";

const Empty = ({ title, size = 300 }: { title?: ReactNode; size?: number }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className={`w-full flex justify-center items-center m-10 `}>
        <Image
          src={"/empty.svg"}
          alt="Unavailable"
          width={size}
          height={size}
        />
      </div>
      <div>
        <p className="text-base text-center">{title}</p>
      </div>
    </div>
  );
};

export default Empty;

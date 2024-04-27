import React from "react";
import ProjectCard from "./card";
import { ROUTES } from "@/components/utils/constants";
import { useRouter } from "next/navigation";

export default function ProjectList({ list }: any) {
  const router = useRouter();
  const onCardClick = (id: any) => {
    router.push(ROUTES.PROJECT.replace("[project]", id));
  };

  return (
    <div className="flex ">
      {list?.map((item: any) => (
        <div key={item?.id} className="mr-4">
          <ProjectCard project={item} key={item.id} onCardClick={onCardClick} />
        </div>
      ))}
    </div>
  );
}

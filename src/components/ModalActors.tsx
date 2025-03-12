import { useEffect, useState } from "react";
import { getMovieCredits } from "../services/api";
import { IActors, ModalDetailProps } from "../@types";
import { Dropdown } from "antd";



const ActorsModal: React.FC<ModalDetailProps>(id: number) => {
  const [actors, setActors] = useState<IActors[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
        try {
          const data = await getMovieCredits(Number(id));
          setActors(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des acteurs :", error);
        }
      };
      fetchActors();
  }, [id]);

 

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
       <div className=" p-6 rounded-lg w-full w-[100vw] h-[90vh] overflow-y-auto">
      Actors: 
      {actors.map(actor => 
        (<p key={actor.credit_id} className="place-items-center">
          {actor.name}
        </p>))}
        </div>
    </div>
  )
};

export default ActorsModal;
import { useEffect, useState } from "react";
import { getMovieCredits } from "../services/api";
import { IActors } from "../@types";

const ModalActors: React.FC<ModalProps> = ({ isOpen, onClose, id }) => {
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
    <ul> 
      Actors: 
      {actors.map(actor => 
        (<li key={actor.credit_id} className="place-items-center">
          {actor.name}
        </li>))}
    </ul>
  )
};

export default ModalActors;
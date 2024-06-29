import { CardAdmin } from "@/src/data/test/data";

interface Props {
  item: CardAdmin;
}

const Card: React.FC<Props> = ({ item }) => {
  return (
    <div className="bg-white p-5 rounded-lg flex flex-col sm:flex-row items-center gap-5 cursor-pointer w-full hover:bg-gray-300">
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto">
        <div className="flex flex-col  text-center">
          <span className="text-lg sm:text-xl">{item.title}</span>
          <span className="text-sm font-light">
            <span className={item.change > 0 ? "text-lime-700 font-extrabold" : "text-red-500"}>
              {item.change}%
            </span>{" "}
            {item.change > 0 ? "more" : "less"} than previous week
          </span>
        </div>
        <span className="text-xl sm:text-2xl font-bold">{item.number}</span>
      </div>
    </div>
  );
};

export default Card;

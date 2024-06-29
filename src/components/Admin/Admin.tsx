"use client"
import { useState, useEffect } from "react";
import { cards } from "@/src/data/test/data";
import { CardAdmin } from "./CardAdmin";
import { Transactions } from "./Transactions";
import useUserStore from "@/src/store/store";
import { usePathname } from "next/navigation";
import { LoadingSpinner } from "../LoadingSpinner";

const Dashboard = () => {
  const pathname = usePathname();
  const title = pathname ? pathname.split("/").pop() : "Home";
  console.log(title);

  const { setUsers } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = (title !== 'profesor') ? await fetch("/api/usuarios") : await fetch("/api/usuarios/estudiante") ;
      try {
        
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        console.log("holalalaalal");
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-5 mb-5">
      <div className="flex-1 flex flex-col gap-5">
      {
        title !== 'profesor' && (
          <div className="flex flex-col lg:flex-row gap-5 mt-5 items-center justify-center">
            <div className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5 gap-5 bg-blue-400 rounded-md">
                {cards.map((item) => (
                    <CardAdmin item={item} key={item.id} />
                ))}
                </div>
            </div>
        </div>
        )
      }
        {isLoading ? <LoadingSpinner /> : <Transactions />}
        
      </div>
      
    </div>
  );
};

export default Dashboard;


//{!isLoading && <Transactions />}
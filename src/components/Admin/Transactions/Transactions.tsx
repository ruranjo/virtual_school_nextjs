import useUserStore from "@/src/store/store";
import { usePathname } from "next/navigation";

const Transactions = () => {
  const { users } = useUserStore();
  const pathname = usePathname();
  const title = pathname ? pathname.split("/").pop() : "Home";

  return (
    <div className="bg-bgSoft p-5 md:p-10 rounded-md bg-blue-300">
      
      {
        title !== 'profesor' ? (
          <h2 className="mb-6 text-white bg-secondary rounded-md font-extrabold uppercase p-2">Usuarios</h2>
        ):(
          <h2 className="mb-6 text-white bg-blue-500 rounded-md font-extrabold uppercase p-2">Mis Alumnos</h2>
        ) 
      }
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-sm p-3 text-left bg-primary text-white">Name</th>
              <th className="text-sm p-3 text-left bg-primary text-white">Email</th>
              <th className="text-sm p-3 text-left bg-primary text-white">Role</th>
              <th className="text-sm p-3 text-left bg-primary text-white">Phone</th>
              <th className="text-sm p-3 text-left bg-primary text-white">Address</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="text-sm p-3">{user.firstName}</td>
                <td className="text-sm p-3">{user.correo}</td>
                <td className="text-sm p-3">{user.rol.nombre}</td>
                <td className="text-sm p-3">{user.telefono}</td>
                <td className="text-sm p-3">{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;

import { Sidebar } from "@/src/components/Admin/Sidebar";
import { AuthComponent } from "@/src/components/AuthComponent";
import { FooterAdmin } from "@/src/components/FooterAdmin";
import { NavbarAdmin } from "@/src/components/NavbarAdmin";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <AuthComponent>
    <div className="flex flex-col lg:flex-row">
      <div className="bg-primary p-5 h-full lg:h-screen lg:w-1/4">
        <Sidebar isAdmin={true} />
      </div>
      <div className="flex-1 p-5 flex flex-col gap-3">
        <NavbarAdmin isAdmin={true} title="ADMIN" />
        <div className="flex-grow overflow-auto bg-white rounded-md border-[2px] border-gray-300 px-5">
          {children}
        </div>
        <FooterAdmin />
      </div>
    </div>
    </AuthComponent>
  );
};

export default Layout;


/*
 .container {
  display: flex;
}

.menu {
  flex: 1;
  background-color: var(--bgSoft);
  padding: 20px;
  min-height: 100vh;
}

.content {
  flex: 4;
  padding: 20px;
}

.wrapper {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.main {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cards {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.side {
  flex: 1;
}

.
*/
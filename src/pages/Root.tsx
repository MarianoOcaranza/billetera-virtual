import React from "react";
import AccountData from "../components/AccountData";
import UserData from "../components/UserData";

const Root: React.FC = () => {
  const firstName = "Mariano";
  const lastName = "Ocaranza"
  const cvu = "1234"
  const alias = "los.piojos.87"
  const balance = 10000;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row gap-8 items-stretch justify-center bg-[#f5f5f5] px-6 py-10">

      <div className="flex-1 lg:flex-[0.7]">
        <AccountData firstName={firstName} balance={balance} />
      </div>

      <div className="flex-1 lg:flex-[0.3]">
        <UserData firstName={firstName} lastName={lastName} cvu={cvu} alias={alias}/>
      </div>
    </div>
  );
};

export default Root;

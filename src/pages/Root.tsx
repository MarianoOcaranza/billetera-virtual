import React, { useEffect } from "react";
import AccountData from "../components/AccountData";
import UserData from "../components/UserData";
import { useUserStore } from "../stores/userStore";
import { Navigate } from "react-router";

const Root: React.FC = () => {
	const { user, loadingUser, hydrated, getUser } = useUserStore();

	useEffect(() => {
		getUser();
	}, []);

	if (!hydrated || loadingUser) return <p>Por favor, espere...</p>

	if(!user) {
		return <Navigate to='/login'/>
	}

	return (
		<div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row gap-8 items-stretch justify-center px-6 py-10">

			<div className="flex-1 lg:flex-[0.7]">
				<AccountData name={user.name} balance={user.balance} alias={user.alias} onBalanceUpdate={getUser} />
			</div>

			<div className="flex-1 lg:flex-[0.3]">
				<UserData name={user.name} lastName={user.lastname} cvu={user.cvu} alias={user.alias} recentTransactions={user.recentTransactions} />
			</div>
		</div>
	);
};

export default Root;

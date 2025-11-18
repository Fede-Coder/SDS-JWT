import UserMenu from "./UserMenu";

function Header() {
	return (
		<header className="w-full bg-stone-500">
			<div className="m-auto w-6xl max-w-9/10 flex gap-2 justify-between min-h-16 items-center py-1">
				<div className="max-w-[350px]">
				</div>
				<div className="flex gap-2 text-xl">
                    <UserMenu/>
				</div>
			</div>
		</header>
	);
}

export default Header;

import React, { useEffect, useState } from "react";
import styles from "../../../styles/components/sidebar.module.css";
import { useRouter } from "next/router";
import { getUserDetails, removeToken } from "@/pages/api/auth/auth";
import Dashboardicon from "../../../assets/dashboard.svg";
import Payment from "../../../assets/payment.svg";
import Voucher from "../../../assets/voucher.svg";
import Logo from "../../../assets/logo.svg";
import Profile from "../../../assets/profile.svg";
import { useSidebarContext } from "@/pages/context/sidebarContext";
import Logout from "../../../assets/logout.svg";
import { getProfile } from "@/pages/api/profile/getProfile";
import Link from "next/link";

function Sidebar() {
	const router = useRouter();
	const { activeTab, setActiveTab } = useSidebarContext();
	const userData = getUserDetails();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const [name, setName] = useState("");
	const [companyName, setCompanyName] = useState("");

	useEffect(() => {
		(async () => {
			const res = await getProfile();
			setName(res?.name);
			setCompanyName(res?.companyName);
		})();
	}, []);

	return (
		<div className={styles.desktopSidebar}>
			<div className={styles.container}>
				<div onClick={() => router.push("/")} className={styles.logo}>
					<Logo />
				</div>
				<p
					style={{
						fontSize: "10px",
						marginBottom: "10px",
					}}
				>
					Main Menu
				</p>

				<div className={styles.sideLinks}>
					{/* <li onClick={() => {setActiveTab(1); router.push("/dashboard")}} className={activeTab === 1 ? styles.activeLink :styles.link}>
            <Dashboardicon className={styles.icon} />
            <span>Dashboard</span>
          </li>
          <li onClick={() => {setActiveTab(2); router.push("/vouchers")}} className={activeTab === 2 ? styles.activeLink :styles.link}>
            <Voucher className={styles.icon} /> <span>Vouchers</span>
          </li>
          <li onClick={() => {setActiveTab(3); router.push("/profile")}} className={activeTab === 3? styles.activeLink :styles.link}>
            <Profile className={styles.icon} />
            <span>Profile</span>
          </li>
          <li onClick={() => {setActiveTab(4); router.push("/payment")}} className={activeTab === 4? styles.activeLink :styles.link}>
            <Payment className={styles.icon} /> <span>Payment & withdrawal</span>
          </li> */}

					<Link
						href="/dashboard"
						onClick={() => {
							setActiveTab(1);
							router.push("/dashboard");
						}}
						className={activeTab === 1 ? styles.activeLink : styles.link}
					>
						<Dashboardicon className={styles.icon} />
						<span>Dashboard</span>
					</Link>
					<Link
						href="/vouchers"
						onClick={() => {
							setActiveTab(2);
							router.push("/vouchers");
						}}
						className={activeTab === 2 ? styles.activeLink : styles.link}
					>
						<Voucher className={styles.icon} /> <span>Vouchers</span>
					</Link>
					<Link
						href="/profile"
						onClick={() => {
							setActiveTab(3);
							router.push("/profile");
						}}
						className={activeTab === 3 ? styles.activeLink : styles.link}
					>
						<Profile className={styles.icon} />
						<span>Profile</span>
					</Link>
					<Link
						href="/payment"
						onClick={() => {
							setActiveTab(4);
							router.push("/payment");
						}}
						className={activeTab === 4 ? styles.activeLink : styles.link}
					>
						<Payment className={styles.icon} />{" "}
						<span>Payment & withdrawal</span>
					</Link>
				</div>
				<div className={styles.bottom}>
					<div className={styles.profile}>
						<img
							src="https://res.cloudinary.com/dmixz7eur/image/upload/v1678013020/chike/3d-avatar-teacher-png_l8hyf7.webp"
							alt=""
						/>
						{isClient && (
							<div className={styles.info}>
								<h6>
									{userData?.companyName
										? userData?.firstName + " " + userData?.lastName
										: userData?.name}
								</h6>
								<p>
									{(userData?.isCompany || userData?.companyName) &&
										userData?.companyName}
								</p>
							</div>
						)}
					</div>
					<li
						onClick={() => {
							removeToken();
							router.push("/login");
						}}
						className={styles.exit}
					>
						<Logout className={styles.icon} />
						Logout
					</li>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;

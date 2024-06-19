import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/components/paysuccess.module.css";
import Back from "../../assets/back.svg";
import Link from "../../assets/chain.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdOutlineMailOutline, MdWhatsapp } from "react-icons/md";
import { getSingleLink } from "../api/paymentLink/getSingleLink";
import Loading from "../components/loading";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ReactDOMServer from "react-dom/server";

const PayLink = () => {
	const router = useRouter();
	const [linkDetails, setLinkDetails] = useState(null);
	const [openShare, setOpenShare] = useState(false);
	const [copied, setCopied] = useState(false);
	const { id } = router.query;
	const date = new Date(linkDetails?.linkExpiry);

	useEffect(() => {
		console.log(id);
		if (id === "1" || id === undefined) {
			setLinkDetails("https://pays.co/cashout");
			setOpenShare(true);
		} else {
			console.log("running else");
			fetchLinkDetails();
		}
	}, [id]);

	if (!linkDetails) {
		return <Loading />;
	}

	async function fetchLinkDetails() {
		try {
			const res = await getSingleLink(id);
			if (res.success) {
				console.log(res.link.link);
				setLinkDetails(res.link);
				setOpenShare(true);
			}
		} catch (error) {
			console.error(error);
		}
	}

	const handleCopy = (id) => {
		navigator.clipboard.writeText(linkDetails);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 3000);
	};
	const handleOpenShare = () => {
		setOpenShare((prev) => !prev);
	};

	const handleWhatsAppShare = () => {
		const shareText = `Hey there, this is the link to fund my personal usepays account for ${
			linkDetails.title
		}: ${
			linkDetails.link + `/${id}`
		}. Thank you for supporting me. This link is only valid until ${date.toLocaleDateString()}`;
		const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
			shareText
		)}`;
		window.open(whatsappUrl);
	};

	const handleEmailShare = () => {
		const emailSubject = "My Personalized Payment link";
		const emailBody =
			ReactDOMServer.renderToString(`Hey there! Here is the link to send funds to my personal usepays account for ${
				linkDetails.title
			}: ${
				linkDetails.link + `/${id}`
			}. This link is only valid until ${date.toLocaleDateString()} 
        `);

		window.location.href = `mailto:?subject=${encodeURIComponent(
			emailSubject
		)}&body=${encodeURIComponent(emailBody)}`;
	};

	return (
		<div className={styles.paymentSuccessPage}>
			<div className={styles.container}>
				<div className={styles.back} onClick={() => router.back()}>
					<Back /> Back
				</div>
				<div className={styles.successBanner}>
					<div className={styles.banner}>
						<Image src="/done.png" alt="success" width={100} height={70} />
						{id == "1" || id == undefined ? (
							<h3>Share voucher</h3>
						) : (
							<div className={styles.bannerDesc}>
								<p>Your Payment link for</p>
								<h3> {linkDetails?.title}</h3>
								<p>has been created successfully</p>
							</div>
						)}
						<div className={styles.link}>
							{id == "1" || id == undefined ? linkDetails : linkDetails.link}
						</div>
						<div className={styles.buttons}>
							<button className={styles.copybtn} onClick={handleCopy}>
								<Link /> Copy Link
							</button>
							<button className={styles.sharebtn} onClick={handleOpenShare}>
								Share
							</button>
						</div>
						{openShare && (
							<div className={styles.openShare}>
								<p>Share link via:</p>
								<div className={styles.sharebuttons}>
									<button type="button" onClick={handleEmailShare}>
										<MdOutlineMailOutline size={25} />
									</button>
									<button type="button" onClick={handleWhatsAppShare}>
										<MdWhatsapp size={25} />
									</button>
								</div>
							</div>
						)}
						{copied && (
							<p className={styles.copyMsg}>
								{" "}
								<BsFillInfoCircleFill size={15} /> Link has been copied to your
								clipboard!
							</p>
						)}
					</div>
				</div>
			</div>
			<div className={styles.thumbnailContainer}>
				<div className={styles.thumbnailwrap}>
					<div className={styles.thumbnail}>
						<img src="/coins.jpg" alt="money" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PayLink;

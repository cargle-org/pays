import React from "react";
import styles from "../../styles/Home.module.css";

function Metrics() {
	return (
		<div className={styles.metrics}>
			<div className={styles.container}>
				<div className={styles.row}>
					<div className={styles.metric}>
						<div className={styles.display}>50k +</div>
						<p>Active users</p>
					</div>
					<div className={styles.metric}>
						<div className={styles.display}>250k +</div>
						<p>Vouchers Cashed</p>
					</div>
					<div className={styles.metric}>
						<div className={styles.display}>1.2b +</div>
						<p>Amount Cashed</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Metrics;

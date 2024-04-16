<?php
require_once 'utils.php';


if (isset($_POST['csrf_token']) && validateToken($_POST['csrf_token'])) {
	if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true && isset($_SESSION['admin']) && $_SESSION['admin'] === true && isset($_SESSION['userID'])) {
		if (isset($_POST['userID'])) {
			if ($_POST['userID'] != $_SESSION['userID']) {

				$C = connect();
				if ($C) {
					if (sqlUpdate($C, 'DELETE FROM users WHERE id=?', 'i', $_POST['userID'])) {
						sqlUpdate($C, 'DELETE FROM requests WHERE user=?', 'i', $_POST['userID']);
						sqlUpdate($C, 'DELETE FROM loginattempts WHERE user=?', 'i', $_POST['userID']);
						session_destroy();
						echo 0;
					} else {
						echo 1;
					}
					$C->close();
				} else {
					echo 2;
				}
			} else {
				echo 6;
			}
		} else {
			echo 5;
		}
	} else {
		echo 3;
	}
} else {
	echo 4;
}


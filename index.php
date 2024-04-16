<?php
require_once 'php/utils.php';

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
	header("Location: login");
	exit;
}

$user = [];
$C = connect();
if ($C) {
	$res = sqlSelect($C, 'SELECT * FROM users WHERE id=?', 'i', $_SESSION['userID']);
	if ($res && $res->num_rows === 1) {
		$user = $res->fetch_assoc();
	} else {
		exit;
	}
} else {
	exit;
}

?>


<!DOCTYPE html>
<html lang="de">

<head>
	<meta charset="UTF-8">
	<meta name="csrf_token" content="<?php echo createToken(); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Secure Site</title>
	<link rel="stylesheet" href="<?php echo dirname($_SERVER['PHP_SELF']) . '/style.css'; ?>" />
</head>

<body>

	<body>

		<table>
			<tr>
				<td>
					<div class="btn" onclick="logout();">Log Out</div>
				</td>
				<?php if ($user['admin']) {
					echo '<td><div class="btn" onclick="window.location.href = \'admin/approvals.php\'">Bestätigungen</div></td><td><div class="btn" onclick="window.location.href = \'admin/user.php\'">Benutzer</div></td>';
				} ?>
			</tr>
		</table>
		<div style="text-align: center;">
		<h1>Secure Site</h1>
		<div id="errs" class="errorcontainer"></div>
		<br><br>
		<h2>Hello <?php echo htmlspecialchars($user['name'], ENT_QUOTES); ?></h2>
		<br><br>
		<div class="btn" onclick="logout();">Log Out</div>
		<br><br>
		<div class="btn" onclick="deleteAccount();">Delete Account</div>
	</div>

		
		<script src="<?php echo dirname($_SERVER['PHP_SELF']) . '/script.js' ?>"></script>

	</body>

</html>
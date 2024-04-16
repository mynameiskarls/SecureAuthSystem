<?php
require_once '../php/utils.php';

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
	header("Location: ../login");
	exit;
}
if (!isset($_SESSION['admin']) || !$_SESSION['admin']) {
	header("Location: ../index.php");
	exit;
}




?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="csrf_token" content="<?php echo createToken(); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Secure Site</title>
	<link rel="stylesheet" href="<?php echo dirname(dirname($_SERVER['PHP_SELF'])) . '/style.css'; ?>" />
</head>

<body>
<table>
			<tr>
				<td>
					<div class="btn" onclick="logout();">Log Out</div>
				</td>
				<?php if ($_SESSION['admin']) {
					echo '<td><div class="btn" onclick="window.location.href = \'approvals.php\'">Bestätigungen</div></td><td><div class="btn" onclick="window.location.href = \'user.php\'">User</div></td><td><div class="btn" onclick="window.location.href = \'../index.php\'">Index</div></td>';
				} ?>
			</tr>
		</table>
	<div id="errs" class="errorcontainer"></div>
	<table>


		<?php
		$nonapproved = [];
		$C = connect();
		if ($C) {
			$res = sqlSelect($C, "SELECT id, name, email FROM users WHERE approved='0' AND verified='1'");
			if ($res) {
				echo '<tr>';
				echo '<td>ID</td>' . '<td>NAME</td>' . '<td>EMAIL</td>' . '<td></td>' . '<td></td>';
				echo '</tr>';
				for ($i = 0; $i < $res->num_rows; $i++) {
					$nonapproved = $res->fetch_assoc();
					echo '<tr>';
					echo '<td>' . $nonapproved['id'] . '</td>' . '<td>' . $nonapproved['name'] . '</td>' . '<td>' . $nonapproved['email'] . '</td>' . '<td><button onclick="approve(' . $nonapproved['id'] . ',\'' . $nonapproved['email'] .'\',\'' . $nonapproved['name'] .'\')">' . 'Approve' . '</button></td>' . '<td><button onclick=reject(' . $nonapproved['id'] . ',\'' . $nonapproved['email'] .'\',\'' . $nonapproved['name'] . '\')>' . 'Reject' . '</button></td>';
					echo '</tr>';
				}
			}
		}
		?>
	</table>
	<script src="<?php echo dirname(dirname($_SERVER['PHP_SELF'])) . '/script.js' ?>"></script>
</body>

</html>
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
if (isset($_POST['userID'])) {
    $user = [];
    $C = connect();
    if ($C) {
        $res = sqlSelect($C, 'SELECT * FROM users WHERE id=?', 'i', $_POST['userID']);
        if ($res && $res->num_rows === 1) {
            $user = $res->fetch_assoc();
        } else {
            exit;
        }
    } else {
        exit;
    }
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
    <img src="../logo-s.png" style="witdh=150px" alt="Nature" class="responsive">
    <table>
			<tr>
				<td>
					<div class="btn" onclick="logout();">Log Out</div>
				</td>
				<?php if ($_SESSION['admin']) {
					echo '<td><div class="btn" onclick="window.location.href = \'approvals.php\'">Bestätigungen</div></td><td><div class="btn" onclick="window.location.href = \'user.php\'">Benutzer</div></td><td><div class="btn" onclick="window.location.href = \'../index.php\'">Rechner</div></td>';
				} ?>
			</tr>
		</table>
    <div id="errs" class="errorcontainer"></div>
    <form id="editForm">
        <input type="hidden" name="userID" id="userID" value="<?php echo $user['id'] ?>">
    <table>
        <tr><td>Name:</td><td><input type="text" name="name" id="name" value="<?php echo $user['name'] ?>"></td></tr>
        <tr><td>E-Mail:</td><td><input type="text" name="email" id="email" value="<?php echo $user['email'] ?>"></td></tr>
        <tr><td>Passwort:</td><td><input type="password" name="password" id="passwort"></td></tr>
        <tr><td>Passwort wiederholen:</td><td><input type="password" name="repeatpassword" id="passwortrepeat"></td></tr>
        <tr><td>Admin:</td><td><input type="checkbox" name="admin" id="admin" value="1" <?php if($user['admin']) echo 'checked'; ?>></td></tr>
    </table>
    </form>
    <button id="submit" onclick="editUser()">Speichern</button>
    <button id="cancel" onclick="window.location.href='user.php';">Abbrechen</button>
    <button id="delete" onclick="deleteAccount()">Nutzer löschen</button>
    <script src="<?php echo dirname(dirname($_SERVER['PHP_SELF'])) . '/script.js' ?>"></script>
</body>

</html>
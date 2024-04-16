<?php
require_once 'utils.php';


if (isset($_POST['csrf_token']) && validateToken($_POST['csrf_token'])) {
    if (isset($_SESSION['loggedin']) && isset($_POST['approveID']) && $_SESSION['loggedin'] === true && isset($_SESSION['admin']) && $_SESSION['admin'] === true) {
        if (isset($_POST['approveID']) && isset($_POST['name']) && isset($_POST['eMail'])) {
            $C = connect();
            if ($C) {
                if (sqlUpdate($C, "UPDATE users SET approved='1' WHERE id=?", 'i', $_POST['approveID'])) {

                    if (sendEmail($_POST['eMail'], $user['name'], 'Account Approved', 'Your Account has been approved. You can now start using it.')) {
                        return 0;
                    } else {
                        // return 'failed to send email';
                        return 5;
                    }
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
        echo 3;
    }
} else {
    echo 4;
}
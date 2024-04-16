<?php
require_once 'utils.php';


if (isset($_POST['csrf_token']) && validateToken($_POST['csrf_token'])) {
    if (isset($_SESSION['loggedin']) && isset($_POST['rejectID']) && $_SESSION['loggedin'] === true && isset($_SESSION['admin']) && $_SESSION['admin'] === true) {
        if (isset($_POST['rejectID']) && isset($_POST['name']) && isset($_POST['eMail'])) {
            $C = connect();
            if ($C) {
                if (sqlUpdate($C, 'DELETE FROM users WHERE id=?', 'i', $_POST['rejectID'])) {
                    sqlUpdate($C, 'DELETE FROM requests WHERE user=?', 'i', $_POST['rejectID']);
                    sqlUpdate($C, 'DELETE FROM loginattempts WHERE user=?', 'i', $_POST['rejectID']);

                    if (sendEmail($_POST['eMail'], $_POST['name'], 'Account Rejected', 'Your Account has been rejected.')) {
                        echo 0;
                    } else {
                        // return 'failed to send email';
                        echo 5;
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
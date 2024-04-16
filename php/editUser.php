<?php
require_once 'utils.php';


if (isset($_POST['csrf_token']) && validateToken($_POST['csrf_token'])) {
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true && isset($_SESSION['admin']) && $_SESSION['admin'] === true && isset($_SESSION['userID'])) {
        if (isset($_POST['userID']) && isset($_POST['name']) && isset($_POST['email'])) {

            $user = [];
            $C = connect();
            if ($C) {
                $res = sqlSelect($C, 'SELECT * FROM users WHERE id=?', 'i', $_POST['userID']);
                if ($res && $res->num_rows === 1) {
                    $user = $res->fetch_assoc();
                } else {
                    exit;
                }
                $C->close();
            } else {
                echo 2;
                exit;
            }

            $admin = false;
            if (isset($_POST['admin']) && $_POST['admin'] == true) {
                $admin = true;
            }
            $C = connect();
            if ($C) {
                if ($_POST['userID'] != $_SESSION['userID']) {
                    if ($admin != $user['admin']) {
                        if(sqlUpdate($C, 'UPDATE users SET admin=? WHERE id=?', 'si', $admin, $_POST['userID'])) {

                        }
                        else {
                            echo 2;
                        }

                    }
                } else {
                    echo 1;
                    exit;
                }
                if (isset($_POST['password']) && $_POST['password'] !== "") {
                    if ($_POST['password'] === $_POST['repeatpassword']) {
                        $hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
                        if(sqlUpdate($C, 'UPDATE users SET password=? WHERE id=?', 'si', $hash, $_POST['userID'])) {
                            
                        }
                        else {
                            echo 2;
                            exit;
                        }

                    } else {
                        echo 6;
                        exit;
                    }
                }
                if ($_POST['name'] != $user['name']) {
                    if(sqlUpdate($C, 'UPDATE users SET name=? WHERE id=?', 'si', $_POST['name'], $_POST['userID'])) {

                    }
                    else {
                        echo 2;
                        exit;
                    }
                }
                if ($_POST['email'] != $user['email']) {
                    if (sqlUpdate($C, 'UPDATE users SET email=? WHERE id=?', 'si', $_POST['email'], $_POST['userID'])) {

                    }
                    else {
                        echo 2;
                        exit;
                    }
                }
                echo 0;
            }
            else {
                echo 2;
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


<?php

require_once 'auth.php';
if (!$userid = checkAuth()) {
    
    echo 0;
}
else
{
    echo 1;
}
?>
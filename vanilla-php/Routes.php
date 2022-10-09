<?php

$map = [
    '/' => ["Main", "mainPage"],
];

$map = array_map(function($executable) {
    return ["\TestPHPExample\Controller\\{$executable[0]}", $executable[1]];
}, $map);

return $map;
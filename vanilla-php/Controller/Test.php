<?php
namespace TestPHPExample\Controller;

class Test {
    public function testAPI() {
        print json_encode("Test endpoint With Controller", JSON_PRETTY_PRINT);
    }
}
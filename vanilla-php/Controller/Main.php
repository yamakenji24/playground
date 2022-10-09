<?php

namespace TestPHPExample\Controller;

class Main {
    public function mainPage() {
        print json_encode("PHP With Controller", JSON_PRETTY_PRINT);
    }
}
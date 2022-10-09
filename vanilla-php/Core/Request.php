<?php
namespace TestPHPExample\Core;

class Request {
    protected $uri;
    protected $body;

    public function __construct(string $uri, array $body=[]) {
        $this->uri = $uri;
        $this->body = $body;
    }

    public function getPath() {
        list($path, ) = explode("?", $this->getUri());
        return $path;
    }
    public function getUri() {
        return $this->uri;
    }
}
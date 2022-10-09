<?php
namespace TestPHPExample;

use \TestPHPExample\Core\Request;
use \TestPHPExample\Core\Router;

class App {
    private $routeMap;

    public function __construct() {
        $this->registerAutoload();
        $this->initRouteMap();
    }

    public function run() {
        $request = new Request($_SERVER['REQUEST_URI'], $_POST);
        $requestPath = $request->getPath();
        $route = Router::defineRoute($requestPath, array_keys($this->routeMap));
        $vars = Router::extractVars($requestPath, $route);
        list($controllerName, $action) = $this->routeMap[$route];
        $controller = new $controllerName($request);
        $content = call_user_func_array([$controller, $action], $vars);

        echo $content;
    }

    private function registerAutoload() {
        spl_autoload_register(function($class) {
            $prefix = "TestPHPExample";
            $baseDir = __DIR__;
            $length = strlen($prefix);

            if (strncmp($prefix, $class, $length) !== 0) {
                return;
            }

            $relativeClass = substr($class, $length);
            $file = $baseDir . str_replace("\\", "/", $relativeClass) . ".php";

            if (file_exists($file)) {
                require $file;
            }
        });
    }

    private function initRouteMap() {
        $this->routeMap = require __DIR__ . "/Routes.php";
    }
}
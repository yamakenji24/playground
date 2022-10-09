<?php
namespace TestPHPExample\Core;

class Router {
    public static function defineRoute(string $path, array $routes) {
        $pathParts = explode("/", $path);
        $definedRoute = null;

        usort($routes, function($someRoute, $otherRoute) {
            return substr_count($otherRoute, "/") <=> substr_count($someRoute, "/");
        });

        foreach ($routes as $route) {
            $routeParts = explode("/", $route);
            $isMatched = false;

            if (count($pathParts) >= count($routeParts)) {
                $isMatched = true;

                foreach ($routeParts as $i=>$routePart) {
                    $routeValue = substr($routePart, 0, 1) !== ":" ? $routePart : null;
                    $pathValue = $pathParts[$i];

                    if (!is_null($routeValue) && $pathValue !== $routeValue) {
                        $isMatched = false;
                        break;
                    }
                }
            }

            if ($isMatched) {
                $definedRoute = $route;
                break;
            }
        }

        if (is_null($definedRoute)) {
            throw new Exception("routes undefined");
        }

        return $definedRoute;
    }

    public static function extractVars(string $path, string $route, bool $asAssoc=false) {
        $vars = [];

        if (strpos($route, ":") === false) {
            return $vars;
        }

        $pathParts = explode("/", $path);
        $routeParts = explode("/", $route);

        foreach ($routeParts as $i=>$routePart) {
            if (substr($routePart, 0, 1) === ":") {
                $name = substr($routePart, 1);
                $value = $pathParts[$i];

                if ($asAssoc) {
                    $vars[$name] = $value;
                } else {
                    $vars[] = $value;
                }
            }
        }

        return $vars;
    }
}
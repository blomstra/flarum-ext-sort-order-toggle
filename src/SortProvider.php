<?php

namespace Blomstra\SortOrderToggle;

use Flarum\Foundation\AbstractServiceProvider;
use Illuminate\Support\Str;

class SortProvider extends AbstractServiceProvider
{
    // Use boot to try registering after as many other extensions as possible
    public function boot()
    {
        // Scan the sort map for entries without opposites, and create one with a minus sign in front
        $this->container->extend('flarum.forum.discussions.sortmap', function ($map) {
            $reverseMap = [];

            foreach ($map as $frontendSort => $apiSort) {
                $reverseMap[trim($apiSort, '-')][] = $frontendSort;
            }

            foreach ($reverseMap as $apiField => $frontendSorts) {
                if (count($frontendSorts) === 1) {
                    $existingFrontendSort = $frontendSorts[0];
                    $existingApiSort = $map[$existingFrontendSort];

                    $map["-$existingFrontendSort"] = Str::startsWith($existingApiSort, '-') ? $apiField : "-$existingApiSort";
                }
            }

            return $map;
        });
    }
}

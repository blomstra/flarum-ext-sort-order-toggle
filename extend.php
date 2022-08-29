<?php

/*
 * This file is part of blomstra/sort-order-toggle.
 *
 * Copyright (c) 2022 David Wheatley.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\SortOrderToggle;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attribute('sortOrderToggleExtendedMap', function () {
            return resolve('flarum.forum.discussions.sortmap');
        }),

    (new Extend\ServiceProvider())
        ->register(SortProvider::class),
];

<?php

return [
    'secret' => env('STRIPE_SECRET_KEY'),
    'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
    'frontend_url' => env('FRONTEND_URL', 'http://localhost:3111'),
];

<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_public_frontend_auth_routes_are_not_registered(): void
    {
        $this->assertFalse(Route::has('login'));
        $this->assertFalse(Route::has('register'));
        $this->assertTrue(Route::has('catalog.index'));
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Comic;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() {
        $countUsers = User::count();
        $countOrders = Order::count();
        $countComics = Comic::count();
        $countAuthors = Author::count();
        $lastOrders = Order::latest()->take(5)->get();

        return response(compact('countUsers', 'countOrders', 'countComics', 'countAuthors', 'lastOrders'));
    }
}

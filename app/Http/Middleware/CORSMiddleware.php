<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CORSMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->isMethod('OPTIONS')) {
            $response = \response('', 200);
        } else {
            return $next($request);
        }

        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
        $response->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
        $response->header('Access-Control-Allow-Credentials', 'true');
        $response->header('Accept', 'application/json');
        $response->header('Access-Control-Expose-Headers', 'location');

        return $response;
    }
}

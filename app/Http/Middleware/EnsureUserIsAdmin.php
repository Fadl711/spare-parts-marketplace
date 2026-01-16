<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Check if user is authenticated and is an admin
        if (!$user || !($user instanceof \App\Models\Admin)) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Admin access required'
            ], 403);
        }

        return $next($request);
    }
}

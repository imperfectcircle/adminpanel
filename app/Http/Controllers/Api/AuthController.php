<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Il nome utente o la password sono errati.'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('access_token')->plainTextToken;
        return response(compact('user', 'token'))->cookie('access_token', $token, 60 * 24 * 7);
    }

    public function signup(SignupRequest $request) {
        $data = $request->validated();

        /** @var User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('access_token')->plainTextToken;

        return response(compact('user', 'token'))->cookie('access_token', $token, 60 * 24 * 7);
    }

    public function logout(Request $request) {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204)->cookie('access_token', '', -1);
    }
}

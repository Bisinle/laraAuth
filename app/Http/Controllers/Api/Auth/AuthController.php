<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SignupRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }


    //^ loging method ---------------------------------------------------->
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'invalid Credentials'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('posts.category');
        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => new UserResource($user),  // Use a UserResource to control what's sent
        ]);;
    }




    //^ logout method ---------------------------------------------------->
    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $token = $request->bearerToken();
        // $user->currentAccessToken()->delete();
        // $user->tokens()->delete();
        if ($token) {
            $user->tokens()->where('token', hash('sha256', $token))->delete();
        }
        return response('', 204);
    }
}

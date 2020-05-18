<?php

namespace App\Http\Controllers\Auth;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Support\Facades\Log;
use JWTAuth;
use JWTAuthException;
use App\User;
use Tymon\JWTAuth\Exceptions\JWTException;

class ApiAuthController extends Controller
{
    public function __construct()
    {
        $this->user = new User;
    }
    //einfach login methode
    public function login(Request $request) {
        $credentials = $request->only('email', 'password'); //Bekommt man Array mit jeweiligen Werten
        //Log::info("Credentials" . var_dump($credentials));
        $jwt = '';

        try {
            if(!$jwt = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'invalid_credentials',
                ], 401);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'failed_to_create_token',
            ], 500);
        }
        return response()->json([
            'response' => 'success',
            'result' => ['token' => $jwt]
        ]);
    }
    public function getAuthUser(Request $request) {
        $user = JWTAuth::toUser($request->token);
        return \response()->json(['result' => $user]);
    }
    public function getCurrentAuthenticatedUser() {
        $user = JWTAuth::user();
        return response()->json(['result' => $user]);
    }
    public function logout() {
        JWTAuth::invalidate();
        return response([
            'status' => 'success',
            'message' => 'Logged out successfully'
        ], 200);
    }
}

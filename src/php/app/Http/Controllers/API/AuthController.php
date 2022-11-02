<?php

namespace App\Http\Controllers\API; 

use Illuminate\Http\Request; 
use App\Http\Controllers\API\BaseController as BaseController; 
// use App\User; 
use App\Models\User; 
use Hash;
use Illuminate\Support\Facades\Auth; 
use Validator;
use App\Http\Controllers\Controller;
class AuthController extends BaseController
{
    public function login(Request $request) 
    { 
       //echo bcrypt("Kap@2022");exit;
        $data=$request->json()->all(); 
        if(!isset($data['username']) || empty($data['username'])){
            return $this->sendError('Username cannot be empty.',['error'=>'Username cannot be empty']);
        }
        if(!isset($data['password']) || empty($data['password'])){
            return $this->sendError('Password cannot be empty.',['error'=>'Password cannot be empty']);
        } 
         
        //if((Auth::attempt(['username' => $data['username'], 'password' => $data['password']])) || Auth::attempt(['mobile' => $data['username'], 'password' => $data['password']])){
			if((Auth::attempt(['email' => $data['username'], 'password' => $data['password']])) || Auth::attempt(['mobile' => $data['username'], 'password' => $data['password']])){
            $user = Auth::user();  
            User::deleteAccessToken($user->id); 
            $data1['user_id'] = $user->id; 
            $data1['role_id'] = $user->role_id; 
			$getRoleName = User::getRoleName($user->role_id);
			if(!empty($getRoleName->role_name)) 
			{ 
		    $role_name = $getRoleName->role_name; 
		    } 
			else  
			{ 
		    $role_name = ""; 
			}
			$data1['role_name'] = $role_name;
            $data1['username'] = $user->username; 
            $data1['name'] = $user->name;
             
            $data1['email'] = $user->email; 
            $data1['token'] = $user->createToken('intersell')->accessToken;; 
            User::updateToken($data1['token'], $data1['user_id']);
            return $this->sendResponse($data1, 'User login successfully.'); 
        }  
        else{  
            return $this->sendError('Username or Password is incorrect.', ['error'=>'Username or Password is incorrect']);
        } 
    }
    public function verifyAuthToken(Request $request){
        $data=$request->all(); 
        $res = User::verifyAuthAccessToken($data); 
        if(count($res) > 0 && isset($res[0])){
            return array("0"=>1); 
        }else{
            return array("0"=>0); 
        }
        
    }

    public function logout(Request $request){
        $data=$request->json()->all();  
        if(!isset($data['user_id']) || empty($data['user_id'])){
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
        User::delete_token($data["user_id"]);
        return $this->sendResponse("", 'User logout successfully.'); 
    }
  
}

<?php

namespace App\Models;
use DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
class CommonModel extends Model
{
    
   
    public static function setDBConnection($corporate_code){ 
        config(['database.connections.onthefly' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST'),
            'username' => env('DB_USERNAME'),
            'password' => env('DB_PASSWORD'),
            'database' =>  env('DB_DATABASE')."_".$corporate_code,
        ]]); 
        return  config(['database.connections.onthefly']);
    }

    
     
}

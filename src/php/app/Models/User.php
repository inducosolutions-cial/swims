<?php

namespace App\Models;
use DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Crypt;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'facebook_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public static function updateToken($token,$user_id){
         
        DB::table('oauth_access_tokens')->where('user_id',$user_id)->update(['access_token'=> $token]);
        return true;
    }
    public static function verifyAuthAccessToken($data)
    {
       
        $result = DB::table('oauth_access_tokens')->where('user_id', $data['user_id'])->where('access_token', $data['token'])->orderBy('created_at','desc')->get();
        return $result;
    }
    
    public static function findForRememberToken($remember_token)
    {
        $result = DB::table('users')->where('remember_token', $remember_token)->first();
        return $result;
    }
    public static function deleteAccessToken($user_id){
        DB::table('oauth_access_tokens')->where('user_id', $user_id)->delete();
    }

    public static function resetPasswordSave($request)
    {
       
        $result = DB::table('users')->where('remember_token', $request['remember_token'])->first();
        // dd($result);
        if($result){
            DB::table('users')->where('id',$result->id)->update(['remember_token'=>null,'password'=> bcrypt($request['password']),'updated_at'=> date('Y-m-d H:i:s')]);
            return true;
        }else
            return false;
    }
    public static function updateUser($token,$user_id){
        DB::table('users')->where('id',$user_id)->update(['remember_token'=> $token]);
        return true;
    }
	
	
	/*public static function getRoleId($data)
	{
		$res = DB::table('users')->whereIn($data)->first();
        return $res;
		
	}*/
	
	
	public static function updateUserNew($token,$user_id)
	{
		$res =  DB::table('users')->where('id',$user_id)->update(['remember_token'=> $token]);
        return res;
	}
	
	 public static function getUserData($email){
       $res = DB::table('users')->where('email',$email)->first();
        return $res;
    }
	
	
    public static function changePasswordSave($request)
    {
        $result = DB::table('users')->where('id', $request['user_id'])->first(); 
        if($result){
            DB::table('users')->where('id',$result->id)->update(['password'=> bcrypt($request['password']),'updated_at'=> date('Y-m-d H:i:s')]);
            return true;
        }else
            return false;
    }


    public static function changePasswordSave1($request)
    {
        $result = DB::table('users')->where('id', $request['user_id'])->first(); 
        if($result){
            DB::table('users')->where('id',$result->id)->update(['password'=> bcrypt($request['password']),'updated_at'=> date('Y-m-d H:i:s')]);
            return true;
        }else
            return false;
    }

    public static function delete_token($user_id){
        $res = DB::table('oauth_access_tokens')->where('user_id',$user_id)->delete();
        return $res;
    }
    public static function checkEmailWithUserCode($data){
        $users = DB::table('users')->where('email', '=', $data['email'])->where('corporate_code', '=', $data['corporate_code'])->first();
        if ($users === null) {
            return false;
        } else {
            return true;
        }
    }

public static function findForEmail($email){
        $users = DB::table('users')->where('email', '=', $email)->first();
        return $users;
    }	
	
	  

    public static function getUsers($data){
        $users_data =    DB::table('user_details')
        ->select('user_details.*','users.corporate_code','roles.role_name')->join('roles','roles.role_id','=','user_details.role_id')->join('users','users.id','=','user_details.user_id')
        ->where('user_details.created_by', $data['user_id'])->get()->toArray();
        return $users_data;
    }        

    public static function updateUserDetails($user_data){ 
        $user_data['id']= $user_data['seller_user_id']; 
        unset($user_data['seller_user_id']);
        unset($user_data['user_id']);
        unset($user_data['corporate_code']);
        $user_id =    DB::table('user_details')->updateOrInsert(['id' => $user_data['id']],$user_data); 
        return $user_id;
    }

    public static function getProfile($user_data){ 
        $users_data =    DB::table('user_details')->join('users','users.id','=','user_details.user_id')
        ->select('user_details.*','users.corporate_code')
        ->where('user_details.user_id', $data['user_id'])->get()->toArray();
        return $users_data;
    }

    public static function checkInternalUser($data){
        $users =DB::connection('onthefly')->table('internal_users')->where('email', '=', $data['email'])->where('user_type', '=', $data['user_type'])->first();
        if ($users === null) {
            return false;
        } else {
            return true;
        }
    } 
    public static function insertInternalUsers($data){
        unset($data['user_id']);
        unset($data['corporate_code']);
        $users = DB::connection('onthefly')->table('internal_users')->insert($data); 
    } 

    public static function updateInternalUser($data){
        unset($data['user_id']);
        unset($data['corporate_code']);
        $users = DB::connection('onthefly')->table('internal_users')->where("internal_user_id",$data['internal_user_id'])->update($data); 
    }  
    public static function getInternalUsers($data){
        $users_data =   DB::connection('onthefly')->table('internal_users')
        ->where('user_type', $data['user_type'])->get()->toArray();
        return $users_data;
    }
    public static function getInternalUserById($data){
        $users_data =   DB::connection('onthefly')->table('internal_users')
        ->where('internal_user_id', $data['internal_user_id'])->get()->toArray();
        return $users_data;
    }
    public static function getProfileData($user_id)
    {
        $ress = DB::table('user_details')->where('user_id',$user_id)->get();
        //$ress = DB::table('user_details')->where('user_id',$user_id)->first();
        return $ress;
    }

    public static function checkuserId($user_id)
    {
       
        $ress = DB::table('user_details')->where('user_id',$user_id)->first();
        return $ress;
    }

    public static function getallrolenames($role_id)
    {
        $res = DB::table('roles')->where('role_id',$role_id)->first();
        return $res;
    }

    public static function updateUserprofile($data)
    {
         
        //DB::enableQueryLog();
      $res = DB::table('user_details')->where('user_id',$data['user_id'])->update($data);
      //dd(\DB::getQueryLog());exit;
      return $res;
    }

    public static function updateusertabledata($data)
    {
         
        //DB::enableQueryLog();
      $res = DB::table('users')->where('id',$data['user_id'])->update(['mobile' => $data['mobile']]);
      //dd(\DB::getQueryLog());exit;
      return $res;
    }
 
    

    public static function checkCorporateCode($corporateCode)
    {
       $res = DB::table('users')->where('corporate_code',$corporateCode)->first();
       return $res;
    }

     
    

    public static function getUserDetails($user_id)
    {
        $result = DB::table('user_details')->where('user_id',$user_id)->first(); 
        return $result;
    }

    

    public static function getUserNames()
    {
        $res = DB::table('users')->get();
        return $res;
    }
	
	
	public static function getRoles()
	{
		$res = DB::table('roles')->get();
        return $res;
	}
	
	
	
	public static function addUsers($params)
	{
		$res = DB::table('users')->insertGetId($params);
		return $res;
	}
	
	public static function addUsersDetails($data)
	{
		$res = DB::table('user_details')->insert($data);
		return $res;
	}
	
	public static function checkEmailExists($email)
	{
		$res = DB::table('users')->where('email',$email)->first();
		return $res;
	}
	
	public static function checkMobileExists($mobile)
	{
		$res = DB::table('users')->where('mobile',$mobile)->first();
		return $res;
	}
	
	
	public static function checkHouseNoExists($house_no)
	{
		$res = DB::table('user_details')->where('house_no',$house_no)->first();
		return $res;
	}
	
	public static function getUsersData($data)
	{
		
		//$res = DB::table('user_details')->where('role_id',2)->orderBy('id','desc')->get();
		//return $res;
		
		$query =   DB::table('user_details');
        if(isset($data['project_id']) &&  !empty($data['project_id']))
		{
            $query->where('project_id',$data['project_id']);
        }
		$result = $query->where('role_id',2)->orderBy('id','desc')->get();
        return $result;
		
	}
	
	public static function getStateName($state_id)
	{
		$res = DB::table('states')->where('state_id',$state_id)->first();
		return $res;
	}
	
	public static function getCityName($city_id)
	{
		$res = DB::table('cities')->where('city_id',$city_id)->first();
		return $res;
	}
	
	public static function getWardName($project_ward_id)
	{
		$res = DB::table('project_wards')->where('project_ward_id',$project_ward_id)->first();
		return $res;
	}
	
	
	public static function getProjectWardName($project_ward_id)
	{
		$res = DB::table('project_wards')->where('project_ward_id',$project_ward_id)->first();
		return $res;
		
	}
	
	public static function getProjectName($project_id)
	{
		$res = DB::table('projects')->where('project_id',$project_id)->first();
		return $res;
	}
	
	public static function getCategoryName($category_id)
	{
		$res = DB::table('categories')->where('category_id',$category_id)->first();
		return $res;
	}

public static function getSubCategoryName($sub_category_id)
	{
		$res = DB::table('subcategories')->where('sub_category_id',$sub_category_id)->first();
		return $res;
	}
	
	
	public static function getCustomerTypeName($customer_type)
	{
		$res = DB::table('customer_types')->where('customer_type_id',$customer_type)->first();
		return $res;
	}
	
	
	public static function getRoleName($role_id)
	{
		$res = DB::table('roles')->where('role_id',$role_id)->first();
		return $res;
	}
	
	public static function checkEmailExistsByUser($email,$user_id)
	{
		$res = DB::table('users')->where('email',$email)->whereNotIn('id', [$user_id])->first();
		return $res;
	}
	
	public static function checkMobileExistsByUser($mobile,$user_id)
	{
		$res = DB::table('users')->where('mobile',$mobile)->whereNotIn('id', [$user_id])->first();
		return $res;
	}
	
	
	public static function checkHouseNoExistsByUser($house_no,$user_id)
	{
		$res = DB::table('user_details')->where('house_no',$house_no)->whereNotIn('id', [$user_id])->first();
		return $res;
	}
	
	public static function updateUsers($params,$user_id)
	{
		
		$res = DB::table('users')->where('id',$user_id)->update($params);
		return $res;
	}
	
	
	public static function updateUsersDetails($data,$user_id)
	{
		//DB::enableQueryLog();
		unset($data['user_id']);
		$res = DB::table('user_details')->where('user_id',$user_id)->update($data);
		//dd(\DB::getQueryLog());exit;
		return $res;
	}
	
	public static function addRole($data)
	{
		$res = DB::table('roles')->insert($data);
		return $res;
	}
	
	
	public static function getRolez()
	{
		
		$res = DB::table('roles')->orderBy('role_id','desc')->get();
		return $res;
		
	}
	
	public static function updateRole($data)
	{
		unset($data['user_id']);
		$res = DB::table('roles')->where('role_id',$data['role_id'])->update($data);
		return $res;
		
	}
	
	public static function checkSupervisorAssignedToProjectWards($project_ward_id,$project_id)
	{
		
		$res = DB::table('user_details')->where('project_ward_id',$project_ward_id)->where('project_id',$project_id)->first();
		return $res;
		
	}
	
	
	public static function checkSupervisorAssignedToProjectWardsUser($project_ward_id,$project_id,$created_by)
	{
		
		$res = DB::table('user_details')->where('project_ward_id',$project_ward_id)->where('project_id',$project_id)->whereNotIn('created_by',[$created_by])->first();
		return $res;
	}
	
}
?>
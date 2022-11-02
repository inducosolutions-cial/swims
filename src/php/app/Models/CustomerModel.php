<?php
namespace App\Models;
use DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Crypt;
class CustomerModel extends Authenticatable
{
	
	public static function addCustomer($params)
	{
		$res = DB::table('users')->insertGetId($params);
		return $res;
	}
	
	public static function addCustomerDetails($data)
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
	
	
	public static function getCustomersData($data)
	{
		
		//$res = DB::table('user_details')->where('role_id',3)->orderBy('id','desc')->get();
		$query = DB::table('user_details');
		/*if(!empty($data['house_no']))
		{
			$query->where('house_no',$data['house_no']);
		}
		if(!empty($data['mobile']))
		{
			$query->where('mobile',$data['mobile']);
		}
		if(!empty($data['name']))
		{
			$query->where('name','LIKE','%'.$data['name'].'%');
		}*/
		
		if(!empty($data['searchstring']))
		{
			$query->where('mobile','LIKE','%'.$data['searchstring'].'%')->orWhere('house_no','LIKE','%'.$data['searchstring'].'%')->orWhere('name','LIKE','%'.$data['searchstring'].'%');
		}
		if(!empty($data['project_id']))
		{
			$query->where('project_id',$data['project_id']);
		}
		if(!empty($data['project_ward_id']))
		{
			$query->where('project_ward_id',$data['project_ward_id']);
		}
		if(!empty($data['customer_type']))
		{
			$query->where('customer_type',$data['customer_type']);
		}
		if(!empty($data['category_id']))
		{
			$query->where('category_id',$data['category_id']);
		}
		if(!empty($data['sub_category_id']))
		{
			$query->where('sub_category_id',$data['sub_category_id']);
		}
		if(!empty($data['supervisor_id']))
		{
			$query->where('supervisor_id',$data['supervisor_id']);
		}
		
		$res = $query->where('role_id',3)->orderBy('id','desc')->get();
		return $res;
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
	
	
	public static function updateCustomer($params,$user_id)
	{
		$res = DB::table('users')->where('id',$user_id)->update($params);
		return $res;
		
	}
	
	public static function getUserId($customer_id)
	{
		$res = DB::table('user_details')->where('id',$customer_id)->first();
		return $res;
	}
	
	
	public static function updateCustomerDetails($params,$customer_id)
	{
		unset($params['customer_id']);
		unset($params['user_id']);
		$res = DB::table('user_details')->where('id',$customer_id)->update($params);
		return $res;
		
	}
	
	
	public static function getCustomersPag($data, $offset, $perPage)
    {
		DB::enableQueryLog();
        $query =   DB::table('dummy');
        if(isset($data['house_no']) &&  !empty($data['house_no']))
		{
            $query->where('house_no', 'like',$data['house_no'].'%');
        }
        if(isset($data['state_id']))
		{
            $query->where('state_id', '=',$data['state_id']);
        }
        if(isset($data['city_id']) &&  !empty($data['city_id']))
		{
            $query->where('city_id', 'like',$data['city_id'].'%');
        }
		if(isset($data['ward_id']) &&  !empty($data['ward_id']))
		{
            $query->where('ward_id', 'like',$data['ward_id'].'%');
        }
		if(isset($data['project_id']) &&  !empty($data['project_id']))
		{
            $query->where('project_id', 'like',$data['project_id'].'%');
        }
		if(isset($data['created_by']) &&  !empty($data['created_by']))
		{
            $query->where('created_by', 'like',$data['created_by'].'%');
        }
		if(isset($data['mobile']) &&  !empty($data['mobile']))
		{
            $query->where('mobile', 'like',$data['mobile'].'%');
        }
		if(isset($data['customer_type']) &&  !empty($data['customer_type']))
		{
            $query->where('customer_type', 'like',$data['customer_type'].'%');
        }
		if(isset($data['category_id']) &&  !empty($data['category_id'])){
            $query->where('category_id', 'like',$data['category_id'].'%');
        }
		if(isset($data['sub_category_id']) &&  !empty($data['sub_category_id']))
		{
            $query->where('sub_category_id', 'like',$data['sub_category_id'].'%');
        }
         $orders=$query->where('role_id',3)->skip($offset)->take($perPage)->orderBy('id','desc')->get()->toArray();
		 dd(\DB::getQueryLog());exit;
        return $orders;
    }
	
	
	public static function getCustomersPagCount($data)
    {
        $query =   DB::table('dummy');
        if(isset($data['house_no']) &&  !empty($data['house_no'])){
            $query->where('house_no', 'like',$data['house_no'].'%');
        }
        if(isset($data['state_id'])){
            $query->where('state_id', '=',$data['state_id']);
        }
        if(isset($data['city_id']) &&  !empty($data['city_id'])){
            $query->where('city_id', 'like',$data['city_id'].'%');
        }
		if(isset($data['ward_id']) &&  !empty($data['ward_id'])){
            $query->where('ward_id', 'like',$data['ward_id'].'%');
        }
		if(isset($data['project_id']) &&  !empty($data['project_id'])){
            $query->where('project_id', 'like',$data['project_id'].'%');
        }
		if(isset($data['user_id']) &&  !empty($data['user_id'])){
            $query->where('created_by', 'like',$data['user_id'].'%');
        }
		if(isset($data['mobile']) &&  !empty($data['mobile'])){
            $query->where('mobile', 'like',$data['mobile'].'%');
        }
		if(isset($data['customer_type']) &&  !empty($data['customer_type'])){
            $query->where('customer_type', 'like',$data['customer_type'].'%');
        }
		if(isset($data['category_id']) &&  !empty($data['category_id'])){
            $query->where('category_id', 'like',$data['category_id'].'%');
        }
		if(isset($data['sub_category_id']) &&  !empty($data['sub_category_id'])){
            $query->where('sub_category_id', 'like',$data['sub_category_id'].'%');
        }
        $result = $query->where('role_id',3)->count();
        return $result;
    }
	
	
	public static function getSupervisorName($supervisor_id)
	{
		
		$res = DB::table('users')->where('id',$supervisor_id)->first();
		return $res;
		
	}
	
	
	public static function getProjectAndWardBySupervisorId($supervisor_id)
	{
		
		$res = DB::table('user_details')->where('user_id',$supervisor_id)->first();
		
		return $res;
		
	}
	
	
	
	public static function updateOnlyThreeInAllUserIds($threeparamstoupdate,$user_id)
	{
		$res = DB::table('user_details')->where('user_id',$user_id)->update($threeparamstoupdate);
		return $res;
		
	}
	
	
	public static function getBillingAmount($customer_address_id)
	 { 
		//$res = DB::table('billings')->where('customer_id',$customer_address_id)->get();
		$res = DB::table('billings')->where('customer_id',$customer_address_id)->sum('amount');
		return $res;
	 }
	 
	 public static function getPaymentAmount($customer_address_id)
	 { 
		//$res = DB::table('payments')->where('customer_address_id',$customer_address_id)->get();
		$res = DB::table('payments')->where('customer_address_id',$customer_address_id)->sum('amount');
		return $res;
	 }
	
}
?>
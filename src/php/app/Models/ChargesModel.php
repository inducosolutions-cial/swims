<?php
namespace App\Models;
use DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Crypt;
class ChargesModel extends Authenticatable
{
	
	public static function checkChargesExists($data)
	{
		
		$res = DB::table('charges')->where($data)->first();	
		return $res;
	}
	
	
	public static function addCharges($data)
	{
		
		$res = DB::table('charges')->insert($data);
		return $res;
		
	}
	
	
	public static function getCharges($data)
	{
		//$res = DB::table('charges')->orderBy('charges_id','desc')->get();
		$query = DB::table('charges');
		if(isset($data['project_id']) &&  !empty($data['project_id']))
		{
			$query->where('project_id',$data['project_id']);
		}
		if(isset($data['customer_type']) &&  !empty($data['customer_type']))
		{
			$query->where('customer_type',$data['customer_type']);
		}
		if(isset($data['category_id']) &&  !empty($data['category_id']))
		{
			$query->where('category_id',$data['category_id']);
		}
		if(isset($data['sub_category_id']) &&  !empty($data['sub_category_id']))
		{
			$query->where('sub_category_id',$data['sub_category_id']);
		}
		
		$res = $query->orderBy('charges_id','desc')->get();
		return $res;
		
	}
	
	public static function updateCharges($data,$charges_id)
	{
	
    $res = DB::table('charges')->where('charges_id',$charges_id)->update($data);	
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
	
	public static function getWardName($ward_id)
	{
		$res = DB::table('wards')->where('ward_id',$ward_id)->first();
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
	
	
	public static function getCustomers()
	{
		
		$res = DB::table('user_details')->where('role_id',3)->get();
		return $res;
		
	}
	
	
	public static function getAmount($parameters)
	{
		
		$res = DB::table('charges')->where($parameters)->first();
		return $res;
		
	}
	 
	 
	 
	 public static function createChargeForCustomers($billingparams)
	 {
		 $res = DB::table('billings')->insert($billingparams);
		return $res;
		 
	 }
	 
	 
	 public static function confirmPayment($data)
	 {
		$res = DB::table('payments')->insertGetId($data);
		return $res;
		 
	 }
	 
	 
	 public static function getCustomerAddress($data)
	 {
		 
		 $res = DB::table('user_details')->where($data)->get();
		return $res;
	 }
	 
	 
	 public static function getUsersData($id)
	 {
		$res = DB::table('user_details')->where('id',$id)->first();
		return $res;
	 }
	 
	 
	 public static function getPayments($data)
	 {
		  
		$query =   DB::table('payments');
        if(isset($data['start_date']) &&  !empty($data['start_date']))
		{
            $query->where('created_at', '>=', $data['start_date']);
        }
		if(isset($data['end_date']) &&  !empty($data['end_date']))
		{
            $query->where('created_at', '<=', $data['end_date']);
        }
		if(isset($data['project_id']) &&  !empty($data['project_id']))
		{
            $query->where('project_id',$data['project_id']);
        }
		if(isset($data['project_ward_id']) &&  !empty($data['project_ward_id']))
		{
            $query->where('project_ward_id',$data['project_ward_id']);
        }
		if(isset($data['supervisor_id']) &&  !empty($data['supervisor_id']))
		{
            $query->where('supervisor_id',$data['supervisor_id']);
        }
		
		$result = $query->orderBy('payment_id','desc')->get();
		 
        return $result;
		
		
	 }
	 
	 
	 
	 public static function getCustomerNameAndHouseNo($customer_address_id)
	 {
		 
		 $res = DB::table('user_details')->where('id',$customer_address_id)->first();
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
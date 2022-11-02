<?php

namespace App\Models;
use DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Crypt;
class MasterModel extends Authenticatable
{
    public static function addState($data)
	{
		$res = DB::table('states')->insert($data);
		return $res;
		
	}
	
	public static function check_state_name($state_name)
	{
		$res = DB::table('states')->where('state_name',$state_name)->first();
		return $res;
	}
	
	
	public static function getStates($data)
	{
		
		$res = DB::table('states')->orderBy('state_id','desc')->get();
		return $res;
	}
	
	public static function updateState($data)
	{
		$res = DB::table('states')->where('state_id',$data['state_id'])->update(['state_name'=>$data['state_name']]);
		return $res;
	}
	
	public static function check_city_name($params)
	{
		$res = DB::table('cities')->where($params)->first();
		return $res;
	}
     
	 
	 public static function addCity($params)
	 {
		$res = DB::table('cities')->insert($params);
		return $res;
	 }
	 
	 
	 public static function getCities($data)
	 {
		 
		 $res = DB::table('cities')->where('state_id',$data['state_id'])->orderBy('city_id','desc')->get();
		 return $res;
	 }
	 
	 public static function updateCity($data)
	 {
		 $res = DB::table('cities')->where('state_id',$data['state_id'])->where('city_id',$data['city_id'])->update(['city_name'=>$data['city_name']]);
		return $res;
		 
	 }
	 
	 public static function check_ward_name($params)
	 { 
		$res = DB::table('wards')->where($params)->first();
		return $res;
	 }
	 
	  
	 
	 public static function addWard($params)
	 {
		 $res = DB::table('wards')->insert($params);
		return $res;
		 
	 }
	 
	 public static function getWards($params)
	 {
		 $res = DB::table('wards')->where($params)->orderBy('ward_id','desc')->get();
		 return $res;
	 }
	 
	 public static function updateWard($params)
	 {
		 $res = DB::table('wards')->where('ward_id',$params['ward_id'])->update($params);
		 return $res;
	 }
	 
	 
	 public static function check_project_type_name($project_type_name)
	 {
		 $res = DB::table('project_types')->where('project_type_name',$project_type_name)->first();
		 return $res;
		 
	 }
	 
	 
	 public static function addProjectType($data)
	 {
		 $res = DB::table('project_types')->insert($data);
		 return $res;
	 }
	 
	 public static function getProjectTypes($data)
	 {
		 $res = DB::table('project_types')->orderBy('project_type_id','desc')->get();
		 return $res;
		 
	 }
	 
	 public static function updateProjectType($data)
	 {
		 $res = DB::table('project_types')->where('project_type_id',$data['project_type_id'])->update($data);
		 return $res;
	 }
	 
	 
	 public static function check_customer_type($customer_type)
	 {
		 $res = DB::table('customer_types')->where('customer_type',$customer_type)->first();
		 return $res;
	 }
	 
	 public static function addCustomerType($data)
	 {
		 $res = DB::table('customer_types')->insert($data);
		 return $res;
	 }
	 
	 
	 public static function getCustomerTypes($data)
	 {
		 $res = DB::table('customer_types')->orderBy('customer_type_id','desc')->get();
		 return $res;
	 }
	 
	 public static function updateCustomerType($params)
	 {
		 
		 $res = DB::table('customer_types')->where('customer_type_id',$params['customer_type_id'])->update($params);
		 return $res;
	 }
	 
	 
	 public static function check_category_name($category_name,$customer_type_id)
	 {
		 
		 $res = DB::table('categories')->where('category_name',$category_name)->where('customer_type_id',$customer_type_id)->first();
		 return $res;
	 }
	 
	 public static function addCategory($data)
	 {
		 
		 $res = DB::table('categories')->insert($data);
		 return $res;
	 }
	 
	 
	 public static function getCategories($data)
	 {
		 
		 $res = DB::table('categories')->where('customer_type_id',$data['customer_type_id'])->orderBy('category_id','desc')->get();
		 return $res;
		 
	 }
	 
	 public static function updateCategory($data)
	 {
		 
		 $res = DB::table('categories')->where('category_id',$data['category_id'])->update($data);
		 return $res;
	 }
	 
	 
	 public static function check_sub_category_name($params)
	 {
		 
		 $res = DB::table('subcategories')->where($params)->first();
		 return $res;
		 
	 }
	 
	 public static function addSubCategory($params)
	 {
		 $res = DB::table('subcategories')->insert($params);
		 return $res;
		 
	 }
	 
	 
	 public static function getSubCategories($data)
	 {
		 $res = DB::table('subcategories')->where('category_id',$data['category_id'])->where('customer_type_id',$data['customer_type_id'])->orderBy('sub_category_id','desc')->get();
		 return $res;
		 
	 }


	public static function updateSubCategory($params)
	{
		$res = DB::table('subcategories')->where('sub_category_id',$params['sub_category_id'])->update($params);
		 return $res;
	}
}
?>
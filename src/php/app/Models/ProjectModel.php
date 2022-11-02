<?php

namespace App\Models;
use DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Crypt;
class ProjectModel extends Authenticatable
{
      public static function check_project_name($project_name)
	 {
		 $res = DB::table('projects')->where('project_name',$project_name)->first();
		 return $res;
		 
	 }
	 
	 
	 public static function addProject($data)
	 {
		 //$res = DB::table('projects')->insert($data); 
		 $res = DB::table('projects')->insertGetId($data);
		 return $res;
	 }
	 
	 
	 public static function getProjectDetails($project_id)
	 {
		 
		$res = DB::table('projects')->where('project_id',$project_id)->get();
		 return $res; 
	 }
	 
	 public static function getProjects($data)
	 {
		 $res = DB::table('projects')->orderBy('project_id','desc')->get();
		 return $res;
		 
	 }
	 
	 public static function updateProject($data)
	 {
		 $res = DB::table('projects')->where('project_id',$data['project_id'])->update($data);
		 return $res;
	 }
	 
	 
	 public static function check_project_name_by_user($project_name,$project_id)
	 {
		 
		$res = DB::table('projects')->where('project_name',$project_name)->whereNotIn('project_id',[$project_id])->first();
		 return $res; 
	 }
	  
	  
	  
	 
	 
	 public static function check_project_ward_name($ward_name,$project_id)
	 {
		 $res = DB::table('project_wards')->where('ward_name',$ward_name)->where('project_id',$project_id)->first();
		 return $res;
		 
	 }
	 
	 
	 public static function check_project_ward_number($ward_number,$project_id)
	 {
		 $res = DB::table('project_wards')->where('ward_number',$ward_number)->where('project_id',$project_id)->first();
		 return $res;
		 
	 }
	 
	 public static function addProjectWard($data)
	 {
		 
		 $res = DB::table('project_wards')->insert($data);
		 return $res;
		 
	 }
	 
	 
	 public static function get_wards_list($project_id)
	 {
		 
		 $res = DB::table('project_wards')->where('project_id',$project_id)->get();
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
	 
	 
	 public static function getWardsByProjectId($project_id)
	 {
         $res = DB::table('project_wards')->where('project_id',$project_id)->get();
		 return $res;
	 }
	 
	 public static function check_project_ward_name_by_wardid($ward_name,$project_id,$project_ward_id)
	 {
		$res = DB::table('project_wards')->where('ward_name',$ward_name)->where('project_id',$project_id)->whereNotIn('project_ward_id',[$project_ward_id])->first();
		 return $res; 
		 
	 }
	 
	 
	 
	 public static function check_project_ward_number_by_wardid($ward_number,$project_id,$project_ward_id)
	 {
		 
		 $res = DB::table('project_wards')->where('ward_number',$ward_number)->where('project_id',$project_id)->whereNotIn('project_ward_id',[$project_ward_id])->first();
		 return $res; 
	 }
	 
	 public static function updateProjectWard($data)
	 {
		
         $res = DB::table('project_wards')->where('project_ward_id',$data['project_ward_id'])->update($data);
		 return $res; 		
		 
	 }
	 
	 
	 public static function wards_count($project_id)
	 {
		 $res = DB::table('project_wards')->where('project_id',$project_id)->get();
		 return $res; 	
		 
	 }
	 
	 public static function project_type_name($project_type_id)
	 {
		 
		 $res = DB::table('project_types')->where('project_type_id',$project_type_id)->first();
		 return $res; 
	 }
	 
	 
	 public static function getSupervisor($project_ward_id,$project_id)
	 {
		 $res = DB::table('user_details')->where('project_ward_id',$project_ward_id)->where('project_id',$project_id)->where('role_id',2)->first();
		 return $res; 
	 }
	 
	  
	 
}
?>